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
</head>

<body>
    <div class="contact-form">
        <h2>Bizimle İletişime Geçin</h2>
        <?php if(isset($_GET['status'])): ?>
            <?php if($_GET['status'] == 'success'): ?>
                <p class="success">Mesajınız başarıyla gönderildi. Teşekkür ederiz!</p>
            <?php else: ?>
                <p class="error">Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.</p>
            <?php endif; ?>
        <?php endif; ?>
        <form action="sendmail.php" method="POST">
            <div class="form-group">
                <label for="name">Adınız Soyadınız:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">E-posta Adresiniz:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="subject">Konu:</label>
                <input type="text" id="subject" name="subject" required>
            </div>
            <div class="form-group">
                <label for="message">Mesajınız:</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <div class="form-group">
                <button type="submit">Gönder</button>
            </div>
        </form>
    </div>
</body>
</html>


<?php
// Hata raporlamayı aç
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Form verilerini al
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
// Basit validasyon
$errors = [];
if (empty($name)) {
    $errors[] = 'Ad soyad alanı boş bırakılamaz.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Geçerli bir e-posta adresi giriniz.';
}
if (empty($subject)) {
    $errors[] = 'Konu alanı boş bırakılamaz.';
}
if (empty($message)) {
    $errors[] = 'Mesaj alanı boş bırakılamaz.';
}
// Eğer hata varsa kullanıcıyı forma geri yönlendir
if (!empty($errors)) {
    $errorQuery = http_build_query(['errors' => $errors]);
    header("Location: contact.html?status=error&$errorQuery");
    exit;
}
// E-posta ayarları
$to = 'info@siteniz.com'; // Buraya mailin gönderileceği adresi yazın
$email_subject = "İletişim Formu: $subject";
$email_body = "Web sitenizden yeni bir iletişim formu gönderildi.\n\n".
              "Detaylar:\n\nAd Soyad: $name\n\n".
              "Email: $email\n\nKonu: $subject\n\nMesaj:\n$message";
$headers = "From: $email\n";
$headers .= "Reply-To: $email\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\n";
// Mail gönderme işlemi
$mailSent = mail($to, $email_subject, $email_body, $headers);
// Sonucu kullanıcıya bildir
if ($mailSent) {
    header('Location: contact.html?status=success');
} else {
    header('Location: contact.html?status=error');
}
exit;
?>