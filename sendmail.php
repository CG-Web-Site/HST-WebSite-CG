<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Form verilerini al
$fullname = $_POST['fullname'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';
$file = $_FILES['fileUpload'] ?? null;

// Mail ayarları
$mail = new PHPMailer(true);

try {
    // SMTP ayarları (gerekirse düzenleyin)
    $mail->isSMTP();
    $mail->Host       = 'mail.hstototiv.com.tr'; // SMTP sunucusu
    $mail->SMTPAuth   = true;
    $mail->Username   = 'bilgi@hstotomotiv.com.tr';          // SMTP kullanıcı adı
    $mail->Password   = 'yourKcOsFucIpassword';            // SMTP şifresi
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Gönderen ve alıcı
    $mail->setFrom('bilgi@hstotomotiv.com.tr', 'Web Form');
    $mail->addAddress('info@hstotomotiv.com.tr'); // Mailin gideceği adres

    // Dosya ekle
    if ($file && $file['error'] === UPLOAD_ERR_OK) {
        $mail->addAttachment($file['tmp_name'], $file['name']);
    }

    // İçerik
    $mail->isHTML(true);
    $mail->Subject = 'Yeni Form Mesajı';
    $mail->Body    = "
        <h3>Yeni Mesaj</h3>
        <p><strong>Ad Soyad:</strong> {$fullname}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Telefon:</strong> {$phone}</p>
        <p><strong>Mesaj:</strong><br>{$message}</p>
    ";

    $mail->send();

    // Başarılı ise teşekkür sayfasına yönlendir
    header("Location: thank-you.html");
    exit();
} catch (Exception $e) {
    echo "Mesaj gönderilemedi. Hata: {$mail->ErrorInfo}";
}
?>
