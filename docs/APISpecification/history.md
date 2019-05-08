# history API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [accounthistory](#1)

<a name="1"></a>

## accounthistory

- 설명

  - 아이디, 내역의 시작날짜, 내역의 마지막 날짜의 정보를 받아 해당하는 거래 내역을 조회한다.

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
        "error" : null,
        "history" :[
            {
                "hDate" : "YYYY-MM-DDTHH:MM:SS.FFFZ",
                "hType" : "입금/출금/카드",
                "hValue" : "2000",
                "hName" : "history name",
                "aBalance" : "22000",
                "cType" : "card name"/null,
                "cName" : "category"
            },
            ....
        ]
        
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : null,
        "history" : null
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "history" : null
    }
    ```

    