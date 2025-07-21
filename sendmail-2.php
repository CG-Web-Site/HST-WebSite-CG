<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İletişim Formu</title>
    <style>
        .contact-form { max-width: 500px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input, textarea { width: 100%; padding: 8px; }
        textarea { height: 150px; }
        button { background: #4CAF50; color: white; padding: 10px 15px; border: none; cursor: pointer; }
        .error { color: red; }
        .success { color: green; }
    </style>
    <link rel="stylesheet" href="css/searchresult.css">
</head>

<body>
    <div class="contact-form">
        <h2>Bizimle İletişime Geçin</h2>
        <?php if (isset($_GET['status'])): ?>
            <?php if ($_GET['status'] == 'success'): ?>
                <p class="success">Mesajınız başarıyla gönderildi. Teşekkür ederiz!</p>
            <?php else: ?>
                <p class="error">Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.</p>
            <?php endif; ?>
        <?php endif; ?>
        <form action="send.php" method="POST" enctype="multipart/form-data" onsubmit="return validatePhone();">
            <div class="form-group">
                <label for="fullname">Adınız Soyadınız:</label>
                <input type="text" id="fullname" name="fullname" required>
            </div>
            <div class="form-group">
                <label for="email">E-posta Adresiniz:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">Telefon Numaranız:</label>
                <div style="display:flex; align-items:center;">
                    <span style="padding: 8px; background: #eee; border: 1px solid #ccc;">0</span>
                    <input type="text" id="phone" name="phone" maxlength="10" pattern="\d{10}" required style="flex:1;">
                </div>
                <small>Telefon numaranız 0 hariç 10 hane olmalıdır.</small>
            </div>
            <div class="form-group">
                <label for="message">Mesajınız:</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <div class="form-group">
                <label for="fileUpload">Dosya Ekle (isteğe bağlı):</label>
                <input type="file" id="fileUpload" name="fileUpload">
            </div>
            <div class="form-group">
                <button type="submit">Gönder</button>
            </div>
        </form>
    </div>

    <script>
        function validatePhone() {
            const phone = document.getElementById('phone').value;
            if (!/^\d{10}$/.test(phone)) {
                alert('Telefon numarası 0 hariç 10 hane olmalıdır.');
                return false;
            }
            return true;
        }
    </script>
</body>
</html>
