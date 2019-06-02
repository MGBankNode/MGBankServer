# category Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [카테고리 변경](#1)

<a name="1"></a>

## 카테고리 변경

- 사용자의 id를 통해 accountID를 입력 받아 accountID를 찾고, 사용자가 변경하고자하는 카테고리의 번호를 바꿔서 설정해준다.
(변경하고자 하는 사용자의 거래내역에서 동일한 사용처이면 모두 업데이트)

  ```mysql
  update aHistory 
    set cId='curCategory' 
    where id = (select accountID from user where id = 'id') 
    AND hName = (select * from (select hName from aHistory where hId = 'hId')as X);
  ```

- 변경하고자 하는 원래 카테고리 번호의 가중치를 줄여준다. (미분류가 아닌 경우)

  ```mysql
  update caweight 
    SET weight=weight-1 
    where cId='prevCategory' 
    AND store=(select hName from aHistory where hId = 'hId') 
    AND cId<>11;
  ```

- 변경할 카테고리의 가중치를 증가시킨다.

  ```mysql
  update caweight 
    SET weight=weight+1 
    where cId='curCategory' 
    AND store=(select hName from aHistory where hId = 'hId') 
    AND cId<>11;
  ```

- 가중치에 따라 디폴트 카테고리 값을 업데이트 한다.

  ```mysql
  update defaultCategory 
    SET defaultCategory.cId = (select cId 
                                 from caweight 
                                 where store = (select hName from aHistory where hId = 'hId') 
                                 AND cId <> 11 
                                 ORDER BY weight DESC LIMIT 1) 
    where defaultCategory.store = (select store 
                                    from caweight 
                                    where store = (select hName from aHistory where hId = 'hId') 
                                    AND cId <> 11 ORDER BY weight DESC LIMIT 1);
  ```
