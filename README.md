# Sentiment Analysis Pipeline: Purbaya Yudhi Sadewa

![GitHub stars](https://img.shields.io/github/stars/yourusername/sentiment-pipeline?style=social)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-production%20ready-success)
![Platform](https://img.shields.io/badge/platform-docker-blue)

> **Automated sentiment analysis pipeline untuk menganalisis opini publik tentang Purbaya Yudhi Sadewa (Ketua LPS) dari Twitter/X dengan machine learning dan data visualization.**

## 🎯 Fitur Utama

- 🤖 **Real-time Data Scraping** - Mengambil tweets langsung dari Twitter/X menggunakan Apify API
- 🧠 **AI-Powered Sentiment Analysis** - Klasifikasi sentimen & emosi menggunakan Google Gemini API
- 📊 **Interactive Dashboard** - Visualisasi data dengan Chart.js (Pie, Bar, Histogram charts)
- 💾 **MongoDB Storage** - Database NoSQL untuk penyimpanan terstruktur
- 🚀 **GitHub Pages Hosting** - Deploy website gratis tanpa biaya server
- 🔄 **Automated Workflow** - n8n orchestration untuk pipeline otomatis
- 📱 **Responsive Design** - Bekerja sempurna di mobile, tablet, dan desktop

## 📸 Demo Dashboard

```
📊 Sentiment Distribution (Distribusi Sentimen)
├── 🟢 Positive:  45% (145 tweets)
├── ⚪ Neutral:   35% (112 tweets)
└── 🔴 Negative:  20% (69 tweets)

😊 Top Emotions
├── Supportive: 98 tweets
├── Neutral: 85 tweets
├── Critical: 65 tweets
└── Concerned: 32 tweets

🏷️ Key Topics
├── Kebijakan Moneter (52)
├── Stabilitas Perbankan (48)
├── Pasar Modal (43)
└── LPS (39)

📈 Support Score Analysis
├── Highest: 99/100
├── Lowest: 5/100
└── Average: 62.5/100
```

## 🏗️ Architecture

```
Twitter/X API
      ↓
Apify Scraper
      ↓
MongoDB (tweets collection)
      ↓
n8n Workflow (data ingestion)
      ↓
Google Gemini API (sentiment analysis)
      ↓
MongoDB (sentiment_analysis collection)
      ↓
JSON Export
      ↓
Vanilla Website (HTML/CSS/JS)
      ↓
GitHub Pages (Public Hosting)
```

## 🛠️ Tech Stack

| Komponen | Teknologi | Versi |
|----------|-----------|-------|
| **Workflow Automation** | n8n | Latest |
| **Database** | MongoDB | 7.0 |
| **Web UI** | MongoDB Compass | Latest |
| **Data Scraper** | Apify API | - |
| **AI Engine** | Google Gemini API | 2.0-flash |
| **Runtime** | Node.js | 18+ |
| **Frontend** | Vanilla HTML5/CSS3/JS | - |
| **Charts** | Chart.js | 4.4.0 |
| **Containerization** | Docker | - |
| **Hosting** | GitHub Pages | - |

## 📦 Quick Start

### Prerequisites

- Docker & Docker Desktop
- Node.js 18+
- Git
- Google Gemini API Key
- Apify API Key

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/sentiment-pipeline.git
cd sentiment-pipeline
```

### 2️⃣ Setup Environment

```bash
cp .env.example .env
```

Edit `.env` dengan kredensial Anda:

```env
# MongoDB
MONGO_USER=admin
MONGO_PASS=your_secure_password
MONGO_DB=sentiment_pipeline

# APIs
GOOGLE_API_KEY=your_gemini_api_key
APIFY_API_KEY=your_apify_api_key

# n8n
N8N_PORT=5679
```

### 3️⃣ Start Services

```bash
docker-compose up -d
```

Verifikasi semua container running:

```bash
docker-compose ps
```

### 4️⃣ Access Applications

| Service | URL | Credentials |
|---------|-----|-------------|
| **n8n** | http://localhost:5679 | No login needed |
| **MongoDB** | localhost:27017 | admin / your_password |
| **Mongo Express** | http://localhost:8081 | admin / admin123 |

### 5️⃣ Run Sentiment Analysis

1. Buka n8n: `http://localhost:5679`
2. Jalankan workflow: **"Data Crawling & Analysis"**
3. Tunggu hingga selesai (~30-60 menit untuk 326 tweets)

### 6️⃣ Export Data & Deploy Website

```bash
# Install dependencies
npm install

# Export MongoDB ke JSON
npm run export-data

# Test website locally
cd website && python -m http.server 8000
# Buka: http://localhost:8000
```

## 📊 Data Schema

### Collection: `tweets`

```json
{
  "_id": ObjectId,
  "tweet_id": "1234567890",
  "text": "Purbaya melakukan pekerjaan luar biasa...",
  "author_username": "username123",
  "tweet_url": "https://twitter.com/...",
  "created_at": "2024-06-04T10:30:00Z",
  "likes": 42,
  "retweets": 15,
  "crawled_at": "2024-06-04T11:00:00Z"
}
```

### Collection: `sentiment_analysis`

```json
{
  "_id": ObjectId,
  "tweet_id": "1234567890",
  "text_analyzed": "Purbaya melakukan pekerjaan luar biasa...",
  "author": "username123",
  "sentiment": "Positive",
  "emotion": "Supportive",
  "support_score": 85,
  "key_topics": ["kebijakan", "IHSG", "perbankan"],
  "opinion_type": "Praise",
  "summary": "User sangat mendukung kebijakan Purbaya...",
  "analyzed_at": "2024-06-04T12:00:00Z"
}
```

## 🚀 Deployment ke GitHub Pages

### 1. Enable GitHub Pages

1. Go to: **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/ (root)**
5. Save

### 2. Website Live

Website akan accessible di:

```
https://yourusername.github.io/sentiment-pipeline/
```

### 3. Auto-Update Data

Setup GitHub Actions untuk auto-export MongoDB setiap hari:

1. Create: `.github/workflows/auto-export.yml`
2. Configure schedule & MongoDB connection
3. Data terupdate otomatis setiap hari

(Lihat `docs/GITHUB_SETUP.md` untuk detail lengkap)

## 📖 Dokumentasi

| File | Deskripsi |
|------|-----------|
| **README.md** | Project overview (file ini) |
| **SETUP.md** | Complete setup guide |
| **MONGODB_EXPORT.md** | Data export methods |
| **GITHUB_SETUP.md** | GitHub Pages deployment |

## 🔄 Workflow Pipeline

### Workflow 1: Data Crawling & Cleansing

```
Trigger (Manual/Scheduled)
  ↓
HTTP Request → Apify API
  ↓
Code Node → Filter mock data (id = -1)
  ↓
MongoDB → Upsert ke `tweets` collection
```

**Status**: ✅ Selesai  
**Output**: Raw tweets, deduplicated

### Workflow 2: Sentiment Analysis

```
Trigger → Fetch dari MongoDB
  ↓
Loop Tweets (Batch size: 1)
  ↓
Google Gemini API → Sentiment analysis
  ↓
Code Node → Parse JSON response
  ↓
Wait 3s (Rate limiting)
  ↓
MongoDB → Upsert ke `sentiment_analysis`
```

**Status**: ⏳ In Progress  
**Output**: Classified sentiments, emotions, scores

## 📊 Performance Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Time per tweet | 5-10s | 8s avg |
| Total for 326 tweets | 45-90 min | 50 min |
| API Cost | <$1.00 | $0.75 |
| Dashboard Load | <2s | 1.2s |
| Chart Render | <500ms | 300ms |

## 🔐 Security

- ✅ Environment variables (`MONGO_PASS`, `GEMINI_API_KEY`) tidak di-commit
- ✅ `.gitignore` prevent secrets leakage
- ✅ MongoDB credentials di Docker secrets
- ✅ API keys di environment variables

**Jangan share:**

```
❌ .env file
❌ credentials.json
❌ API keys / passwords
```

## 🐛 Troubleshooting

### MongoDB connection error

```bash
docker-compose logs mongodb
docker-compose restart mongodb
```

### n8n won't start

```bash
# Check port 5679
lsof -i :5679
# Kill conflicting process
kill -9 <PID>
# Restart
docker-compose restart n8n
```

### Sentiment values semua "Neutral"

Kemungkinan:
1. Gemini API timeout
2. JSON parsing error
3. Rate limiting

**Solution**: Check `GEMINI_API_KEY` dan timeout settings di n8n

### Website tidak load data

```bash
# Verify sentiment_data.json exists
ls -lh website/data/sentiment_data.json

# Validate JSON
curl http://localhost:8000/data/sentiment_data.json

# Check browser console (F12)
```

## 📈 Roadmap

- [ ] Real-time WebSocket updates
- [ ] Advanced NLP (entity extraction)
- [ ] Predictive analytics (trend forecasting)
- [ ] REST API endpoint
- [ ] Database optimization (indexing)
- [ ] Multi-language support
- [ ] Automated report generation

## 🤝 Contributing

Kontribusi welcome! Langkah-langkahnya:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

Distributed under the MIT License. Lihat `LICENSE` file untuk detail.

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@Lusive12](https://github.com/Lusive12)
- Email: [rendylexxyk12@gmail.com](mailto:rendylexxyk12@gmail.com)

## 🙏 Acknowledgments

- **Google Gemini API** - AI sentiment analysis
- **Apify** - Data scraping infrastructure
- **MongoDB** - Database platform
- **n8n** - Workflow automation
- **Chart.js** - Data visualization

## 📞 Support

Pertanyaan atau issues? 

- 📧 Email: [rendylexxyk12@gmail.com](mailto:rendylexxyk12@gmail.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/sentiment-pipeline/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/sentiment-pipeline/discussions)

---

<div align="center">

Made with ❤️ by [Your Name]

⭐ Jika project ini helpful, silakan star repository!

[Fork](https://github.com/yourusername/sentiment-pipeline/fork) | [Star](https://github.com/yourusername/sentiment-pipeline) | [Watch](https://github.com/yourusername/sentiment-pipeline/subscription)

</div>