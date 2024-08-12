# Use the official Node.js runtime as the base image
FROM node:21 as build

# Set the working directory in the container
WORKDIR /shortcut

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx

# Copy the built React app to Nginx's web server directory
COPY --from=build /shortcut/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

# Start mariadb
FROM mariadb

# ENV variarbles
ENV MARIADB_ROOT_PASSWORD="HEM2620"
ENV MARIADB_DATABASE="shortcuts_db"
ENV MARIADB_USER="mariadmin"
ENV MARIADB_PASSWORD="Database2620"

# Copy all files to container
COPY database.sql /

# Listen for incoming connections
EXPOSE 3306