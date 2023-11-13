<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];

    $foundUsername = "user123"; // 실제로는 데이터베이스에서 얻은 값으로 변경

    if ($foundUsername) {
        echo "<p>회원님의 아이디는: $foundUsername 입니다.</p>";
    } else {
        echo "<p>일치하는 정보가 없습니다.</p>";
    }
}
?>
