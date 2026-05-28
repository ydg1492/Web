<?php
    header('Content-Type:text/html; charset=utf-8');
    // reserve 테이블에 저장되어 있는 모든 게시글 데이터들 읽어와서 응답response 해주기.

    //1. 접속
     $db= mysqli_connect('localhost','freestyle2026','a1s2d3f4!','freestyle2026');

    //2. 한글 깨짐 방지 요청
    mysqli_query($db, "set names utf8");

    //3. reserve 테이블의 모든 게시글 데이터들을 가져오는 쿼리문 작성 및 요청
    $sql="SELECT * FROM reserve";
    $result_table= mysqli_query($db, $sql);//select의 조건에 따른 결과표를 리턴해줌
    //혹시 쿼리문이 잘못 되었다면.. 결과표($result_table)가 얻어지지 않음.
    if($result_table){
        // 결과표에서 데이터를 읽어는 작업은 무조건 한줄(row)씩 읽어짐.

        // 결과표에 있는 총 레코드(row:한줄)의 개수 확인
        $row_num= mysqli_num_rows($result_table);

        // 반복문을 통해.. 총 레코드의 수 만큼 한줄씩 데이터를 읽어와서 사용자에게 보여주기(응답. echo)
        for($i=0; $i<$row_num; $i+=1){
            $row= mysqli_fetch_array($result_table, MYSQLI_ASSOC);//결과표에서 한줄 데이터를 (연관)배열로 받기
            
            //한줄에서 각 칸(테이블의 column이름)들의 값들을 뽑아오기
            $name= $row['name'];
            $phone= $row['phone'];
            $email= $row['email'];
            $date= $row['date'];

            

            echo "<h4>$name</h4>";
            echo "<h5>$phone</h5>";
            echo "<h5>$email</h5>";
            echo "<p>$date</p>";
        }
    }    
    //4. 연결 종료
    mysqli_close($db);

?>