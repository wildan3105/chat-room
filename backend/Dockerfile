# Using node version 14.15.1
FROM node:14.15.1-alpine as chatroombackend

# Create app directory
WORKDIR /chatroombackend

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
COPY . .

RUN yarn install

CMD ["yarn", "start"]