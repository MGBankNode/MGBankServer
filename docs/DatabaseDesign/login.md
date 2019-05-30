# login Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [로그인](#1)

<a name="1"></a>

## 로그인

- 설명

  ```mysql
  select name, phone, accountCheck, update_at from user where id = 'id' and pw = 'pw';
  ```

- 설명

  ```mysql
  select aBalance from aHistory where id = (select accountID from nodeDB.user where id = 'id') order by hId DESC limit 1;
  ```

- 설명

  ```mysql
  update user set update_at = CURRENT_TIMESTAMP where id = 'id';
  ```