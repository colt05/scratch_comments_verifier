<?php

require('../vendor/autoload.php');

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();


$app->get('/', function() use($app) {
return "9 + 10"; 
});

$app->post('/test', function (Request $request) {
    $message = $request->get('test');
    return test;
});

$app->run();
