# Contributing to Sentiment Analysis Pipeline

Terima kasih sudah tertarik untuk berkontribusi! Panduan ini akan membantu Anda memulai.

## 🎯 Cara Berkontribusi

Kami welcome kontribusi dalam bentuk:

- 🐛 **Bug Reports** - Laporkan bugs yang Anda temukan
- ✨ **Feature Requests** - Usulkan fitur baru
- 🔧 **Code Fixes** - Perbaiki bugs atau improve code
- 📚 **Documentation** - Improve dokumentasi atau create tutorials
- 💡 **Performance Improvements** - Optimize kode atau database queries

## 🔧 Development Setup

### 1. Fork Repository

```bash
# Fork di GitHub UI, lalu:
git clone https://github.com/YOUR_USERNAME/sentiment-pipeline.git
cd sentiment-pipeline
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Gunakan nama yang deskriptif:
- ✅ `feature/add-export-csv`
- ✅ `fix/sentiment-parsing-error`
- ✅ `docs/update-readme`
- ❌ `fix/bug`
- ❌ `update`

### 3. Install Dependencies

```bash
npm install
```

### 4. Make Your Changes

- Keep changes focused & small
- Follow existing code style
- Add comments untuk complex logic
- Update documentation jika perlu

### 5. Test Locally

```bash
# Start services
docker-compose up -d

# Run tests (jika ada)
npm test

# Test dashboard
cd website && python -m http.server 8000
```

### 6. Commit dengan Clear Messages

```bash
git add .
git commit -m "feat: add CSV export functionality"
```

**Commit message format:**

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting, missing semicolons)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Adding tests
- `chore:` - Build/dependency updates

**Examples:**

```bash
# Good
git commit -m "fix: resolve sentiment parser timeout issue"
git commit -m "feat: add support for CSV export"
git commit -m "docs: update MongoDB schema documentation"

# Avoid
git commit -m "fix bug"
git commit -m "update"
git commit -m "asdf"
```

### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 8. Open Pull Request

1. Go to GitHub
2. Create Pull Request dari fork ke main repository
3. Provide clear description
4. Reference related issues (e.g., "Fixes #123")

**PR Title Format:**

```
[TYPE] Brief description of changes
```

Examples:
- `[FEATURE] Add CSV export for sentiment data`
- `[FIX] Resolve MongoDB connection timeout`
- `[DOCS] Update setup instructions`

## 📋 Pull Request Checklist

Pastikan PR Anda:

- [ ] Follows existing code style
- [ ] Includes relevant tests
- [ ] Updates documentation
- [ ] No breaking changes (atau documented dengan jelas)
- [ ] Commits memiliki descriptive messages
- [ ] Tidak ada console.log atau debug code
- [ ] .gitignore mencegah API keys/secrets
- [ ] Works dengan latest dependencies

## 🧪 Code Style

### JavaScript

```javascript
// ✅ Good
function analyzeSentiment(tweet) {
  const sentiment = classifySentiment(tweet.text);
  return sentiment;
}

// ❌ Avoid
function analyze(t) {
  var s = classifySentiment(t.text)
  return s
}
```

### File Organization

```
sentiment-pipeline/
├── website/
│   ├── index.html         # Main page
│   ├── css/
│   │   └── style.css      # Styling
│   ├── js/
│   │   ├── app.js         # Main app logic
│   │   └── utils.js       # Helper functions
│   └── data/
│       └── sentiment_data.json
│
├── docs/
│   └── *.md               # Documentation
│
└── src/
    ├── export-data.js     # Scripts
    └── utils/             # Utilities
```

### Comments

```javascript
// ✅ Good: Explain WHY, not WHAT
// Filter out mock data with id = -1 from Apify API
const validTweets = tweets.filter(t => t.id !== -1);

// ❌ Avoid: Obvious comments
// Loop through tweets
tweets.forEach(t => { ... });
```

## 📚 Documentation

Jika menambah feature, update dokumentasi:

1. **Code Comments** - Explain complex logic
2. **README.md** - Update feature list jika applicable
3. **SETUP.md** - Add setup steps jika ada dependencies baru
4. **Inline Docs** - Document function parameters & return values

Example:

```javascript
/**
 * Analyzes sentiment of a tweet
 * @param {string} text - Tweet text to analyze
 * @param {string} apiKey - Google Gemini API key
 * @returns {Promise<Object>} Sentiment analysis result
 */
async function analyzeSentiment(text, apiKey) {
  // Implementation
}
```

## 🧹 Code Review Process

1. **Automated Checks**
   - Code linting
   - Security scanning
   - Dependency updates

2. **Manual Review**
   - Code quality
   - Architecture decisions
   - Documentation

3. **Discussion**
   - We'll provide feedback
   - Discuss improvements
   - Iterate together

## 🚀 Release Process

- Releases follow [Semantic Versioning](https://semver.org/)
- Format: `v<MAJOR>.<MINOR>.<PATCH>`
- Changelog maintained di `CHANGELOG.md`

## 📞 Questions?

- 💬 Open an Issue untuk questions
- 📧 Email maintainers untuk private concerns
- 💭 Discussions tab untuk general topics

## ⚖️ Code of Conduct

- Respect semua kontributor
- Inclusive & welcoming environment
- No harassment atau discrimination
- Report violations ke maintainers

## 🎓 Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [n8n Documentation](https://docs.n8n.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 💡 Good First Issues

Cari issues berlabel `good first issue` - ini ideal untuk pemula!

[View Good First Issues](https://github.com/yourusername/sentiment-pipeline/labels/good%20first%20issue)

---

**Thank you for contributing! 🎉**

Setiap kontribusi, besar atau kecil, sangat dihargai dan membantu membuat project ini lebih baik.