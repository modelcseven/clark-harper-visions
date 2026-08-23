<?php
/**
 * Contact form handler for chvdesigns.com.
 * Requires PHP mail() support (standard on cPanel shared hosting).
 * Does nothing on static hosts (GitHub Pages, Netlify without functions, etc.) —
 * only works once this file is uploaded to a PHP-enabled server.
 */

declare(strict_types=1);

const RECIPIENT_EMAIL = "info@chvisions.com";
// From address should match the hosting domain so the mail server's own
// SPF/DKIM records cover it, instead of spoofing the visitor's address.
const FROM_EMAIL = "no-reply@chvdesigns.com";

header("Content-Type: application/json");

function respond(int $status, array $body) {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond(405, ["success" => false, "error" => "Method not allowed."]);
}

// Strip header-injection characters (newlines) from any value that ends up
// in a mail header (name, email, phone).
function clean_header_value(string $value): string {
    return trim(str_replace(["\r", "\n"], "", $value));
}

$name = clean_header_value($_POST["name"] ?? "");
$email = clean_header_value($_POST["email"] ?? "");
$phone = clean_header_value($_POST["phone"] ?? "");
$message = trim($_POST["message"] ?? "");
$honeypot = trim($_POST["company"] ?? "");

// Bots that fill the hidden honeypot field get a fake success so they don't
// learn to avoid it — no mail is actually sent.
if ($honeypot !== "") {
    respond(200, ["success" => true]);
}

if ($name === "" || $message === "") {
    respond(422, ["success" => false, "error" => "Please fill in your name and a short message."]);
}

if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ["success" => false, "error" => "Please enter a valid email address."]);
}

$subject = "New website inquiry from " . $name;

$body = "New contact form submission from chvdesigns.com\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Phone: " . ($phone !== "" ? $phone : "(not provided)") . "\n\n";
$body .= "Message:\n{$message}\n";

$headers = [
    "From: Clark & Harper Visions <" . FROM_EMAIL . ">",
    "Reply-To: {$name} <{$email}>",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
];

$sent = mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(500, ["success" => false, "error" => "We couldn't send your message. Please email us directly."]);
}

respond(200, ["success" => true]);
