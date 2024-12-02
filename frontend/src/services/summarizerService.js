import axios from 'axios';

const API_URL = 'http://localhost:5000/api/summarize'; // Adjust as necessary

export const summarizeText = async (text) => {
  try {
    const response = await axios.post(API_URL, { text });
    return response.data.summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw error;
  }
};
