# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Check if Yarn is installed, if not, install it
RUN if ! command -v yarn &> /dev/null; then npm install -g yarn; fi

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn install

# Copy the rest of the backend code to the container
COPY . .

# Expose the backend port (adjust if necessary)
EXPOSE 3100

# Start the backend server
CMD ["yarn", "dev"]
