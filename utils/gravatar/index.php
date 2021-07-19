<?php
Header('Content-Type: image/png');
$email = $_GET['email'] ?? 'br.rafael@outlook.com';
$email = trim( $email ); 
$email = strtolower( $email );
$email = md5( $email );
$img = "https://www.gravatar.com/avatar/{$email}";
echo file_get_contents($img);