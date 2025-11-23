#!/bin/bash
# Quick Start Script for Password Reset Testing
# This script helps you get started with testing the password reset feature

echo "🚀 Password Reset Feature - Quick Start"
echo "======================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the dev server
echo "🎯 Starting development server..."
echo ""
echo "Once the server starts, navigate to:"
echo "📱 http://localhost:5173/admin"
echo ""
echo "Next steps:"
echo "1. Click the 'Forgot?' link on the login page"
echo "2. Enter your email address"
echo "3. Check your email for the reset link"
echo "4. Click the link and set a new password"
echo "5. Log in with your new password"
echo ""
echo "For detailed documentation, see:"
echo "📖 PASSWORD_RESET_QUICK_START.md"
echo "📖 PASSWORD_RESET_IMPLEMENTATION.md"
echo ""

npm run dev
