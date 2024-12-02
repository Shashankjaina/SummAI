# Step 1: Build the React app
FROM node:16 as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the build files from the previous stage to Nginx's default html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
