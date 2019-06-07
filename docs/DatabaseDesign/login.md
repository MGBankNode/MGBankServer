# login Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [로그인](#1)

<a name="1"></a>

## 로그인

- 사용자의 아이디와 패스워드를 통해 사용자의 정보를 가져온다.

  ```mysql
  select name, phone, accountCheck, update_at 
    from user 
    where id = 'id' 
    and pw = 'pw';
  ```

- 사용자의 계좌별 잔액 정보를 가져온다.

  ```mysql
  select aNum, aBalance 
    from accountDB.account_card 
    where id = (select accountID from nodeDB.user where id = 'id');
  ```

- 사용자의 마지막 접근 시간을 업데이트 시킨다.

  ```mysql
  update user 
    set update_at = CURRENT_TIMESTAMP 
    where id = 'id';
  ```
