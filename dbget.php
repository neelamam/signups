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

    $sql = "SELECT * FROM members";
    $results = $db->query($sql);
    
    $output = [];
    
    $i = 0;
    while ($row = $results->fetch_row()){
        $output[$i] = $row;
        $i++;
    }
    
    echo json_encode($output);
    $db->close();

?>