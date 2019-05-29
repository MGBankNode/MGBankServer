# barcode API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [barcodepoint](#1)
2. [barcodeinfo](#2)
3. [addpoint](#3)

<a name="1"></a>

## barcodepoint

- 설명

  - id의 정보를 받아 바코드와 포인트의 정보를 확인한다.

- **Endpoint**

  - (POST) nodeapi/barcode/barcodepoint

- **Request Example**

  - URL: (POST) nodeapi/barcode/barcodepoint

  - Body

    ```json
    {
        "id" : "testID"
    }
    ```

    

- **Response**

  - 바코드와 포인트의 정보를 확인 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "data" : {
            "barcode" : "testBarcode",
            "point" : "testPoint"
        }
    }
    ```

  - 바코드와 포인트의 정보를 확인 실패

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

## barcodeinfo

- 설명

  - barcode의 정보를 받아 바코드의 대한 정보를 확인한다

- **Endpoint**

  - (POST) nodeapi/barcode/barcodeinfo

- **Request Example**

  - URL: (POST) nodeapi/barcode/barcodeinfo

  - Body

    ```json
    {
        "barcode" : "testBarcode"
    }
    ```

    

- **Response**

  - 바코드 정보를 확인 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "data" : {
            "name" : "testName",
            "point" : "testPoint"
        }
    }
    ```

  - 바코드 정보를 확인 실패

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

<a name="3"></a>

## addpoint

- 설명

  - barcode, point의 정보를 받아 바코드에 해당 포인트 만큼 포인트를 적립한다.

- **Endpoint**

  - (POST) nodeapi/barcode/addpoint

- **Request Example**

  - URL: (POST) nodeapi/barcode/addpoint

  - Body

    ```json
    {
        "barcode" : "testBarcode",
        "point" : "testPoint"
    }
    ```

    

- **Response**

  - 포인트 적립 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null"
    }
    ```

  - 포인트 적립 실패

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

