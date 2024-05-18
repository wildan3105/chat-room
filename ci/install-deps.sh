#!/bin/sh

# Change to frontend directory and run npm install
echo "Installing frontend dependencies..."
cd ../frontend || { echo "Frontend directory not found"; exit 1; }
npm install || { echo "Failed to install frontend dependencies"; exit 1; }

# Change to backend directory and run npm install
echo "Installing backend dependencies..."
cd ../backend || { echo "Backend directory not found"; exit 1; }
npm install || { echo "Failed to install backend dependencies"; exit 1; }

echo "Dependencies installed successfully for both frontend and backend."