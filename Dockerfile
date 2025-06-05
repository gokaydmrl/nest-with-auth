FROM node:23-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose port
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

# Run the app
CMD ["npm", "start"]
