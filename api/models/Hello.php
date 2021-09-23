<?php
class Hello
{
    static function welcome()
    {
        echo json_encode([
            "next" => false
        ]);
    }
}
