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

function loadFeaturedVideos() {
    const container = document.getElementById('featured-videos-container');
    if (!container) return;

    const featuredVideos = videoData.units.flatMap(unit => unit.videos).slice(0, 6);

    container.innerHTML = featuredVideos.map(video => `
        <div class="video-card" onclick="openVideo(${video.id})" data-aos="fade-up">
            <div class="video-thumbnail">${video.title.charAt(0)}</div>
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
                        <div class="video-item-info">
                            <div class="video-item-title">${video.title}</div>
                            <div class="video-item-duration">⏱️ ${video.duration}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function openVideo(videoId) {
    const video = videoData.units.flatMap(u => u.videos).find(v => v.id === videoId);
    if (!video) return alert('Video bulunamadı.');

    const videoSection = document.getElementById('video-player-section');
    if (!videoSection) {
        createVideoPlayerSection(video);
    } else {
        updateVideoPlayer(video);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function createVideoPlayerSection(video) {
    const container = document.createElement('section');
    container.id = 'video-player-section';
    container.innerHTML = `
        <div class="container" data-aos="fade-down">
            <button id="close-video-btn">✖ Kapat</button>
            <h2>${video.title}</h2>
            <video id="video-player" controls preload="metadata" width="100%" height="auto">
                <source src="${video.videoUrl}" type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
            </video>
            <p>${video.description}</p>
        </div>
    `;
    document.body.insertBefore(container, document.body.firstChild);
    document.getElementById('close-video-btn').addEventListener('click', closeVideoPlayer);
}

function updateVideoPlayer(video) {
    const videoPlayer = document.getElementById('video-player');
    const videoTitle = document.querySelector('#video-player-section h2');
    const videoDesc = document.querySelector('#video-player-section p');
    if (videoPlayer && videoTitle && videoDesc) {
        videoPlayer.pause();
        videoPlayer.src = video.videoUrl;
        videoPlayer.load();
        videoTitle.textContent = video.title;
        videoDesc.textContent = video.description;
    }
}

function closeVideoPlayer() {
    const videoSection = document.getElementById('video-player-section');
    if (videoSection) {
        videoSection.remove();
    }
}

if (document.readyState !== 'loading') {
    loadFeaturedVideos();
} else {
    document.addEventListener('DOMContentLoaded', loadFeaturedVideos);
}
