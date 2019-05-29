# category Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [카테고리 변경](#1)

<a name="1"></a>

## 카테고리 변경

- 설명

  ```mysql
  update aHistory set cId='curCategory' where id = (select accountID from user where id = 'id') AND hName = (select * from (select hName from aHistory where hId = 'hId')as X);
  ```

- 설명

  ```mysql
  update caweight SET weight=weight-1 where cId='prevCategory' AND store=(select hName from aHistory where hId = 'hId') AND cId<>11;
  ```

- 설명

  ```mysql
  update caweight SET weight=weight+1 where cId='curCategory' AND store=(select hName from aHistory where hId = 'hId') AND cId<>11;
  ```

- 설명

  ```mysql
  update defaultCategory SET defaultCategory.cId = (select cId from caweight where store = (select hName from aHistory where hId = 'hId') AND cId <> 11 ORDER BY weight DESC LIMIT 1) where defaultCategory.store = (select store from caweight where store = (select hName from aHistory where hId = 'hId') AND cId <> 11 ORDER BY weight DESC LIMIT 1);
  ```