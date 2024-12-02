# from fastapi import FastAPI
# import uvicorn
# import sys
# import os
# from fastapi.templating import Jinja2Templates
# from starlette.responses import RedirectResponse
# from fastapi.responses import Response
# from textSummarizer.pipeline.prediction import PredictionPipeline


# text:str = "What is Text Summarization?"

# app = FastAPI()

# @app.get("/", tags=["authentication"])
# async def index():
#     return RedirectResponse(url="/docs")



# @app.get("/train")
# async def training():
#     try:
#         os.system("python main.py")
#         return Response("Training successful !!")

#     except Exception as e:
#         return Response(f"Error Occurred! {e}")
    



# @app.post("/predict")
# async def predict_route(text):
#     try:

#         obj = PredictionPipeline()
#         text = obj.predict(text)
#         return text
#     except Exception as e:
#         raise e
    

# if __name__=="__main__":
#     uvicorn.run(app, host="0.0.0.0", port=5000)






# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse, RedirectResponse
# from pydantic import BaseModel
# import uvicorn
# import os
# from textSummarizer.pipeline.prediction import PredictionPipeline

# app = FastAPI()

# # Allow CORS for frontend (adjust the URL based on your frontend setup)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Frontend URL, change if hosted elsewhere
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Define the model for prediction requests
# class PredictRequest(BaseModel):
#     text: str

# @app.get("/", tags=["authentication"])
# async def index():
#     """Redirects to the documentation page."""
#     return RedirectResponse(url="/docs")

# @app.get("/train")
# async def training():
#     """Endpoint to trigger training."""
#     try:
#         os.system("python main.py")
#         return JSONResponse(content={"message": "Training successful!"}, status_code=200)
#     except Exception as e:
#         return JSONResponse(content={"error": f"Error Occurred! {str(e)}"}, status_code=500)

# @app.post("/predict", tags=["prediction"])
# async def predict_route(request: PredictRequest):
#     """Endpoint to get text summarization predictions."""
#     try:
#         # Instantiate PredictionPipeline and get the summary
#         obj = PredictionPipeline()
#         summary = obj.predict(request.text)
#         return JSONResponse(content={"summary": summary}, status_code=200)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=5000)


from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from pydantic import BaseModel
import uvicorn
from PIL import Image
import pytesseract
import io
import os
from textSummarizer.pipeline.prediction import PredictionPipeline

app = FastAPI()

# Allow CORS for frontend (adjust the URL based on your frontend setup)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL, change if hosted elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the model for prediction requests
class PredictRequest(BaseModel):
    text: str

@app.get("/", tags=["authentication"])
async def index():
    """Redirects to the documentation page."""
    return RedirectResponse(url="/docs")

@app.get("/train")
async def training():
    """Endpoint to trigger training."""
    try:
        os.system("python main.py")
        return JSONResponse(content={"message": "Training successful!"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": f"Error Occurred! {str(e)}"}, status_code=500)

@app.post("/predict", tags=["prediction"])
async def predict_route(request: PredictRequest):
    """Endpoint to get text summarization predictions."""
    try:
        # Instantiate PredictionPipeline and get the summary
        obj = PredictionPipeline()
        summary = obj.predict(request.text)
        return JSONResponse(content={"summary": summary}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/extract-text", tags=["ocr"])
async def extract_text_from_image(file: UploadFile = File(...)):
    """Endpoint to extract text from an uploaded image."""
    try:
        # Read image file content
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        # Extract text using pytesseract
        extracted_text = pytesseract.image_to_string(image)

        return JSONResponse(content={"extracted_text": extracted_text}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
