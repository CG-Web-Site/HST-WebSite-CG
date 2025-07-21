<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Spam koruması: 60 saniyede birden fazla gönderim engellenir
if (isset($_SESSION['last_submit_time'])) {
    $elapsed = time() - $_SESSION['last_submit_time'];
    if ($elapsed < 60) {
        echo 'Lütfen bir dakika bekleyip tekrar deneyin.';
        exit;
    }
}
$_SESSION['last_submit_time'] = time();

// Form doğrulama
if (
    empty($_POST['fullname']) ||
    empty($_POST['email']) ||
    empty($_POST['phone']) ||
    empty($_POST['message'])
) {
    echo 'Lütfen tüm zorunlu alanları doldurunuz.';
    exit;
}

// Form verilerini al ve doğrula
$fullname = trim($_POST['fullname']);
$email    = trim($_POST['email']);
$rawPhone = preg_replace('/\D/', '', $_POST['phone']);
$message  = trim($_POST['message']);
$phone    = '0' . $rawPhone;

// Telefon kontrolü: 10 rakam olmalı (0 hariç)
if (!preg_match('/^\d{10}$/', $rawPhone)) {
    echo 'Telefon numarası baştaki "0" hariç 10 rakam olmalıdır.';
    exit;
}

$mail = new PHPMailer(true);

try {
    // Mail sunucu ayarları
    $mail->isSMTP();
    $mail->Host = 'mail.hstototiv.com.tr';
    $mail->SMTPAuth = true;
    $mail->Username = 'bilgi@hstotomotiv.com.tr';
    $mail->Password = 'KcOsFucI'; // Güvenli saklayın!
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ];

    // Gönderen ve alıcı
    $mail->setFrom('bilgi@hstotomotiv.com.tr', 'İletişim Formu');
    $mail->addAddress('info@hstotomotiv.com.tr', 'HST Otomotiv');

    // Dosya ekle
    if (isset($_FILES['fileUpload']) && $_FILES['fileUpload']['error'] == 0) {
        $mail->addAttachment($_FILES['fileUpload']['tmp_name'], $_FILES['fileUpload']['name']);
    }

    // İçerik
    $mail->isHTML(true);
    $mail->Subject = 'Yeni Form Mesajı';
    $mail->Body    = "
        <h2>Yeni İletişim Formu</h2>
        <p><b>Ad Soyad:</b> {$fullname}</p>
        <p><b>Email:</b> {$email}</p>
        <p><b>Telefon:</b> {$phone}</p>
        <p><b>Mesaj:</b> " . nl2br(htmlspecialchars($message)) . "</p>
    ";

    $mail->send();
    echo 'Mesaj gönderildi.';
} catch (Exception $e) {
    echo "Gönderme hatası: {$mail->ErrorInfo}";
}
