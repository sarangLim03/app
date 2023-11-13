<?php
session_start();


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 여기에서 데이터베이스에서 사용자 정보를 확인하세요.
    if ($username == "test" && $password == "1234") {
        // 로그인 성공
        $_SESSION["username"] = $username;
        header("Location: /calendar/calendar.html"); // 다음 화면으로 이동
        exit();
    } else {
        // 로그인 실패
        echo "<script>alert('입력 정보 불일치'); window.location.href='login.html';</script>";
        exit();
    }
}
?>
