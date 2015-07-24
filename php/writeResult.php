<?php

if(!empty($_POST)){
    //data filtering

    if(isset($_POST["title"])){
        $title = strip_tags($_POST["title"]);
        $title = htmlspecialchars($title);
        $title = mysql_escape_string($title);
    }

    if($_POST["player_points"]){
        $player_points = intval($_POST["player_points"]);
        $player_points = ($player_points)? $player_points : "Points undefined!";
    }

    if($_POST["dealer_points"]){
        $dealer_points = intval($_POST["dealer_points"]);
        $dealer_points = ($dealer_points)? $dealer_points : "Points undefined!";
    }

    $file = 'log.txt';
    $txt = $title." Player: ".$player_points." Dealer: ".$dealer_points."\r\n";
    file_put_contents($file, $txt, FILE_APPEND | LOCK_EX);
}