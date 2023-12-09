# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Create a non-root user to run the application
RUN useradd -m myuser

# Switch to root to perform privileged actions
USER root

# Create a directory for the application code and set permissions
RUN mkdir -p /usr/src/app/app && \
    chown -R myuser:myuser /usr/src/app

# Switch back to the non-root user
USER myuser

# Switch to the app directory
WORKDIR /usr/src/app/app

# Copy package.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Copy the flag.txt file into the container
COPY flag.txt .

# Switch back to root to set permissions for flag.txt
USER root
RUN chmod 400 /usr/src/app/app/flag.txt
USER myuser

# Expose port 3300 from the container
EXPOSE 3300

# Define the command to run your application
CMD ["npm", "start"]