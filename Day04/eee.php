<?php
    header('Content-Type:text/html; charset=utf-8');

    //예약정보 데이터 받기
    $name= $_POST['name'];
    $phone= $_POST['phone'];
    $email= $_POST['email'];

    

    //예약정보 데이터도 잘 받았는지 확인
    echo "$name <br>";
    echo "$phone <br>";
    echo "$email <br>";
    echo "--------<br>";
    
    $now= date('Y-m-d H:i:s'); //게시글이 저장되는 날짜와 시간..

    //CREATE TABLE reserve ( no INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, phone VARCHAR(20) NOT NULL, email VARCHAR(100) NOT NULL, date DATETIME );

    //1.MySQL에 접속
    $db= mysqli_connect('localhost','freestyle2026','a1s2d3f4!','freestyle2026'); //DB서버URL, DB접속 아이디, DB접속 비번, DB명
    
    //2. 한글이 깨짐 방지
    mysqli_query($db,'set names utf8');

    //3. 데이터 삽입을 요청하는 쿼리문 작성 및 요청
    $sql="INSERT INTO reserve(name,phone,email,date) values('$name','$phone','$email','$now')";
    $result= mysqli_query($db,$sql); //쿼리문이 성공하면 true, 실패하면 false를 리턴
    if($result) {
        echo "예약하기가 완료되었습니다.";
    }else{
        echo "예약하기에 실패했습니다. 다시 시도해 주세요.<br>";
    }

    //4. 연결종료
    mysqli_close($db);

?>