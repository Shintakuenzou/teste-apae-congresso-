<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$config = [
    'consumer_key' => 'API_Key',
    'consumer_secret' => 'api_secret',
    'token_access' => '757990a6-0191-417d-b4e4-1d0e348a34b1',
    'token_secret' => 'cbf09865-6f9d-48f5-af0c-1b9d7d8416831ec842a4-a1e3-4453-afcd-efab44db1532',
    'base_url' => 'https://federacaonacional201538.fluig.cloudtotvs.com.br'
];

// 1. Captura de inputs
$inputJSON = file_get_contents('php://input');
$method = isset($_GET['method']) ? strtoupper($_GET['method']) : $_SERVER['REQUEST_METHOD'];

// 2. Lógica de Endpoint
// Se o seu JS enviar ?endpoint=..., usamos ele. Caso contrário, assume o Search do Dataset v2.
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '/dataset/api/v2/dataset-handle/search';

// 3. Organização de Parâmetros para a Assinatura
$queryParams = $_GET;
unset($queryParams['endpoint']); // Removemos os controles do proxy
unset($queryParams['method']);

// Monta a URL final para o Fluig
$targetUrl = $config['base_url'] . $endpoint;
if (!empty($queryParams)) {
    $targetUrl .= '?' . http_build_query($queryParams);
}

// Função OAuth 1.0a Unificada
function buildOAuthHeader($baseUrl, $method, $allParams, $config)
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

    // Mescla parâmetros da URL com OAuth para a base da assinatura
    $baseParams = array_merge($oauthParams, $allParams);
    uksort($baseParams, 'strcmp');

    $paramString = [];
    foreach ($baseParams as $key => $value) {
        if (is_array($value)) {
            sort($value);
            foreach ($value as $v) {
                $paramString[] = rawurlencode($key) . '=' . rawurlencode($v);
            }
        } else {
            $paramString[] = rawurlencode($key) . '=' . rawurlencode($value);
        }
    }

    $baseString = strtoupper($method) . '&' . rawurlencode($baseUrl) . '&' . rawurlencode(implode('&', $paramString));
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

    // Importante: A assinatura usa a URL sem a query string, os params entram no corpo da assinatura
    $authHeader = buildOAuthHeader($config['base_url'] . $endpoint, $method, $queryParams, $config);

    curl_setopt($ch, CURLOPT_URL, $targetUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

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

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError)
        throw new Exception("Erro cURL: $curlError");

    http_response_code($httpCode);
    echo $response;

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro no proxy', 'message' => $e->getMessage()]);
}