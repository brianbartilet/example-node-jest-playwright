# Use the official Playwright image with the required version
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Install curl
RUN apt-get update && apt-get install -y curl

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend test code to the container
COPY . .

# Add wait-for-it.sh script
#ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
#RUN chmod +x /wait-for-it.sh

# Start the server and wait for it to be ready before running tests
CMD ["npm", "run", "test:ci"]