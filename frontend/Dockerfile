# Stage 1: Build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app with 'serve'
FROM node:16-alpine

# Install 'serve' globally
RUN npm install -g serve

# Copy the built app from the previous stage
COPY --from=build /usr/app/build /usr/app/build

# Expose port 3000
EXPOSE 3000

# Command to serve the build directory
CMD ["serve", "-s", "/usr/app/build", "-l", "3000"]
