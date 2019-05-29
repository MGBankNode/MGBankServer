# account Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [계좌등록](#1)
2. [새로고침](#2)

<a name="1"></a>

## 계좌 등록

- 은행의 사용자 아이디를 확인한다.

  ```mysql
  select id from accountDB.client where (phone, name)=(select phone, name from nodeDB.user where id = 'id');
  ```

- 설명

  ```mysql
  update nodeDB.user set accountCheck=1 WHERE id = 'id';
  ```

- 설명

  ```mysql
  update nodeDB.user set accountID= 'accountID' WHERE id = 'id';
  ```

- 설명

  ```mysql
  insert into nodeDB.defaultCategory(store, cId) select DISTINCT hName, 11 from accountDB.aHistory where accountDB.aHistory.id = 'id' and accountDB.aHistory.hType=2 and aHistory.hName not in (select store from nodeDB.defaultCategory);
  ```

- 설명

  ```mysql
  update nodeDB.caweight, (select DISTINCT store, cId from nodeDB.defaultCategory where nodeDB.defaultCategory.store in (select hName from accountDB.aHistory where accountDB.aHistory.id = 'id' AND accountDB.aHistory.hType=2)) as a set weight = weight+1 where a.store = nodeDB.caweight.store AND a.cId = nodeDB.caweight.cId;
  ```

- 설명

  ```mysql
  select DISTINCT store from nodeDB.defaultCategory where nodeDB.defaultCategory.store not in (select store from nodeDB.caweight);
  ```

- 설명

  ```mysql
  call nodeDB.insertData('store');
  ```

- 설명

  ```mysql
  insert into nodeDB.aHistory(hDate, hType, hValue, hName, id, aBalance, cNum, aNum, cId) (SELECT hDate, hType, hValue, hName, id, aBalance, cNum, aNum, cId FROM accountDB.aHistory, nodeDB.defaultCategory WHERE id='id' AND CASE accountDB.aHistory.hType WHEN 0 THEN nodeDB.defaultCategory.store='계좌입금' WHEN 1 THEN nodeDB.defaultCategory.store='계좌출금' WHEN 2 THEN accountDB.aHistory.hName=nodeDB.defaultCategory.store END);
  ```

<a name="2"></a>

## 새로고침

- 설명

  ```mysql
  select accountID from user where id = 'id';
  ```

- 설명

  ```mysql
  INSERT INTO nodeDB.defaultCategory(store, cId) SELECT DISTINCT hName, 11 FROM accountDB.aHistory WHERE accountDB.aHistory.id = 'id' AND accountDB.aHistory.hDate > 'date' AND accountDB.aHistory.hType = 2 AND aHistory.hName NOT IN (select store from nodeDB.defaultCategory);
  ```

- 설명

  ```mysql
  UPDATE nodeDB.caweight, (SELECT DISTINCT store, cId FROM nodeDB.defaultCategory WHERE nodeDB.defaultCategory.store IN (SELECT hName FROM accountDB.aHistory WHERE accountDB.aHistory.id = 'accountID' AND accountDB.aHistory.hType=2) AND nodeDB.defaultCategory.store NOT IN (SELECT hName FROM nodeDB.aHistory WHERE nodeDB.aHistory.id= 'accountID')) AS a SET weight = weight+1 WHERE a.store = nodeDB.caweight.store AND a.cId = nodeDB.caweight.cId;
  ```

- 설명

  ```mysql
  SELECT DISTINCT store FROM nodeDB.defaultCategory WHERE nodeDB.defaultCategory.store NOT IN (SELECT store FROM nodeDB.caweight);
  ```

- 설명

  ```mysql
  call nodeDB.insertData('store');
  ```

- 설명

  ```mysql
  INSERT INTO nodeDB.aHistory(hDate, hType, hValue, hName, id, aBalance, cNum, aNum, cId) (SELECT hDate, hType, hValue, hName, id, aBalance, cNum, aNum, cId FROM accountDB.aHistory, nodeDB.defaultCategory WHERE id= 'accountID' AND accountDB.aHistory.hId > (select hId from accountDB.aHistory where id = 'accountID' AND hDate = (select hDate from nodeDB.aHistory where hType<>3 AND id = 'accountID' order by hDate DESC Limit 1) AND hName = (select hName from nodeDB.aHistory where hType<>3 AND id = 'accountID' order by hDate DESC Limit 1)) AND CASE accountDB.aHistory.hType WHEN 0 THEN nodeDB.defaultCategory.store='계좌입금' WHEN 1 THEN nodeDB.defaultCategory.store='계좌출금' WHEN 2 THEN accountDB.aHistory.hName=nodeDB.defaultCategory.store END);
  ```

- 설명

  ```mysql
  UPDATE nodeDB.aHistory, (SELECT DISTINCT nodeDB.aHistory.hName as hName, nodeDB.aHistory.cId as cId FROM nodeDB.aHistory, nodeDB.defaultCategory WHERE id='accountID' AND hType=2 AND nodeDB.aHistory.hName = nodeDB.defaultCategory.store AND nodeDB.aHistory.cId <> nodeDB.defaultCategory.cId) as A SET nodeDB.aHistory.cId = A.cId WHERE nodeDB.aHistory.hName = A.hName;
  ```

- 설명

  ```mysql
  update user set update_at = CURRENT_TIMESTAMP where accountID = 'id';
  ```

- 설명

  ```mysql
  select update_at from user where accountID = 'id';
  ```

  