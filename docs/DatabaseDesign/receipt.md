# receipt Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [상점명 카테고리 확인](#1)
2. [영수증 거래 내역 추가1](#2)
3. [영수증 거래 내역 추가2](#3)

<a name="1"></a>

## 상점명 카테고리 확인

- 해당 상점명의 카테고리 번호를 가져온다.

  ```mysql
  select cId 
    from defaultCategory 
    where store = 'hName';
  ```

<a name="2"></a>

## 영수증 거래 내역 추가1 - 해당 상점명이 defaultCategory에 있는 경우

- 해당 사용자의 거래내역 중 해당 상점명이 있는지 확인한다.

  ```mysql
    SELECT COUNT(*) 
      FROM aHistory 
      WHERE id=(SELECT accountID FROM user WHERE id='id') 
      AND hName='hName';
  ```
    
- 카테고리의 가중치를 증가시킨다.

  ```mysql
  update caweight 
    set weight = weight + 1 
    where store = 'hName' 
    AND cId = 'cId';
  ```

- 가중치의 변경으로 인해 해당 상점의 디폴트 카테고리의 값이 바뀌었으면 업데이트 시켜준다.

  ```mysql
  update defaultCategory 
    SET defaultCategory.cId = (select cId from caweight 
                                  where store = 'hName' AND cId <> 11 ORDER BY weight DESC LIMIT 1) 
    where defaultCategory.store = (select store from caweight 
                                     where store = 'hName' AND cId <> 11 ORDER BY weight DESC LIMIT 1);
  ```

- 영수증 인식 결과 거래내역에 추가한다.

  ```mysql
  INSERT INTO nodeDB.aHistory(hDate, hType, hValue, hName, id, aNum, cId) 
    VALUES('hDate', 3, 'hValue', 'hName', (select accountID from user where id = 'id'), '현금', 'cId'); 
  ```
  
  - 해당 날짜의 hId를 가져온다.
  
  ``` mysql
  SELECT hId 
    from aHistory 
    where hDate = 'hDate' 
    AND id = (select accountID from user where id = 'id');
  ```

<a name="3"></a>

## 영수증 거래 내역 추가2 - 해당 상점명이 데이터베이스에 없는 경우

- defaultCategory에 해당 상점명과 카테고리 번호를 저장한다.

  ```mysql
  insert into defaultCategory(store, cId) 
    values('hName', 'cId');
  ```

- caweight 테이블에도 해당 상점명에 대한 내역을 저장하는 함수를 호출한다.

  ```mysql
  CALL nodeDB.insertData('hName');
  ```

- 사용자가 설정한 카테고리의 가중치를 업데이트 시켜준다.

  ```mysql
  update caweight 
    set weight = weight + 1 
    where store = 'hName' 
    AND cId = 'cId';
  ```

- 사용자가 설정한 카테고리를 디폴트카테고리로 설정한다.

  ```mysql
  update defaultCategory 
    SET defaultCategory.cId = (select cId from caweight 
                                  where store = 'hName' AND cId <> 11 ORDER BY weight DESC LIMIT 1) 
    where defaultCategory.store = (select store from caweight 
                                       where store = 'hName' AND cId <> 11 ORDER BY weight DESC LIMIT 1);
  ```

- 영수증 인식 결과를 거래내역에 추가한다.

  ```mysql
  INSERT INTO nodeDB.aHistory(hDate, hType, hValue, hName, id, aNum, cId) 
    VALUES('hDate', 3, 'hValue', 'hName', (select accountID from user where id = 'id'), '현금', 'cId'); 
  ```

- 해당 날짜의 hId를 가져온다.

  ```mysql
    SELECT hId 
      from aHistory 
      where hDate = 'hDate' 
      AND id = (select accountID from user where id = 'id');
  ```

  
