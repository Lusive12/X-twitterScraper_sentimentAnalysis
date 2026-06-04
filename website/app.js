// Global Variables
let allTweets = [];
let filteredTweets = [];
let currentPage = 1;
const tweetsPerPage = 10;
let charts = {};

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Dashboard loading...');
    await loadData();
    setupEventListeners();
});

// Load Data from JSON
async function loadData() {
    try {
        const response = await fetch('data/sentiment_analysis.json');
        
        if (!response.ok) {
            throw new Error('Data file not found. Run: npm run export-data');
        }

        allTweets = await response.json();
        
        if (!Array.isArray(allTweets) || allTweets.length === 0) {
            showError('Dataset kosong atau format tidak valid.');
            return;
        }

        console.log(`✅ Loaded ${allTweets.length} tweets`);
        
        // Render Dashboard
        updateStats();
        renderCharts();
        renderTweetsTable();
        updateDataStatus();
        
    } catch (error) {
        console.error('❌ Data loading error:', error);
        showError(`Error loading data: ${error.message}`);
    }
}

// Update Statistics
function updateStats() {
    const totalTweets = allTweets.length;
    const analyzedTweets = allTweets.filter(t => t.sentiment).length;
    
    const supportScores = allTweets
        .filter(t => t.support_score !== undefined)
        .map(t => parseInt(t.support_score));
    
    const avgSupport = supportScores.length > 0 
        ? Math.round(supportScores.reduce((a, b) => a + b, 0) / supportScores.length)
        : 0;
    
    const maxSupport = supportScores.length > 0 ? Math.max(...supportScores) : 0;
    const minSupport = supportScores.length > 0 ? Math.min(...supportScores) : 0;

    // Update Header Stats
    document.getElementById('total-tweets').textContent = totalTweets;
    document.getElementById('analyzed-tweets').textContent = analyzedTweets;
    document.getElementById('avg-support').textContent = avgSupport;

    // Update Score Details
    document.getElementById('max-support').textContent = maxSupport;
    document.getElementById('min-support').textContent = minSupport;
    document.getElementById('avg-support-detail').textContent = avgSupport;
}

// Render Charts
function renderCharts() {
    // 1. Sentiment Pie Chart
    renderSentimentChart();

    // 2. Emotion Bar Chart
    renderEmotionChart();

    // 3. Opinion Type Chart
    renderOpinionChart();

    // 4. Support Score Histogram
    renderSupportHistogram();

    // 5. Top Topics
    renderTopics();
}

function renderSentimentChart() {
    const sentiments = countByField('sentiment');
    const ctx = document.getElementById('sentiment-pie-chart').getContext('2d');
    
    const labels = Object.keys(sentiments);
    const data = Object.values(sentiments);
    const colors = {
        'Positive': '#10b981',
        'Neutral': '#6b7280',
        'Negative': '#ef4444'
    };

    charts.sentiment = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: labels.map(l => colors[l] || '#999'),
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });

    // Update Legend
    const legend = document.getElementById('sentiment-legend');
    legend.innerHTML = labels.map(label => `
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${colors[label]}"></div>
            <span>${label} (${sentiments[label]})</span>
        </div>
    `).join('');
}

function renderEmotionChart() {
    const emotions = countByField('emotion');
    const ctx = document.getElementById('emotion-bar-chart').getContext('2d');
    
    const emotionColors = {
        'Supportive': '#059669',
        'Critical': '#dc2626',
        'Skeptical': '#f59e0b',
        'Neutral': '#9ca3af',
        'Angry': '#991b1b',
        'Concerned': '#7c3aed'
    };

    const labels = Object.keys(emotions);
    const data = Object.values(emotions);

    charts.emotion = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Tweet',
                data: data,
                backgroundColor: labels.map(l => emotionColors[l] || '#999'),
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { beginAtZero: true }
            }
        }
    });
}

