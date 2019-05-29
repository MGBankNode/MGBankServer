# analysis Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [일별 소비 분석](#1)
2. [주별 소비 분석](#2)

<a name="1"></a>

## 일별 소비 분석

- 설명

  ```mysql
  select hDate, hValue from aHistory where id = (select accountID from user where id = ?) AND hDate>= 'sDate' AND hDate< 'lDate' AND (hType = 1 OR hType = 2 OR hType = 3);
  ```

<a name="2"></a>

## 주별 소비 분석

- 설명

  ```mysql
  select SUM(hValue) as weekSum from aHistory where id = (select accountID from user where id = '"+ id + "') AND hDate>= 'sDate' AND hDate< 'lDate' AND (hType = 1 OR hType = 2 OR hType = 3);
  ```