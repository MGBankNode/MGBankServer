# account API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [addaccount](#1)
2. [accountrefresh](#2)

<a name="1"></a>

## addaccount

- 설명

  - id 정보를 받아 해당 회원의 은행쪽 계좌 정보를 가져와 등록한다.

- **Endpoint**

  - (POST) nodeapi/account/addaccount

- **Request Example**

  - URL: (POST) nodeapi/account/addaccount

  - Body

    ```json
    {
        "id" : "testID"
    }
    ```

    

- **Response**

  - 계좌 등록 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : 'null'
    }
    ```

  - 계좌 등록 실패

    ```json
    {
        "code" : "200",
        "message" : "history_insert_fail/caweigth_update_fail/category_insert_fail/account_update_fail/id_check_fail",
        "error" : 'null'
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : 'null'
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

## accountrefresh

- 설명

  - id 정보를 받아 은행쪽 거래 내역을 가져와 업데이트한다.

- **Endpoint**

  - (POST) nodeapi/account/accountrefresh

- **Request Example**

  - URL: (POST) nodeapi/account/accountrefresh

  - Body

    ```json
    {
        "id" : "testID",
        "date" : "lastUpdateDate"
    }
    ```

    

- **Response**

  - 거래내역 새로고침 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : 'null'
    }
    ```

  - 거래내역 새로고침 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : 'null'
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : 'null'
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

