# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY services/trade-management/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY services/trade-management/ ./

# Copy the shared lib directory
COPY lib/ ./lib

# Copy the shared utils directory
COPY utils/ ./utils

# Copy env file
COPY .env ./

# Install Babel CLI globally
RUN npm install -g @babel/cli

# Install nodemon
RUN npm install -g nodemon

# Transpile the code
RUN npm run build

# Expose the port the app runs on (adjust if necessary)
EXPOSE 4001

# Define the command to run your app
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi" ]