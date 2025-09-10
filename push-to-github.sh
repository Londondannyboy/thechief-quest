#!/bin/bash

# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
echo "Enter your GitHub username:"
read GITHUB_USERNAME

# Add GitHub remote
git remote add origin https://github.com/$GITHUB_USERNAME/thechief-quest.git

# Push to GitHub
git branch -M main
git push -u origin main

echo "✅ Code pushed to GitHub!"
echo "Now you can import this repository in Vercel"