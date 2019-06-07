# history Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [거래 내역 조회1](#1)
2. [잔액 조회](#2)
3. [거래 내역 조회2](#3)
4. [계좌 별 거래 내역 조회](#4)
5. [계좌 리스트 조회](#5)

<a name="1"></a>

## 거래 내역 조회1

- 해당 기간동안의 거래내역을 가져온다.

  ```mysql
  select hId, hDate, hType, hValue, hName, aBalance, 
  (select aType from accountDB.account 
      where aId = (select distinct aId from accountDB.account_card 
                      where aNum = nodeDB.aHistory.aNum)) as aType, 
  (select cType from accountDB.card 
      where cId = (select cId from accountDB.account_card 
                      where cNum = nodeDB.aHistory.cNum)) as cType, cName 
    from nodeDB.aHistory, nodeDB.category 
    where id = (select accountID from nodeDB.user where id = 'id') 
    AND hDate>='sDate' AND hDate<'lDate' 
    AND nodeDB.aHistory.cId=nodeDB.category.cId order by hDate;
  ```

<a name="2"></a>

## 잔액 조회

- 고객의 계좌별 잔액 가져온다.

  ```mysql
  select distinct aNum, aBalance 
    from accountDB.account_card 
    where id = (select accountID from nodeDB.user where id = 'id');
  ```

<a name="3"></a>

## 거래 내역 조회2

- 해당 기간의 거래내역을 가져온다. 

  ```mysql
  select hId, hDate, hValue, hName, cName 
    from nodeDB.aHistory, nodeDB.category 
    where id = (select accountID from nodeDB.user where id = 'id') 
    AND hDate>='sDate' AND hDate<'lDate' 
    AND (nodeDB.aHistory.hType <> 0) 
    AND nodeDB.aHistory.cId=nodeDB.category.cId order by hDate;
  ```

<a name="4"></a>

## 계좌 별 거래 내역 조회

- 계좌번호를 통해 사용자의 거래내역을 가져온다.

  ```mysql
  select hId, hDate, hType, hValue, hName, aBalance, 
  (select aType from accountDB.account 
       WHERE aId = (select distinct aId from accountDB.account_card 
                         where aNum = 'aNum')) as aType,
  (select cType from accountDB.card 
       where cId = (select cId from accountDB.account_card where cNum = nodeDB.aHistory.cNum)) as cType, cName 
    from nodeDB.aHistory, nodeDB.category 
    where nodeDB.aHistory.cId=nodeDB.category.cId 
    AND hDate>='sDate' AND hDate<'lDate' 
    AND aNum = 'aNum' order by hDate;
  ```

<a name="5"></a>

## 계좌 리스트 조회

- 사용자의 계좌 정보와 잔액을 가져온다.

  ```mysql
  SELECT DISTINCT aNum, aBalance, 
  (SELECT aType 
      from accountDB.account 
      where aId = account_card.aId) as aType 
    FROM accountDB.account_card 
    WHERE id = (select accountID from nodeDB.user where id = 'id')
  ```
