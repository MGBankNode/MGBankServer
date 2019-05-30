# history API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [accounthistory](#1)
2. [accountbalance](#2)
3. [accounthomehistory](#3)
4. [accountbyhistory](#4)
5. [balancelist](#5)

<a name="1"></a>

## accounthistory

- 설명

  - 아이디(id), 내역의 시작날짜(sDate), 내역의 마지막 날짜(lDate)의 정보를 받아 해당하는 거래 내역을 조회한다.

- **Endpoint**

  - (POST) nodeapi/history/accounthistory

- **Request Example**

  - URL: (POST) nodeapi/history/accounthistory

  - Body

    ```json
    {
        "id" : "testID",
        "sDate" : "YYYY-MM-DD",
        "lDate" : "YYYY-MM-DD"
    }
    ```

    

- **Response**

  - 거래 내역 조회 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "history" :[
            {
                "hId" : "hId",
                "hDate" : "YYYY-MM-DD HH:MM:SS",
                "hType" : "입금/출금/카드/영수증",
                "hValue" : "2000",
                "hName" : "history name",
                "aBalance" : "22000",
               	"aType" : "account name",
                "cType" : "card name/null",
                "cName" : "category"
            },
            ....
        ],
        "daily_history" : [
            {
                "day" : "01",
                "benefit" : "benefit",
                "loss" : "loss"
            },
            ....
        ]
        
    }
    ```

  - 거래 내역 조회 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : "null",
        "history" : "null",
        "daily_history" : "null"
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null",
        "history" : "null",
        "daily_history" : "null"
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "history" : "null",
        "daily_history" : "null"
    }
    ```

    

<a name="2"></a>

## accountbalance

- 설명

  - id의 정보를 받아 해당하는 해당 아이디의 계좌 잔액 조회한다.

- **Endpoint**

  - (POST) nodeapi/history/accounthistory

- **Request Example**

  - URL: (POST) nodeapi/history/accounthistory

  - Body

    ```json
    {
        "id" : "testID"
    }
    ```

    

- **Response**

  - 잔액 조회 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "aBalance" : "aBalance"
    }
    ```

  - 잔액 조회 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : "null",
        "aBalance" : "null"
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null",
        "aBalance" : "null"
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "aBalance" : "null"
    }
    ```

    

<a name="3"></a>

## accounthomehistory

- 설명

  - 아이디(id), 내역의 시작날짜(sDate), 내역의 마지막 날짜(lDate)의 정보를 받아 해당하는 거래 내역을 조회한다.

- **Endpoint**

  - (POST) nodeapi/history/accounthomehistory

- **Request Example**

  - URL: (POST) nodeapi/history/accounthomehistory

  - Body

    ```json
    {
        "id" : "testID",
        "sDate" : "YYYY-MM-DD",
        "lDate" : "YYYY-MM-DD"
    }
    ```

    

- **Response**

  - 거래 내역 조회 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "history" :[
            {
                "hId" : "hId",
                "hDate" : "YYYY-MM-DD HH:MM:SS",
                "hValue" : "2000",
                "hName" : "history name",
                "cName" : "category"
            },
            ....
        ]
    }
    ```

  - 거래 내역 조회 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : "null",
        "history" : "null"
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null",
        "history" : "null"
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "history" : "null"
    }
    ```

    

<a name="4"></a>

## accountbyhistory

- 설명

  - aNum, sDate, lDate의 정보를 받아 해당하는 계좌 별 거래 내역을 조회한다.

- **Endpoint**

  - (POST) nodeapi/history/accountbyhistory

- **Request Example**

  - URL: (POST) nodeapi/history/accountbyhistory

  - Body

    ```json
    {
        "aNum" : "aNum",
        "sDate" : "YYYY-MM-DD",
        "lDate" : "YYYY-MM-DD"
    }
    ```

    

- **Response**

  - 계좌 별 거래 내역 조회 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "history" :[
            {
                "hId" : "hId",
                "hDate" : "YYYY-MM-DD HH:MM:SS",
                "hType" : "입금/출금/카드/영수증",
                "hValue" : "2000",
                "hName" : "history name",
                "aBalance" : "22000",
               	"aType" : "account name",
                "cType" : "card name/null",
                "cName" : "category"
            },
            ....
        ],
        "daily_history" : [
            {
                "day" : "01",
                "benefit" : "benefit",
                "loss" : "loss"
            },
            ....
        ]
        
    }
    ```

  - 계좌 별 거래 내역 조회 실패

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : "null",
        "history" : "null",
        "daily_history" : "null"
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null",
        "history" : "null",
        "daily_history" : "null"
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "history" : "null",
        "daily_history" : "null"
    }
    ```

    

<a name="2"></a>

## balancelist

- 설명

  - id의 정보를 받아 해당하는 해당 아이디의 계좌 리스트를 조회한다.

- **Endpoint**

  - (POST) nodeapi/history/balancelist

- **Request Example**

  - URL: (POST) nodeapi/history/balancelist

  - Body

    ```json
    {
        "id" : "testID"
    }
    ```

    

- **Response**

  - 잔액 조회 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "data" : [
            {
                "aNum" : "aNum",
                "aBalance" : "aBalance",
                "aType" : "aType"
            },
            ....
        ]
    }
    ```

  - 잔액 조회 실패

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

    