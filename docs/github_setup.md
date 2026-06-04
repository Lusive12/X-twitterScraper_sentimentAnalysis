# 🚀 GitHub Setup & Deployment Guide

Panduan lengkap untuk initialize project ke GitHub dan deploy website ke GitHub Pages.

---

## Step 1: Prepare Local Repository

### 1.1 Initialize Git (jika belum)

```bash
cd sentiment-pipeline
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 1.2 Add .gitignore

Pastikan `.gitignore` sudah ada dan berisi:

```
.env
.env.local
credentials.json
node_modules/
.DS_Store
.vscode/
mongodb/data/
```

### 1.3 Verify File Structure

```bash
tree -L 2 -a --gitignore
```

Expected output:
```
sentiment-pipeline/
├── .git/
├── .gitignore
├── .env.example
├── README.md
├── index.html
├── style.css
├── app.js
├── chart-config.js
├── sentiment_data.json
└── n8n-workflows/
```

---

## Step 2: Create GitHub Repository

### 2.1 Go to GitHub

1. **Open**: https://github.com/new
2. **Repository name**: `sentiment-pipeline`
3. **Description**: "Pipeline Analisis Sentimen Purbaya Yudhi Sadewa"
4. **Visibility**: Public (jika ingin di GitHub Pages)
5. **Don't initialize** dengan README/gitignore (kita punya local)
6. **Click**: Create repository

### 2.2 Copy Repository URL

Setelah dibuat, copy HTTPS URL:
```
https://github.com/yourusername/sentiment-pipeline.git
```

---

## Step 3: Push Local Code to GitHub

### 3.1 Add Remote Origin

```bash
git remote add origin https://github.com/yourusername/sentiment-pipeline.git
git branch -M main
```

### 3.2 Add & Commit Files

```bash
git add .
git commit -m "Initial commit: sentiment analysis dashboard"
```

### 3.3 Push to GitHub

```bash
git push -u origin main
```

### 3.4 Verify

Go to: `https://github.com/yourusername/sentiment-pipeline`
- Check files ada
- Check README visible

---

## Step 4: Enable GitHub Pages

### 4.1 Repository Settings

1. Go to: Settings → Pages (atau `/settings/pages`)
2. **Source**: Deploy from a branch
3. **Branch**: `main`
4. **Folder**: `/ (root)`
5. **Save**

### 4.2 Wait for Deployment

GitHub akan build & deploy. Tunggu sampai status hijau ✅.

**Website URL**: `https://yourusername.github.io/sentiment-pipeline/`

Test buka di browser → harus load dashboard

---

## Step 5: Update data/sentiment_data.json

### 5.1 Export dari MongoDB

(Lihat `MONGODB_EXPORT.md` untuk detail)

```bash
# Option: Manual export
# 1. Buka MongoDB Compass
# 2. Collection: sentiment_analysis
# 3. Export → website/data/sentiment_data.json
```

### 5.2 Commit & Push

```bash
git add data/sentiment_data.json
git commit -m "Add sentiment analysis data"
git push
```

Website akan auto-update dalam ~1 menit.

---

## Step 6: Setup GitHub Secrets (Optional - untuk CI/CD)

Jika ingin auto-export dari MongoDB setiap hari:

### 6.1 Go to Settings → Secrets and variables → Actions

### 6.2 Add These Secrets:

```
MONGODB_URI: mongodb://username:password@host:port/sentiment_pipeline
GOOGLE_API_KEY: your_gemini_api_key
APIFY_API_KEY: your_apify_api_key
```

### 6.3 Create GitHub Action

File: `.github/workflows/auto-export.yml`

```yaml
name: Auto Export MongoDB Data

on:
  schedule:
    # Setiap hari jam 2 pagi UTC
    - cron: '0 2 * * *'
  workflow_dispatch: # Manual trigger

jobs:
  export:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install mongodb
      
      - name: Export MongoDB data
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
        run: |
          node export-data.js
      
      - name: Commit & Push
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add data/sentiment_data.json
          git commit -m "Auto: Update sentiment data" || true
          git push
```

---

## Step 7: Ongoing Maintenance

### 7.1 Regular Updates

```bash
# After new sentiment analysis in n8n
npm run export-data
git add data/sentiment_data.json
git commit -m "Update: Add new sentiment analysis"
git push
```

### 7.2 Update Website Code

```bash
# Edit index.html, app.js, style.css
git add website/
git commit -m "Feature: Add new chart"
git push
```

### 7.3 Monitor GitHub Pages Build

- Go to Settings → Pages
- Check "Latest deployment" status
- View build logs if error

---

## Step 8: Custom Domain (Optional)

Jika ingin domain sendiri (misal `sentimen.example.com`):

### 8.1 Repository Settings → Pages

1. **Custom domain**: `sentimen.example.com`
2. Save

### 8.2 DNS Configuration

Di DNS provider (Cloudflare, Namecheap, etc):

```
Type: CNAME
Name: sentimen
Value: yourusername.github.io
```

### 8.3 Verify HTTPS

GitHub auto-enable HTTPS dalam ~24 jam.

---

## 🐛 Troubleshooting

### "Pages won't build"
- Check GitHub Actions tab
- See error in workflow logs
- Common: HTML syntax error

### "Data not loading on website"
- Check `sentiment_data.json` path
- Validate JSON: https://jsonlint.com
- Check browser console (F12 → Network)

### "404 on GitHub Pages"
- Verify branch is `main` not `master`
- Check `.gitignore` bukan hide index.html
- Run: `git ls-files | grep index.html`

### "Styles not loading"
- Path issue: check CSS relative paths
- CSS: `<link rel="stylesheet" href="style.css">`
- Chart.js: dari CDN (harus ada internet)

---

## 📋 Checklist Deployment

- [ ] Repository created on GitHub
- [ ] Local files committed & pushed
- [ ] GitHub Pages enabled (Settings → Pages)
- [ ] Website accessible at github pages URL
- [ ] Data file `sentiment_data.json` exported
- [ ] Dashboard loads data correctly
- [ ] All charts render
- [ ] Search/filter works
- [ ] Responsive on mobile

---

## 🔒 Security Reminders

**NEVER commit:**
- `.env` file dengan API keys
- `credentials.json`
- Database passwords

**Use:**
- `.env.example` untuk template
- GitHub Secrets untuk sensitive data
- `git rm --cached .env` jika commit salah

---

## 📚 Additional Resources

- GitHub Pages Docs: https://docs.github.com/en/pages
- GitHub Actions: https://docs.github.com/en/actions
- Chart.js Docs: https://www.chartjs.org/docs

---

## Quick Reference

```bash
# Clone untuk testing
git clone https://github.com/yourusername/sentiment-pipeline.git
cd sentiment-pipeline

# Setup environment
cp .env.example .env
# Edit .env dengan kredensial

# Push changes
git add .
git commit -m "Description"
git push

# Check deployment
# Visit: https://yourusername.github.io/sentiment-pipeline/
```

---

**Last Updated**: Juni 2024
**Status**: Production Ready ✅