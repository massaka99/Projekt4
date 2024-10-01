# Use the official lightweight Node.js 20 image.
FROM node:20-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install all dependencies, including devDependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Expose port 3000 to the Docker host, so we can access it from the outside.
EXPOSE 3000

CMD [ "npm", "start" ]
