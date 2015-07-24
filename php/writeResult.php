<?php

if(!empty($_POST)){
    $title = isset($_POST["title"])? $_POST["title"] : "Title undefined";
    $player_points = isset($_POST["player_points"])? $_POST["player_points"] : "Points undefined";
    $dealer_points = isset($_POST["dealer_points"])? $_POST["dealer_points"] : "Points undefined";

    $file = 'log.txt';
    $txt = $title." Player: ".$player_points." Dealer: ".$dealer_points."\r\n";
    file_put_contents($file, $txt, FILE_APPEND | LOCK_EX);
}