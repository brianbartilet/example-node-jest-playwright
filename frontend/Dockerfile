# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install curl
RUN apk update && apk add curl

# Check if Yarn is installed, if not, install it
RUN if ! command -v yarn &> /dev/null; then npm install -g yarn; fi

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn install

# Copy the rest of the frontend code to the container
COPY . .

# Expose the frontend port (adjust if necessary)
EXPOSE 5173

# Start the frontend server
CMD ["yarn", "ci"]
