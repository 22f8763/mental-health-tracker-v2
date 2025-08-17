# Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub/GitLab/Bitbucket account (to connect your repository)

## Deployment Steps

1. **Push your code** to a GitHub/GitLab/Bitbucket repository

2. **Go to Vercel** and click on "New Project"

3. **Import your repository** from your Git provider

4. **Configure Project**
   - Framework: Next.js
   - Root Directory: (leave as is, should be the root of your project)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Environment Variables**
   Add these environment variables in Vercel's project settings:
   ```
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_SECRET=your_secure_random_string
   NEXTAUTH_URL=your_vercel_app_url
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   ```

6. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

## Post-Deployment
- Set up custom domains if needed
- Configure environment variables for production
- Set up automatic deployments on git push

## Troubleshooting
- If you encounter build errors, check the deployment logs in the Vercel dashboard
- Ensure all environment variables are properly set
- Make sure your database is accessible from Vercel's servers
