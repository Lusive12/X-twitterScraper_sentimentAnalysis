# 📤 MongoDB Export Guide

Panduan cara export data dari MongoDB ke file JSON untuk dashboard website.

---

## Option 1: MongoDB Compass (GUI - Paling Mudah)

### Steps:
1. **Buka MongoDB Compass**
   - URL: `mongodb://localhost:27017`
   - Database: `sentiment_pipeline`
   - Collection: `sentiment_analysis`

2. **Export Collection**
   - Klik kanan pada collection → **Export Collection**
   - Format: **JSON**
   - Lokasi: `website/data/sentiment_data.json`

3. **Done!** Dashboard akan otomatis load data.

---

## Option 2: MongoDB Shell (Command Line)

### Terminal Command:

```bash
# Login ke MongoDB
mongo mongodb://localhost:27017/sentiment_pipeline

# Export collection ke JSON
db.sentiment_analysis.find().toArray().forEach(doc => {
  delete doc._id;
  print(JSON.stringify(doc));
});
```

Kemudian copy output ke `website/data/sentiment_data.json` dengan format array:

```json
[
  { /* tweet 1 */ },
  { /* tweet 2 */ },
  ...
]
```

---

## Option 3: mongoexport (CLI Tool)

Jika sudah install MongoDB CLI tools:

```bash
mongoexport --uri="mongodb://localhost:27017/sentiment_pipeline" \
  --collection=sentiment_analysis \
  --type=json \
  --out=website/data/sentiment_data.json \
  --pretty
```

---

## Option 4: Node.js Script (Programmable)

Buat file `export-data.js`:

```javascript
const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://localhost:27017/sentiment_pipeline';
const client = new MongoClient(uri);

async function exportData() {
  try {
    await client.connect();
    const db = client.db('sentiment_pipeline');
    const collection = db.collection('sentiment_analysis');
    
    const documents = await collection.find({}).toArray();
    
    // Remove MongoDB _id field
    const cleanDocs = documents.map(doc => {
      const { _id, ...rest } = doc;
      return rest;
    });
    
    // Write to file
    fs.writeFileSync(
      'website/data/sentiment_data.json',
      JSON.stringify(cleanDocs, null, 2)
    );
    
    console.log(`✅ Exported ${cleanDocs.length} documents`);
  } finally {
    await client.close();
  }
}

exportData();
```

Jalankan:
```bash
npm install mongodb
node export-data.js
```

---

## ✅ Validation

Setelah export, pastikan file `website/data/sentiment_data.json`:

- [ ] Adalah valid JSON (gunakan [jsonlint.com](https://www.jsonlint.com))
- [ ] Berisi array documents
- [ ] Setiap document punya field: `sentiment`, `emotion`, `support_score`, `key_topics`
- [ ] File size > 1KB (ada data)

### Test dengan cURL:
```bash
curl --output /dev/null -s -w "%{http_code}" file://website/data/sentiment_data.json
```

---

## 🔄 Auto-Export dengan Scheduler

### Crontab (Linux/Mac):

```bash
# Edit crontab
crontab -e

# Add this line (export every day at 2 AM):
0 2 * * * cd /path/to/sentiment-pipeline && node export-data.js
```

### Windows Task Scheduler:
1. Task Scheduler → Create Basic Task
2. Trigger: Daily at 2:00 AM
3. Action: Run `node export-data.js` in `C:\path\to\sentiment-pipeline`

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Pastikan MongoDB running: `docker-compose ps`
- Check connection string di `.env`

### "Export file kosong"
- Pastikan ada data di `sentiment_analysis` collection
- Test: `db.sentiment_analysis.countDocuments()` di Compass

### "Dashboard says 'Data file not found'"
- Pastikan file path: `website/data/sentiment_data.json`
- Check file permissions: `chmod 644 website/data/sentiment_data.json`

---

## 📊 Data Format Validation

Expected JSON structure:

```json
[
  {
    "tweet_id": "string (unique)",
    "text_analyzed": "string",
    "author": "string",
    "tweet_url": "string",
    "sentiment": "Positive|Neutral|Negative",
    "emotion": "Supportive|Critical|Skeptical|Neutral|Angry|Concerned",
    "support_score": 0-100,
    "key_topics": ["string", "string"],
    "opinion_type": "Praise|Criticism|Neutral|Suggestion",
    "summary": "string",
    "analyzed_at": "ISO8601 date string"
  }
]
```

---

## Next Steps

Setelah export:
1. Buka `website/index.html` di browser
2. Verify dashboard load charts & data
3. Test search & filter features
4. Commit `sentiment_data.json` ke GitHub

---

**Updated**: Juni 2024