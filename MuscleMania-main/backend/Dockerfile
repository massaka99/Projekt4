# Use the official Node.js 20 image.
FROM node:20-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install all dependencies, including devDependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Expose port 4999 for communication to/from server
EXPOSE 4999

# Run the web service on container startup.
CMD [ "node", "server.js" ]
