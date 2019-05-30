# receipt API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [hnamecheck](#1)
2. [addreceipt](#2)
3. [addnewreceipt](#3)

<a name="1"></a>

## hnamecheck

- 설명

  - hName의 정보를 받아 상점명을 확인하여 카테고리를 보내준다.

- **Endpoint**

  - (POST) nodeapi/receipt/hnamecheck

- **Request Example**

  - URL: (POST) nodeapi/receipt/hnamecheck

  - Body

    ```json
    {
        "hName" : "hName"
    }
    ```

    

- **Response**

  - 상점명 카테고리 확인 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "data" : "cId/null"
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null",
        "data" : "null"
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "data" : "null"
    }
    ```

<a name="2"></a>

## addreceipt

- 설명

  - hDate, hValue, hName, id, cId, hName의 정보를 받아 영수증 거래 내역을 DB에 저장한다.

- **Endpoint**

  - (POST) nodeapi/receipt/addreceipt

- **Request Example**

  - URL: (POST) nodeapi/receipt/addreceipt

  - Body

    ```json
    {
        "hDate" : "hDate",
        "hValue" : "hValue",
        "hName" : "hName",
        "id" : "id",
        "cId" : "cId",
        "hName" : "hName"
    }
    ```

    

- **Response**

  - 영수증 거래 내역 추가 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "data" : "hId"
    }
    ```

  - 영수증 거래 내역 추가 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : "null",
        "data" : "null"
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null",
        "data" : "null"
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "data" : "null"
    }
    ```

<a name="2"></a>

## addnewreceipt

- 설명

  - hDate, hValue, hName, id, cId의 정보를 받아 영수증 거래 내역을 DB에 저장한다.

- **Endpoint**

  - (POST) nodeapi/receipt/addnewreceipt

- **Request Example**

  - URL: (POST) nodeapi/receipt/addnewreceipt

  - Body

    ```json
    {
        "hDate" : "hDate",
        "hValue" : "hValue",
        "hName" : "hName",
        "id" : "id",
        "cId" : "cId"
    }
    ```

    

- **Response**

  - 영수증 거래 내역 추가 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null"
    }
    ```

  - 영수증 거래 내역 추가 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : "null"
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null"
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

