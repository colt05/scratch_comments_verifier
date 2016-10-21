<?php

require('../vendor/autoload.php');

$app = new Silex\Application();

$app->get('/', function() use($app) {
return "9 + 10"; 
});

$app->run();
