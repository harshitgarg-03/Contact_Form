# Base image
FROM node:24-alpine

#Working Directory
WORKDIR /app

# Copy package file 
COPY package*.json ./

# Insatll dependecies 
RUN npm install

# Copy prjects file 
COPY . .

#Build nextjs app
# RUN npm run build

# Expose port 
EXPOSE 3000

# Start Next .js app
CMD ["npm", "run", "dev"]