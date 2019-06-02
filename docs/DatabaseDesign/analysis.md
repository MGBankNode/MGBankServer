# analysis Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [일별 소비 분석](#1)
2. [주별 소비 분석](#2)
3. [월별 소비 분석](#3)

<a name="1"></a>

## 일별 소비 분석

- 사용자의 id를 얻어와 accountID를 가져와서 시작날짜와 끝날짜(시작날짜 + 1)를 기준으로 지출 내역을 가져온다.

  ```mysql
  select hDate, hValue 
    from aHistory 
    where id = (select accountID from user where id = 'id') 
    AND hDate>= 'sDate' AND hDate< 'lDate' 
    AND (hType = 1 OR hType = 2 OR hType = 3);
  ```

<a name="2"></a>

## 주별 소비 분석

- 사용자의 id를 통해 accountID를 찾고, 시작날짜와 끝날짜(시작날짜 +7)를 기준으로 지출 내역의 합계를 가져온다.

  ```mysql
  select SUM(hValue) as weekSum 
    from aHistory 
    where id = (select accountID from user where id = 'id') 
    AND hDate>= 'sDate' AND hDate< 'lDate' 
    AND (hType = 1 OR hType = 2 OR hType = 3);
  ```

<a name="3"></a>

## 월별 소비 분석

- 사용자의 id를 통해 accountID를 찾고, 시작날짜와 끝날짜(시작날짜 + 1달)를 기준으로 지출 내역의 합계를 가져온다.

  ```mysql
  select SUM(hValue) as monthSum 
    from aHistory 
    where id = (select accountID from user where id = 'id') 
    AND hDate>= 'sDate' AND hDate< 'lDate' 
    AND (hType = 1 OR hType = 2 OR hType = 3);
  ```
