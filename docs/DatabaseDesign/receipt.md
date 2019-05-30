# receipt Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [상점명 카테고리 확인](#1)
2. [영수증 거래 내역 추가1](#2)
3. [영수증 거래 내역 추가2](#3)

<a name="1"></a>

## 상점명 카테고리 확인

- 설명

  ```mysql
  select cId from defaultCategory where store = 'hName';
  ```

<a name="2"></a>

## 영수증 거래 내역 추가1

- 설명

  ```mysql
  update caweight set weight = weight + 1 where store = 'hName' AND cId = 'cId';
  ```

- 설명

  ```mysql
  update defaultCategory SET defaultCategory.cId = (select cId from caweight where store = 'hName' AND cId <> 11 ORDER BY weight DESC LIMIT 1) where defaultCategory.store = (select store from caweight where store = 'hName' AND cId <> 11 ORDER BY weight DESC LIMIT 1);
  ```

- 설명

  ```mysql
  INSERT INTO nodeDB.aHistory(hDate, hType, hValue, hName, id, aNum, cId) VALUES('hDate', 3, 'hValue', 'hName', (select accountID from user where id = 'id'), '현금', 'cId'); SELECT hId from aHistory where hDate = 'hDate' AND id = (select accountID from user where id = 'id');
  ```

<a name="3"></a>

## 영수증 거래 내역 추가2

- 설명

  ```mysql
  insert into defaultCategory(store, cId) values('hName', 'cId');
  ```

- 설명

  ```mysql
  CALL nodeDB.insertData('hName');
  ```

- 설명

  ```mysql
  update caweight set weight = weight + 1 where store = 'hName' AND cId = 'cId';
  ```

- 설명

  ```mysql
  update defaultCategory SET defaultCategory.cId = (select cId from caweight where store = 'hName' AND cId <> 11 ORDER BY weight DESC LIMIT 1) where defaultCategory.store = (select store from caweight where store = 'hName' AND cId <> 11 ORDER BY weight DESC LIMIT 1);
  ```

- 설명

  ```mysql
  INSERT INTO nodeDB.aHistory(hDate, hType, hValue, hName, id, aNum, cId) VALUES('hDate', 3, 'hValue', 'hName', (select accountID from user where id = 'id'), '현금', 'cId'); SELECT hId from aHistory where hDate = 'hDate' AND id = (select accountID from user where id = 'id');
  ```

  