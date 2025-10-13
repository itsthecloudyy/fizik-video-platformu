const videoData = {
  units: [
    {
      id: 1,
      title: "Fizik Bilimi ve Kariyer Keşfi",
      videos: [
        {
          id: 1,
          title: "Fizik Bilimi ve Kariyer Keşfi",
          description: "Fizik biliminin temelleri ve fizik alanındaki kariyer olanakları",
          duration: "12:23",
          unit: "Fizik Bilimine Giriş",
          videoUrl: "https://ia601006.us.archive.org/22/items/1_20251009_20251009_1605/1.mp4"
        }
      ]
    },
    {
      id: 2,
      title: "Kuvvet ve Hareket",
      videos: [
        {
          id: 2,
          title: "Fiziksel Nicelikler",
          description: "Fizikte kullanılan temel nicelikler ve birim sistemleri",
          duration: "8:19",
          unit: "Kuvvet ve Hareket",
          videoUrl: "https://ia601003.us.archive.org/29/items/2_20251009_20251009_1623/2.mp4"
        }
      ]
    },
    {
      id: 3,
      title: "Basınç",
      videos: [
        {
          id: 3,
          title: "Basınç",
          description: "Basınç kavramı ve temel basınç formülleri",
          duration: "8:36",
          unit: "Basınç",
          videoUrl: "https://ia601003.us.archive.org/32/items/3_20251009_202510/3.mp4"
        },
        {
          id: 4,
          title: "Sıvılarda Basınç",
          description: "Sıvıların basıncı ve Pascal prensibi",
          duration: "12:49",
          unit: "Basınç",
          videoUrl: "https://ia601008.us.archive.org/11/items/4_20251009_202510/4.mp4"
        },
        {
          id: 5,
          title: "Açık Hava Basıncı",
          description: "Atmosfer basıncı ve günlük hayattaki etkileri",
          duration: "5:48",
          unit: "Basınç",
          videoUrl: "https://ia600602.us.archive.org/25/items/5_20251009_202510/5.mp4"
        }
      ]
    },
    {
      id: 4,
      title: "Kaldırma Kuvveti",
      videos: [
        {
          id: 6,
          title: "Kaldırma Kuvveti",
          description: "Arşimet prensibi ve kaldırma kuvveti uygulamaları",
          duration: "7:24",
          unit: "Kaldırma Kuvveti",
          videoUrl: "https://ia801008.us.archive.org/33/items/6_20251009_20251009/6.mp4"
        }
      ]
    },
    {
      id: 5,
      title: "Akışkan Basıncı",
      videos: [
        {
          id: 7,
          title: "Bernoulli İlkesi",
          description: "Akışkanlar dinamiği ve Bernoulli ilkesi",
          duration: "6:41",
          unit: "Akışkan Basıncı",
          videoUrl: "https://ia601004.us.archive.org/3/items/7_20251009_202510/7.mp4"
        }
      ]
    },
    {
      id: 6,
      title: "Isı ve Sıcaklık",
      videos: [
        {
          id: 8,
          title: "Isı ve Sıcaklık Kavramları",
          description: "Isı ve sıcaklık kavramlarının temel farkları",
          duration: "11:07",
          unit: "Isı ve Sıcaklık",
          videoUrl: "https://ia801000.us.archive.org/9/items/8_20251009_20251009_1725/8.mp4"
        },
        {
          id: 9,
          title: "Hal Değişimi",
          description: "Maddenin halleri ve hal değişim süreçleri",
          duration: "11:27",
          unit: "Isı ve Sıcaklık",
          videoUrl: "https://ia801008.us.archive.org/19/items/9_20251009_202510/9.mp4"
        },
        {
          id: 10,
          title: "Isıl Denge",
          description: "Termal denge ve ısı transferi",
          duration: "13:50",
          unit: "Isı ve Sıcaklık",
          videoUrl: "https://ia902803.us.archive.org/26/items/10_20251009_20251009_1803/10.mp4"
        },
        {
          id: 11,
          title: "Isı Aktarım Yolları ve Isı İletim Hızı",
          description: "Isı transfer yöntemleri ve iletim hızı",
          duration: "10:04",
          unit: "Isı ve Sıcaklık",
          videoUrl: "https://ia601608.us.archive.org/11/items/11_20251009_202510/11.mp4"
        }
      ]
    }
  ]
};

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

