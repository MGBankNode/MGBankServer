# device Query

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2015726022 조혜진

## Query 목록

1. [단말 추가](#1)
2. [단말 확인](#2)
3. [단말 제거](#3)

<a name="1"></a>

## 단말 추가

- mobile, osVersion, model, display, manufacturer, macAddress, registrationId의 정보를 device 테이블에 저장한다.

  ```mysql
  insert into device 
    set mobile = 'mobile', 
    osVersion = 'osVersion', 
    model = 'model', 
    display = 'display', 
    manufacturer = 'manufacturer', 
    macAddress = 'macAddress', 
    registrationId = 'registrationId';
  ```

<a name="2"></a>

## 단말 확인

- 해당 mobile과 일치하는 단말의 정보가 있는지 device 테이블에서 확인한다.

  ```mysql
  select mobile 
    from device 
    where mobile = 'mobile';
  ```

<a name="3"></a>

## 단말 제거

- 해당 mobile과 일치하는 단말의 정보를 device 테이블에서 제거한다.

  ```mysql
  delete from device 
    where mobile = 'mobile';
  ```
