# budget Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [기존 예산 확인](#1)
2. [예산 변경](#2)

<a name="1"></a>

## 기존 예산 확인

- 설명

  ```mysql
  select budget from user where id = 'id';
  ```

<a name="2"></a>

## 예산 변경

- 설명

  ```mysql
  update user set budget = 'budget' where id = 'id';
  ```