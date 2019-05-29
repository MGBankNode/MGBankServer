# barcode Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [바코드 포인트 확인](#1)
2. [바코드 정보 조회](#2)
3. [포인트 적립](#3)

<a name="1"></a>

## 바코드 포인트 확인

- 설명

  ```mysql
  select mID, mPoint from membership where mID = (select mID from user where id = 'id');
  ```

<a name="2"></a>

## 바코드 정보 조회

- 설명

  ```mysql
  select name, mPoint from user, membership where user.mID = 'mID' AND membership.mID = 'mID';
  ```

<a name="3"></a>

## 포인트 적립

- 설명

  ```mysql
  update membership set mPoint = mPoint + 'point' where mID = 'mID';
  ```