<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

if (
    empty($_POST['fullname']) ||
    empty($_POST['email']) ||
    empty($_POST['phone']) ||
    empty($_POST['message'])
) {
    echo 'Lütfen tüm zorunlu alanları doldurunuz.';
    exit;
}

$mail = new PHPMailer(true);

try {
    // Sunucu ayarları
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'dersimizyazilimmail@gmail.com'; // Gmail adresin
    $mail->Password = 'iche nrep avnp ldnf'; // Google'dan aldığın uygulama şifresi
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
    $mail->setFrom('dersimizyazilimmail@gmail.com', 'Web Formu');
    $mail->addAddress("{$_POST['email']}", 'Alıcı Adı'); // Alıcı adresi

    // Dosya ekle
    if (isset($_FILES['fileUpload']) && $_FILES['fileUpload']['error'] == 0) {
        $mail->addAttachment($_FILES['fileUpload']['tmp_name'], $_FILES['fileUpload']['name']);
    }

    // İçerik
    $mail->isHTML(true);
    $mail->Subject = 'Yeni Form Mesaji';
    $mail->Body    = "
        <h2>Yeni Iletisim Formu</h2>
        <p><b>Ad Soyad:</b> {$_POST['fullname']}</p>
        <p><b>Email:</b> {$_POST['email']}</p>
        <p><b>Telefon:</b> {$_POST['phone']}</p>
        <p><b>Mesaj:</b> {$_POST['message']}</p>
    ";

    $mail->send();
    echo 'Mesaj gönderildi.';
} catch (Exception $e) {
    echo "Gönderme hatası: {$mail->ErrorInfo}";
}
