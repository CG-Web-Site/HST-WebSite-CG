 const video = document.getElementById('myVideo');
  
  // Videonun uzunluğunu almak
  const videoDuration = video.duration;

  // Videoyu rastgele bir zamanda başlatmak
  function playRandomTime() {
    const randomTime = Math.floor(Math.random() * videoDuration); // Rastgele saniye
    video.currentTime = randomTime; // Videoyu bu saniyeye getir
    video.play(); // Videoyu oynat
  }

  // Sayfa yüklendiğinde rastgele zamanla başlat
  window.onload = function() {
    playRandomTime();
  };