<?php
require 'vendor/autoload.php';

use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

// Zorunlu alan kontrolü
if (
    empty($_POST['fullname']) ||
    empty($_POST['email']) ||
    empty($_POST['phone']) ||
    empty($_POST['message'])
) {
    echo 'Lütfen tüm zorunlu alanları doldurunuz.';
    exit;
}

// Form verilerini al
$fullname = htmlspecialchars($_POST['fullname']);
$email    = htmlspecialchars($_POST['email']);
$phone    = htmlspecialchars($_POST['phone']);
$message  = htmlspecialchars($_POST['message']);

// TLS bağlantısı için manuel transport
$transport = new EsmtpTransport('mail.hstotomotiv.com.tr', 587);
// $transport = new EsmtpTransport('smtp.gmail.com', 587);

$transport->setUsername('bilgi@hstotomotiv.com.tr');
// $transport->setUsername('hstotomotivas@gmail.com');

$transport->setPassword('KcOsFucI');
// $transport->setPassword('A291453.261071b');

// ⚠ Sertifika doğrulamasını devre dışı bırakıyoruz (geçici çözüm!)
$stream = $transport->getStream();
$streamOptions = [
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    ]
];
$stream->setStreamOptions($streamOptions);

$mailer = new Mailer($transport);

// E-posta oluştur
$emailMessage = (new Email())
    ->from('bilgi@hstotomotiv.com.tr')
    // ->from('hstotomotivas@gmail.com')
    ->to('info@hstotomotiv.com.tr')
    ->subject('Yeni Form Mesajı')
    ->html("
        <h2>Yeni İletişim Formu</h2>
        <p><strong>Ad Soyad:</strong> {$fullname}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Telefon:</strong> {$phone}</p>
        <p><strong>Mesaj:</strong><br>{$message}</p>
    ")
    ->text("Yeni form mesajı: \nAd: $fullname\nEmail: $email\nTelefon: $phone\nMesaj: $message");

// Dosya eklenmişse iliştir
if (isset($_FILES['fileUpload']) && $_FILES['fileUpload']['error'] === 0) {
    $emailMessage->attachFromPath($_FILES['fileUpload']['tmp_name'], $_FILES['fileUpload']['name']);
}

// Gönderim
try {
    $mailer->send($emailMessage);
    echo 'Mesaj gönderildi.';
} catch (TransportExceptionInterface $e) {
    echo 'Gönderme hatası: ' . $e->getMessage();
}
