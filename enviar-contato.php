<?php
declare(strict_types=1);

$recipient = 'reserva@jerirota.com.br';
$siteEmail = 'reserva@jerirota.com.br';
$redirectPage = 'contato.html';
$anchor = '#contact-details-title';
$allowedRedirects = ['contato.html', 'contato-en.html', 'contato-es.html'];

function redirect_with_status(string $status): void
{
    global $redirectPage, $anchor;

    header('Location: ' . $redirectPage . '?envio=' . rawurlencode($status) . $anchor, true, 303);
    exit;
}

function clean_field($value): string
{
    if (!is_string($value)) {
        return '';
    }

    return trim(str_replace(["\r", "\n"], ' ', strip_tags($value)));
}

function clean_message($value): string
{
    if (!is_string($value)) {
        return '';
    }

    return trim(strip_tags($value));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_with_status('erro');
}

$requestedRedirect = $_POST['redirect'] ?? '';
if (is_string($requestedRedirect) && in_array($requestedRedirect, $allowedRedirects, true)) {
    $redirectPage = $requestedRedirect;
}

if (!empty($_POST['website'] ?? '')) {
    redirect_with_status('sucesso');
}

$name = clean_field($_POST['nome'] ?? '');
$email = clean_field($_POST['email'] ?? '');
$phone = clean_field($_POST['telefone'] ?? '');
$subject = clean_field($_POST['assunto'] ?? '');
$message = clean_message($_POST['mensagem'] ?? '');
$language = clean_field($_POST['idioma'] ?? 'pt-BR');

if ($name === '' || $subject === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect_with_status('erro');
}

$mailSubject = 'Contato pelo site Jeri Rota - ' . $subject;
$mailBody = implode("\n", [
    'Nova mensagem enviada pelo formulario do site Jeri Rota.',
    '',
    'Nome: ' . $name,
    'E-mail: ' . $email,
    'Telefone: ' . ($phone !== '' ? '+55 ' . $phone : 'Nao informado'),
    'Assunto: ' . $subject,
    'Idioma da pagina: ' . $language,
    '',
    'Mensagem:',
    $message !== '' ? $message : 'Nao informada',
    '',
    'Origem: formulario de contato do site',
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'Nao identificado'),
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Jeri Rota <' . $siteEmail . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($recipient, $mailSubject, $mailBody, implode("\r\n", $headers));

redirect_with_status($sent ? 'sucesso' : 'erro');
