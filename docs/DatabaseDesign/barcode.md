# barcode Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [바코드 포인트 확인](#1)
2. [바코드 정보 조회](#2)
3. [포인트 적립](#3)

<a name="1"></a>

## 바코드 포인트 확인

- id를 통해 mId(바코드 번호)를 찾아 mId, mPoint(현재 포인트 값)을 가져온다.

  ```mysql
  select mID, mPoint 
    from membership 
    where mID = (select mID from user where id = 'id');
  ```

<a name="2"></a>

## 바코드 정보 조회

- 바코드 번호를 입력 받아 해당 사용자의 이름과 포인트 값을 가져온다.

  ```mysql
  select name, mPoint 
    from user, membership 
    where user.mID = 'mID' 
    AND membership.mID = 'mID';
  ```

<a name="3"></a>

## 포인트 적립

- 해당 바코드 번호를 가진 사용자의 포인트 값에 'point'(입력 받 값)을 더해준다.

  ```mysql
  update membership 
    set mPoint = mPoint + 'point' 
    where mID = 'mID';
  ```
