# Use an official Node.js image as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json file to the container
COPY package.json /app

# Install the application's dependencies
RUN npm install

# Copy the rest of the application's files to the container
COPY . /app

# Expose the container's port 3001 to the host
EXPOSE 3001

# Run the command to start the Node.js application
CMD ["npm", "start"]
