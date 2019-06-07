# join Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [아이디 중복 확인](#1)
2. [회원가입](#2)

<a name="1"></a>

## 아이디 중복 확인

- 해당 id와 일치하는 아이디가 있는지 user 테이블에서 확인한다.

  ```mysql
  select id 
    from user 
    where id = 'id';
  ```

<a name="2"></a>

## 회원가입

- id, password, name phone의 정보를 받고, 고유 barcode 번호를 생성하여 user 테이블에 사용자 정보를 저장한다.

  ```mysql
  insert into user 
    set id = 'id', 
    pw = 'password', 
    name = 'name', 
    phone = 'phone', 
    mID = 'barcode';
  ```

- 생성된 바코드 번호를 membership 테이블에 저장한다.

  ```mysql
  insert into membership 
    set mID = 'barcode';
  ```
