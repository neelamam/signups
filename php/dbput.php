<?php

    $servername = getenv('IP');
    $username = getenv('C9_USER');
    $password = "";
    $database = "c9";
    $dbport = 3306;
    
    // Create connection
    $db = new mysqli($servername, $username, $password, $database, $dbport);

    // Check connection
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    } 

    $name = mysqli_real_escape_string($db, $_GET["name"]);
    $email = mysqli_real_escape_string($db, $_GET["email"]);
    $city = mysqli_real_escape_string($db, $_GET["city"]);
    //$anon = mysqli_real_escape_string($db, $_GET["anon"]);
    $anon;
    if ($_GET["anon"] == "false"){
        $anon = "0";
    }else{
        $anon = "1";
    }

    $sql = "INSERT INTO  `members`(`name`, `email`, `city`, `anonymous`) VALUES ( \"$name\",  \"$email\", \"$city\",  \"$anon\" )";
    $result = $db->query($sql);
    
    echo $result;
    $db->close();

?>