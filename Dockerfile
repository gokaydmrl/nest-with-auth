# FROM node:23-alpine

# # Create app directory
# WORKDIR /app

# # Install app dependencies
# COPY package*.json ./
# RUN npm install

# # Copy app source
# COPY . .

# # Set environment variables
# ENV NODE_ENV=production

# # Expose port
# ARG PORT=3000
# ENV PORT=$PORT
# EXPOSE $PORT

# # Run the app
# CMD ["npm", "run","--max-old-space-size=2048"]
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=2048

# Expose port
ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

# Run the compiled app
CMD ["npm", "run", "start"]
