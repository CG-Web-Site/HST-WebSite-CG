const phoneInput = document.getElementById('floatingnumber');

phoneInput.addEventListener('input', function () {
  let val = this.value;

  // Sadece rakamları al
  val = val.replace(/\D/g, '');

  // Eğer başında 0 yoksa ekle
  if (!val.startsWith('0')) {
    val = '0' + val;
  }

  // Sadece 11 haneye izin ver
  val = val.slice(0, 11);

  this.value = val;
});

document.getElementById('quote_form').addEventListener('submit', function (e) {
  e.preventDefault();

  const fullname = this.fullname.value.trim();
  const email = this.email.value.trim();
  const phone = this.phone.value.trim();
  const fileUpload = this.fileUpload.files[0];
  const message = this.message.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
  const phoneRegex = /^0\d{10}$/; // Başında 0 ve toplam 11 hane

  if (!fullname) {
    alert('Adınız - Soyadınız boş bırakılamaz.');
    return;
  }

  if (!email || !emailRegex.test(email)) {
    alert('Geçerli bir E-Posta adresi giriniz.');
    return;
  }

  if (!phone || !phoneRegex.test(phone)) {
    alert('Telefon numaranız 11 haneli olmalıdır.');
    return;
  }

  if (fileUpload) {
    const fileExt = fileUpload.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      alert(
        'Geçersiz dosya uzantısı. Sadece pdf, doc, docx, jpg, jpeg, png kabul edilir.'
      );
      return;
    }
  }

  if (!message) {
    alert('Mesaj alanı boş bırakılamaz.');
    return;
  }

  // Başarılıysa yönlendirme
  window.location.href = 'index.html';
});
