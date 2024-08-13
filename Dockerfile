# Start mariadb
FROM mariadb as database

# ENV variarbles
ENV MARIADB_ROOT_PASSWORD="DataB@s3!"
ENV MARIADB_DATABASE="shortcuts_db"
ENV MARIADB_USER="mariadmin"
ENV MARIADB_PASSWORD="Database@26!"

# Copy all files to container
COPY database.sql /

# Listen for incoming connections
EXPOSE 3306

# Use the official Node.js runtime as the base image
FROM node as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Run the backend server when container starts
CMD ["node", "server.js"] 

# expose port 5000
EXPOSE 5000

# Use Nginx as the production server
FROM nginx

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]