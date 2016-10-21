<?php

require('../vendor/autoload.php');

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;

$app->get('/', function() use($app) {
return "9 + 10"; 
});

$app->post('/test', function (Request $request) {
    $message = $request->get('test');
    return test;
});

$app->post('/userCode', function (Request $request) {
    $data = json_decode($request->getContent(), true);
    //MODSHARE CODE BEGIN
    $api_url = 'http://scratch.mit.edu/site-api/comments/project/' . '126929077/' . '?page=1&salt=' . md5(time());
    $data = file_get_contents($api_url);
        if (!$data) {
        return '{"success":"no","code":"","error":"api"}';
    }
    $success = false;
    preg_match_all('%<div id="comments-\d+" class="comment.*?" data-comment-id="\d+">.*?<a href="/users/(.*?)">.*?<div class="content">(.*?)</div>%ms', $data, $matches);
    foreach ($matches[2] as $key => $val) {
        $user = $matches[1][$key];
        $comment = trim($val);
        if ($user == $data['username'] && $comment == $data['comment']) {
            $success = true;
            return '{"success":"yes","code":"","error":""}';
            break;
        }
    }
    //MODSHARE CODE END
    if (!$success) {
        echo '{"success":"no","code":"","error":"user"}';
    }
    
});

$app->run();
