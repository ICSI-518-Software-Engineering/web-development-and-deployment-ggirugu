# Start from a Node.js base image
FROM node:20

# Set the working directory
WORKDIR app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependenciesdock
RUN npm install

# Copy the rest of the server code
COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
