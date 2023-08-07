# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# If you are building your code for production, run: npm ci --only=production

# Copy the rest of your application's code into the container
COPY . .

USER node

# Specify the command to run on container start
CMD ["node", "index.js"]