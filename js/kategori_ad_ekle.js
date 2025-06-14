$(document).ready(function() {
  // Görsellerin bulunduğu klasör
  const basePath = 'images/products/';
  
  // Bu diziyi gerçek görsellerinizle doldurmanız gerekecek
  const productImages = [
    'HST_I_Otomotiv/some_image1.jpg',
    'HST_II_Endustri/some_image2.jpg',
    'HST_III_Tarim/some_image3.jpg'
    // Diğer görseller...
  ];

  const shuffleContainer = $('.shuffle-wrapper'); // Shuffle container'ını seçin

  productImages.forEach(imagePath => {
    const fullPath = basePath + imagePath;
    const pathParts = imagePath.split('/');
    const category = pathParts[0]; // HST_I_Otomotiv gibi
    const imageName = pathParts[1]; // some_image1.jpg gibi
    const productCode = '23047199'; // Burada ürün kodunu nasıl alacağınıza bağlı
    
    // HTML yapısını oluştur
    const itemHtml = `
    <div class="col-lg-4 col-sm-6 col-md-6 shuffle-item">
      <div class="department-img-container">
        <img class="img-fluid" src="${fullPath}" alt="service-img">
        <span class="gallery-icon"></span>
        <div class="service-item-info">
          <div class="department-item-info-content">
            <h3 class="department-item-title">
              <a href="#">${category.replace(/_/g, ' ')}</a>
            </h3>
            <p class="department-category">${productCode}</p>
          </div>
        </div>
      </div>
    </div>`;
    
    // Oluşturulan HTML'i container'a ekle
    shuffleContainer.append(itemHtml);
  });
});