<?php
// proxy.php - Versão melhorada com logs e suporte a múltiplos métodos
error_reporting(E_ALL);
ini_set('display_errors', 0);

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configurações Fluig
$config = [
    'consumer_key' => 'API_Key',
    'consumer_secret' => 'api_secret',
    'token_access' => '757990a6-0191-417d-b4e4-1d0e348a34b1',
    'token_secret' => 'cbf09865-6f9d-48f5-af0c-1b9d7d8416831ec842a4-a1e3-4453-afcd-efab44db1532',
    'base_url' => 'https://federacaonacional201538.fluig.cloudtotvs.com.br'
];

// Captura dados
$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, true);

// Endpoint e método vindos da requisição
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '/ecm-forms/api/v2/cardindex/210890/cards';
$method = isset($_GET['method']) ? strtoupper($_GET['method']) : $_SERVER['REQUEST_METHOD'];

$targetUrl = $config['base_url'] . $endpoint;

// Log para debug (REMOVA EM PRODUÇÃO)
$logFile = __DIR__ . '/proxy_log.txt';
$logData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'method' => $method,
    'endpoint' => $endpoint,
    'target_url' => $targetUrl,
    'body' => $body
];
file_put_contents($logFile, print_r($logData, true) . "\n\n", FILE_APPEND);

// Função OAuth 1.0a
function buildOAuthHeader($url, $method, $config)
{
    $timestamp = time();
    $nonce = md5(uniqid(rand(), true));

    $oauthParams = [
        'oauth_consumer_key' => $config['consumer_key'],
        'oauth_nonce' => $nonce,
        'oauth_signature_method' => 'HMAC-SHA1',
        'oauth_timestamp' => $timestamp,
        'oauth_token' => $config['token_access'],
        'oauth_version' => '1.0'
    ];

    ksort($oauthParams);

    $paramString = [];
    foreach ($oauthParams as $key => $value) {
        $paramString[] = $key . '=' . rawurlencode($value);
    }
    $paramString = implode('&', $paramString);

    $baseString = strtoupper($method) . '&'
        . rawurlencode($url) . '&'
        . rawurlencode($paramString);

    $signingKey = rawurlencode($config['consumer_secret']) . '&' . rawurlencode($config['token_secret']);
    $signature = base64_encode(hash_hmac('sha1', $baseString, $signingKey, true));

    $oauthParams['oauth_signature'] = $signature;

    $headerParts = [];
    foreach ($oauthParams as $key => $value) {
        $headerParts[] = $key . '="' . rawurlencode($value) . '"';
    }

    return 'OAuth ' . implode(', ', $headerParts);
}

try {
    $ch = curl_init();
    $authHeader = buildOAuthHeader($targetUrl, $method, $config);

    curl_setopt($ch, CURLOPT_URL, $targetUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

    // Adiciona body para POST/PUT
    if (in_array($method, ['POST', 'PUT', 'PATCH']) && !empty($inputJSON)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $inputJSON);
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: ' . $authHeader
    ]);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_VERBOSE, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);

    // Log da resposta
    file_put_contents($logFile, "Response Code: $httpCode\n", FILE_APPEND);
    file_put_contents($logFile, "Response: $response\n", FILE_APPEND);
    file_put_contents($logFile, "cURL Error: $curlError\n\n", FILE_APPEND);

    curl_close($ch);

    if ($curlError) {
        throw new Exception("Erro cURL: $curlError");
    }

    http_response_code($httpCode);
    echo $response;

} catch (Exception $e) {
    http_response_code(500);
    $errorResponse = [
        'error' => 'Erro no proxy',
        'message' => $e->getMessage()
    ];
    file_put_contents($logFile, "Exception: " . print_r($errorResponse, true) . "\n\n", FILE_APPEND);
    echo json_encode($errorResponse);
}
?>