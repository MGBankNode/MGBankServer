# API 스펙

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [Join - IDCheck](#1)
2. [Join - JoinUser](#2)
3. [Login - LoginCheck](#3)
4. [Device - AddDevice](#4)
5. [Device - DeviceCheck](#5)
6. [Device - DeleteDevice](#6)

<a name="1"></a>

## Join – IDCheck

- 설명

  - id의 정보를 중복된 아이디가 있는지 확인한다.

- **Endpoint**

  - (POST) nodeapi/join/idcheck

- **Request Example**

  - URL: (POST) nodeapi/join/idcheck

  - Body

    ```json
    {
        "id" : "testID"
    }
    ```

    

- **Response**

  - 사용 중인 아이디 존재한다.

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : null
    }
    ```

  - 사용 가능한 아이디

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : null
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : null
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage"
    }
    ```

    

<a name="2"></a>

## Join – JoinUser

- 설명

  - id,  password, name, phone의 정보를 받아 DB에 회원 정보를 저장한다.

- **Endpoint**

  - (POST) nodeapi/join/joinuser

- **Request Example**

  - URL: (POST) nodeapi/join/joinuser

  - Body

    ```json
    {
        "id" : "testID",
        "password" : "testPW",
        "name" : "testUserName",
        "phone" : "01012345678"
    }
    ```

    

- **Response**

  - 회원가입 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : null
    }
    ```

  - 회원가입 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : null
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : null
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage"    
    }
    ```

    

<a name="3"></a>

## Login – LoginCheck

- 설명

  - id,  password의 정보를 받아 DB에 회원 정보를 저장한다.

- **Endpoint**

  - (POST) nodeapi/login/logincheck

- **Request Example**

  - URL: (POST) nodeapi/login/logincheck

  - Body

    ```json
    {
        "id" : "testID",
        "password" : "testPW"
    }
    ```

    

- **Response**

  - 로그인 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : null,
        "id" : "testID",
        "name" : "testUserName",
        "accountCheck" : NUM(0/1),
        "update_at" : TIME
    }
    ```

  - 로그인 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : null,
        "id" : null,
        "name" : null,
        "accountCheck" : null,
        "update_at" : null
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : null,
        "id" : null,
        "name" : null,
        "accountCheck" : null,
        "update_at" : null
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "id" : null,
        "name" : null,
        "accountCheck" : null,
        "update_at" : null
    }
    ```

    


<a name="4"></a>

## Device - AddDevice

- 설명

  - mobile,  osVersion, model, display, manufacturer, macAddress의 정보를 받아 DB에 단말 정보를 저장한다.

- **Endpoint**

  - (POST) nodeapi/device/adddevice

- **Request Example**

  - URL: (POST) nodeapi/device/adddevice

  - Body

    ```json
    {
        "mobile" : "testMobile",
        "osVersion" : "testOsVersion",
        "model" : "testModel",
        "display" : "testDisplay",
        "manufacturer" : "testManufacturer",
        "macAddress" : "testMacAddress"
    }
    ```

    

- **Response**

  - 단말 추가 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : null
    }
    ```

  - 단말 추가 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : null
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : null
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage"
    }
    ```

    

<a name="5"></a>

## Device - DeviceCheck

- 설명

  - mobile의 정보를 받아 추가된 단말인지 확인 정보를 제공한다.

- **Endpoint**

  - (POST) nodeapi/device/devicecheck

- **Request Example**

  - URL: (POST) nodeapi/device/devicecheck

  - Body

    ```json
    {
        "mobile" : "testMobile"
    }
    ```

    

- **Response**

  - 해당 단말 존재

    ```json
    {
        "code" : "200",
        "message" : "YES",
        "error" : null
    }
    ```

  - 해당 단말 미존재

    ```json
    {
        "code" : "200",
        "message" : "NO",
        "error" : null
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : null
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage"
    }
    ```

    

<a name="6"></a>

## Device - DeleteDevice

- 설명

  - mobile의 정보를 존재하는 단말 정보를 제거한다.

- **Endpoint**

  - (POST) nodeapi/device/deletedevice

- **Request Example**

  - URL: (POST) nodeapi/device/deletedevice

  - Body

    ```json
    {
        "mobile" : "deletedevice"
    }
    ```

    

- **Response**

  - 단말 제거 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : null
    }
    ```

  - 단말 제거 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : null
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : null
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage"
    }
    ```

    