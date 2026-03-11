# TJ Portfolio - Deployment Instructions

## Quick Deploy to Vercel (5 minutes)

### Step 1: Install Git and Node.js
1. Download Git: https://git-scm.com/downloads
2. Download Node.js: https://nodejs.org/ (get LTS version)
3. Install both

### Step 2: Set Up Your Project
1. Download ALL these files to a folder called `tj-portfolio`
2. Open Terminal/Command Prompt
3. Navigate to the folder:
   ```
   cd path/to/tj-portfolio
   ```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Test Locally (Optional)
```bash
npm run dev
```
Open http://localhost:5173 in your browser

### Step 5: Deploy to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your `tj-portfolio` folder
5. Click "Deploy"
6. **Done!** Your site is live

## Alternative: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. In your project folder:
   ```bash
   vercel
   ```

3. Follow the prompts
4. Done!

## File Structure
```
tj-portfolio/
├── package.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
```

## Need Help?
- Make sure all files are in the right folders
- Run `npm install` before deploying
- Check that Node.js and Git are installed
