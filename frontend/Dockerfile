# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Define build-time variables
ARG NODE_ENV

# Set environment variables using the build-time variables
ENV NODE_ENV=$NODE_ENV

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY frontend/ ./

# Copy the shared lib directory
COPY lib/ ./lib

# Copy the shared utils directory
COPY utils/ ./utils

# Copy env file
COPY .env ./

# Expose the port the app binds to
EXPOSE 3000

# Build the app
RUN npm run build

# Define the command to run your app
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi" ]