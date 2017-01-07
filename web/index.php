<?php

require('../vendor/autoload.php');

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

$app->get('/', function() use($app) {
    return "9 + 10"; 
});

$app->post('/test', function (Request $request) {
    $message = $request->get('test');
    return $message;
});

$app->post('/userCode', function (Request $request) {
    //$dataa = json_decode($request->getContent(), true);
    $dataa['user'] = $request->get('user');
    $dataa['comment'] = $request->get('comment');
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
        $userIndexOfWeirdString = strpos($user, '" id="comment-user" data-comment-user="'); //Offset
        $user2222 = substr($user, $userIndexOfWeirdString);
        $user3333 = substr($user, strlen('" id="comment-user" data-comment-user="'));
        $user4444 = substr($user3333, strlen('user="'));
        $user = $user4444;
        echo $user;
        echo "=======";
        echo $comment;
        echo "===-===";
        //echo $dataa['comment'];
        if ($user == $dataa['username'] && $comment == $dataa['comment']) {
            $success = true;
            return '{"success":"yes","code":"","error":""}';
            break;
        }
    }
    //MODSHARE CODE END
    if (!$success) {
        return '{"success":"no","code":"","error":"user"}';
    }
    
});

$app->run();
