# Use the official Node.js image
FROM node:16-alpine

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose ports for the API and WebSocket server
EXPOSE 3000 3001

# Start the application
CMD ["npm", "run", "dev"]