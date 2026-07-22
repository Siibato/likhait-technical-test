FROM node:22-alpine

WORKDIR /app

# Copy only package.json so npm resolves the correct native optional deps
COPY package.json ./

# Install dependencies without the host's platform-specific lockfile
RUN npm install --package-lock=false

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]