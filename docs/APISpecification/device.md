# device API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [adddevice](#1)
2. [devicecheck](#2)
3. [deletedevice](#3)

<a name="1"></a>

## adddevice

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

    

<a name="2"></a>

## devicecheck

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

    

<a name="3"></a>

## deletedevice

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

    