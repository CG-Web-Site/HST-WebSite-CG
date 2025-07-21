const phoneInput = document.getElementById('floatingnumber');

phoneInput.addEventListener('input', function () {
  let val = this.value;

  // Only keep digits
  val = val.replace(/\D/g, '');

  // Add leading 0 if missing
  if (!val.startsWith('0')) {
    val = '0' + val;
  }

  // Limit to 11 digits
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
  const phoneRegex = /^0\d{10}$/; // Starts with 0 and total 11 digits

  if (!fullname) {
    alert('Full name cannot be empty.');
    return;
  }

  if (!email || !emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!phone || !phoneRegex.test(phone)) {
    alert('Phone number must be 11 digits.');
    return;
  }

  if (fileUpload) {
    const fileExt = fileUpload.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      alert(
        'Invalid file extension. Only pdf, doc, docx, jpg, jpeg, and png are allowed.'
      );
      return;
    }
  }

  if (!message) {
    alert('Message field cannot be empty.');
    return;
  }

  // If all validations pass, redirect to success page
  // window.location.href = 'index-en.html';
});
