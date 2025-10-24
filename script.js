let videoData = null;

// JSON verilerini yükle
async function loadVideoData() {
    try {
        const response = await fetch('data.json');
        videoData = await response.json();
        return videoData;
    } catch (error) {
        console.error('Veri yüklenirken hata oluştu:', error);
        return { units: [] };
    }
}

function getVideoProgress(videoId) {
    return parseFloat(localStorage.getItem(`video_${videoId}_progress`) || '0');
}

function setVideoProgress(videoId, progress) {
    localStorage.setItem(`video_${videoId}_progress`, progress.toString());
}

async function loadFeaturedVideos() {
    const container = document.getElementById('featured-videos-container');
    if (!container) return;

    if (!videoData) {
        await loadVideoData();
    }

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
                    <span>📚 ${video.unit}</span>
                </div>
            </div>
        </div>
    `).join('');
}

async function loadAllUnits() {
    const container = document.getElementById('units-container');
    if (!container) return;

    if (!videoData) {
        await loadVideoData();
    }

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
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterVideos);
    }
}

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

async function loadVideoPlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = parseInt(urlParams.get('video'));
    
    if (!videoData) {
        await loadVideoData();
    }

    const video = videoData.units.flatMap(unit => unit.videos).find(v => v.id === videoId);
    
    if (video) {
        document.getElementById('video-title').textContent = video.title;
        document.getElementById('video-desc').textContent = video.description;
        document.getElementById('video-duration').textContent = `⏱️ ${video.duration}`;
        document.getElementById('video-unit').textContent = `📚 ${video.unit}`;
        
        const videoElement = document.getElementById('main-video');
        videoElement.querySelector('source').src = video.videoUrl;
        videoElement.load();
        
        videoElement.addEventListener('timeupdate', function() {
            const progress = (this.currentTime / this.duration) * 100;
            setVideoProgress(video.id, progress);
        });
        
        const savedProgress = getVideoProgress(video.id);
        if (savedProgress > 0) {
            videoElement.addEventListener('loadedmetadata', function() {
                this.currentTime = (savedProgress / 100) * this.duration;
            });
        }
        
        loadRelatedVideos(video.unit, video.id);
    }
}

async function loadRelatedVideos(unitName, currentVideoId) {
    const container = document.getElementById('related-videos');
    if (!container) return;
    
    if (!videoData) {
        await loadVideoData();
    }

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

function openVideo(videoId) {
    window.location.href = `video-player.html?video=${videoId}`;
}

document.addEventListener('DOMContentLoaded', function() {
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
