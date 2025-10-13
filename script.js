const featuredVideos = [
  {
    id: 1,
    title: "Newton'un Hareket Yasaları",
    description: "Newton'un hareket yasalarını öğrenin ve günlük hayatla ilişkilendirin.",
    thumbnail: "https://img.youtube.com/vi/8Ds0JY5XR1o/maxresdefault.jpg",
    duration: "15:30",
    views: 1245,
    uploadDate: "2024-01-10",
    url: "https://www.youtube.com/embed/8Ds0JY5XR1o"
  },
  {
    id: 2,
    title: "Elektrik ve Manyetizma",
    description: "Elektrik ve manyetizmanın temel prensiplerini kavrayın.",
    thumbnail: "https://img.youtube.com/vi/Z3b2vJHgQ5M/maxresdefault.jpg",
    duration: "20:10",
    views: 980,
    uploadDate: "2024-02-05",
    url: "https://www.youtube.com/embed/Z3b2vJHgQ5M"
  },
  {
    id: 3,
    title: "Termodinamik Temelleri",
    description: "Sıcaklık, ısı ve enerji dönüşümlerini anlayın.",
    thumbnail: "https://img.youtube.com/vi/k3aVvDZ1Ra8/maxresdefault.jpg",
    duration: "18:45",
    views: 870,
    uploadDate: "2024-03-12",
    url: "https://www.youtube.com/embed/k3aVvDZ1Ra8"
  }
];

// LocalStorage fonksiyonları
function getVideoViews(videoId) {
    return parseInt(localStorage.getItem(`video_${videoId}_views`) || '0');
}

function incrementVideoViews(videoId) {
    const currentViews = getVideoViews(videoId);
    localStorage.setItem(`video_${videoId}_views`, (currentViews + 1).toString());
    return currentViews + 1;
}

function getVideoProgress(videoId) {
    return parseFloat(localStorage.getItem(`video_${videoId}_progress`) || '0');
}

function setVideoProgress(videoId, progress) {
    localStorage.setItem(`video_${videoId}_progress`, progress.toString());
}

// Öne çıkan videoları yükle
function loadFeaturedVideos() {
    const container = document.getElementById('featured-videos-container');
    if (!container) return;

    const featuredVideos = videoData.units.flatMap(unit => unit.videos).slice(0, 6);
    
    container.innerHTML = featuredVideos.map(video => `
        <div class="video-card" onclick="openVideo(${video.id})" data-aos="fade-up">
            <div class="video-thumbnail">
                ${video.title.charAt(0)}
            </div>
            <div class="video-card-content">
                <h3 class="video-card-title">${video.title}</h3>
                <p class="video-card-desc">${video.description}</p>
                <div class="video-card-meta">
                    <span>⏱️ ${video.duration}</span>
                    <span>👁️ ${getVideoViews(video.id)} izlenme</span>
                    <span>📚 ${video.unit}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Tüm üniteleri yükle
function loadAllUnits() {
    const container = document.getElementById('units-container');
    if (!container) return;

    container.innerHTML = videoData.units.map(unit => `
        <div class="unit-card" data-aos="fade-up">
            <div class="unit-header">
                <h2 class="unit-title">${unit.title}</h2>
            </div>
            <div class="unit-videos">
                ${unit.videos.map(video => `
                    <div class="video-item" onclick="openVideo(${video.id})">
                        <div class="video-item-icon">▶</div>
                        <div class="video-item-content">
                            <div class="video-item-title">${video.title}</div>
                            <div class="video-item-meta">
                                <span>⏱️ ${video.duration}</span>
                                <span>👁️ ${getVideoViews(video.id)} izlenme</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Arama fonksiyonelliği
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterVideos);
    }
}

// Video filtreleme
function filterVideos(e) {
    const searchTerm = e.target.value.toLowerCase();
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const title = item.querySelector('.video-item-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Video oynatıcıyı yükle
function loadVideoPlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = parseInt(urlParams.get('video'));
    
    const video = videoData.units.flatMap(unit => unit.videos).find(v => v.id === videoId);
    
    if (video) {
        // Video bilgilerini güncelle
        document.getElementById('video-title').textContent = video.title;
        document.getElementById('video-desc').textContent = video.description;
        document.getElementById('video-duration').textContent = `⏱️ ${video.duration}`;
        document.getElementById('video-unit').textContent = `📚 ${video.unit}`;
        document.getElementById('video-views').textContent = `👁️ ${getVideoViews(video.id)} izlenme`;
        
        // Video kaynağını ayarla
        const videoElement = document.getElementById('main-video');
        videoElement.querySelector('source').src = video.videoUrl;
        videoElement.load();
        
        // İzlenme sayısını artır
        const newViews = incrementVideoViews(video.id);
        document.getElementById('video-views').textContent = `👁️ ${newViews} izlenme`;
        
        // İlerlemeyi takip et
        videoElement.addEventListener('timeupdate', function() {
            const progress = (this.currentTime / this.duration) * 100;
            setVideoProgress(video.id, progress);
        });
        
        // Kayıtlı ilerlemeyi yükle
        const savedProgress = getVideoProgress(video.id);
        if (savedProgress > 0) {
            videoElement.addEventListener('loadedmetadata', function() {
                this.currentTime = (savedProgress / 100) * this.duration;
            });
        }
        
        // İlgili videoları yükle
        loadRelatedVideos(video.unit, video.id);
    }
}

// İlgili videoları yükle
function loadRelatedVideos(unitName, currentVideoId) {
    const container = document.getElementById('related-videos');
    if (!container) return;
    
    const relatedVideos = videoData.units
        .flatMap(unit => unit.videos)
        .filter(video => video.unit === unitName && video.id !== currentVideoId);
    
    container.innerHTML = relatedVideos.map(video => `
        <a href="video-player.html?video=${video.id}" class="related-video-item">
            <div class="video-item-icon">▶</div>
            <div class="video-item-content">
                <div class="video-item-title">${video.title}</div>
                <div class="video-item-meta">
                    <span>⏱️ ${video.duration}</span>
                </div>
            </div>
        </a>
    `).join('');
}

// Video açma fonksiyonu
function openVideo(videoId) {
    window.location.href = `video-player.html?video=${videoId}`;
}

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