function renderOpinionChart() {
    const opinions = countByField('opinion_type');
    const ctx = document.getElementById('opinion-bar-chart').getContext('2d');
    
    const labels = Object.keys(opinions);
    const data = Object.values(opinions);
    const colors = ['#3b82f6', '#ef4444', '#6b7280', '#f59e0b'];

    charts.opinion = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Tweet',
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x',
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function renderSupportHistogram() {
    const scores = allTweets
        .map(t => parseInt(t.support_score) || 0)
        .sort((a, b) => a - b);
    
    // Create bins: 0-20, 21-40, 41-60, 61-80, 81-100
    const bins = { '0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0 };
    
    scores.forEach(score => {
        if (score <= 20) bins['0-20']++;
        else if (score <= 40) bins['21-40']++;
        else if (score <= 60) bins['41-60']++;
        else if (score <= 80) bins['61-80']++;
        else bins['81-100']++;
    });

    const ctx = document.getElementById('support-histogram').getContext('2d');
    
    charts.support = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(bins),
            datasets: [{
                label: 'Distribusi Skor',
                data: Object.values(bins),
                backgroundColor: '#3b82f6',
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}

function renderTopics() {
    const topicCounts = {};
    
    allTweets.forEach(tweet => {
        if (Array.isArray(tweet.key_topics)) {
            tweet.key_topics.forEach(topic => {
                topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            });
        }
    });

    // Get top 12 topics
    const topTopics = Object.entries(topicCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12);

    const topicsContainer = document.getElementById('topics-list');
    
    if (topTopics.length === 0) {
        topicsContainer.innerHTML = '<p class="loading">Tidak ada topik ditemukan</p>';
        return;
    }

    topicsContainer.innerHTML = topTopics.map(([topic, count]) => `
        <div class="topic-tag">
            <div>${topic}</div>
            <div class="count">${count}</div>
        </div>
    `).join('');
}

// Render Tweets Table
function renderTweetsTable(pageNum = 1) {
    currentPage = pageNum;
    const start = (pageNum - 1) * tweetsPerPage;
    const end = start + tweetsPerPage;
    const pageData = filteredTweets.slice(start, end);

    const tbody = document.getElementById('tweets-tbody');

    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="loading">Tidak ada tweet ditemukan</td></tr>';
        document.getElementById('prev-page').disabled = true;
        document.getElementById('next-page').disabled = true;
        return;
    }

    tbody.innerHTML = pageData.map(tweet => `
        <tr>
            <td title="${tweet.text_analyzed}">${truncate(tweet.text_analyzed, 40)}</td>
            <td><a href="${tweet.tweet_url}" target="_blank" title="${tweet.author}">@${truncate(tweet.author, 15)}</a></td>
            <td><span class="sentiment-badge sentiment-${tweet.sentiment.toLowerCase()}">${tweet.sentiment}</span></td>
            <td><span class="emotion-badge emotion-${tweet.emotion.toLowerCase().replace(/\s/g, '-')}">${tweet.emotion}</span></td>
            <td><strong>${tweet.support_score}</strong>/100</td>
            <td>${(tweet.key_topics || []).slice(0, 2).join(', ') || '-'}</td>
            <td>${tweet.opinion_type}</td>
        </tr>
    `).join('');

    // Update Pagination
    const totalPages = Math.ceil(filteredTweets.length / tweetsPerPage);
    document.getElementById('page-info').textContent = `Halaman ${pageNum} dari ${totalPages}`;
    document.getElementById('prev-page').disabled = pageNum === 1;
    document.getElementById('next-page').disabled = pageNum === totalPages;
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
        filterAndRender();
    });

    // Filter
    document.getElementById('sentiment-filter').addEventListener('change', (e) => {
        filterAndRender();
    });

    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) renderTweetsTable(currentPage - 1);
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredTweets.length / tweetsPerPage);
        if (currentPage < totalPages) renderTweetsTable(currentPage + 1);
    });
}

// Filter and Render
function filterAndRender() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const sentimentFilter = document.getElementById('sentiment-filter').value;

    filteredTweets = allTweets.filter(tweet => {
        const matchesSearch = !searchQuery || 
            tweet.text_analyzed.toLowerCase().includes(searchQuery) ||
            tweet.author.toLowerCase().includes(searchQuery) ||
            tweet.summary.toLowerCase().includes(searchQuery);
        
        const matchesSentiment = !sentimentFilter || tweet.sentiment === sentimentFilter;
        
        return matchesSearch && matchesSentiment;
    });

    renderTweetsTable(1);
}

// Utility Functions
function countByField(field) {
    const counts = {};
    allTweets.forEach(tweet => {
        const value = tweet[field] || 'Unknown';
        counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
}

function truncate(text, length) {
    return text && text.length > length ? text.substring(0, length) + '...' : text;
}

function showError(message) {
    const status = document.getElementById('data-status');
    status.innerHTML = `❌ <strong>Error:</strong> ${message}`;
    status.style.color = '#ef4444';
}

function updateDataStatus() {
    const now = new Date();
    const formatted = now.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    document.getElementById('last-update').textContent = formatted;
    document.getElementById('data-status').innerHTML = 
        `✅ Dataset berhasil dimuat (${allTweets.length} tweet)`;
}

// Auto-reload every 5 minutes (optional)
// setInterval(() => loadData(), 5 * 60 * 1000);