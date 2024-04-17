# Start from a Node.js base image
FROM node:20

# Set the working directory
WORKDIR usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose the port the server listens on
EXPOSE 8080

# Command to run the server
CMD ["node", "index.js"]
