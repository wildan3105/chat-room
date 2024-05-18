# Using node version 14.15.1
FROM node:14.15.1-alpine as chatroomfrontend

# Create app directory
WORKDIR /chatroomfrontend

# Install app dependencies
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# RUN; TODO