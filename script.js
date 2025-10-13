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

function loadFeaturedVideos() {
  const container = document.getElementById("featured-videos-container");
  container.innerHTML = "";
  featuredVideos.forEach(video => {
    const videoCard = document.createElement("div");
    videoCard.className = "video-card";
    videoCard.innerHTML = `
      <div class="video-thumbnail" style="background-image: url('${video.thumbnail}');"></div>
      <div class="video-card-content">
        <h3 class="video-card-title">${video.title}</h3>
        <p class="video-card-desc">${video.description}</p>
        <div class="video-card-meta">
          <span>⏱️ ${video.duration}</span>
          <span>👁️ ${video.views}</span>
          <span>📅 ${video.uploadDate}</span>
        </div>
      </div>
    `;
    container.appendChild(videoCard);
  });
}
