# analysis API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [analysisdaily](#1)
2. [analysisweek](#2)

<a name="1"></a>

## analysisdaily

- 설명

  - id, sDate, lDate의 정보를 받아 일주일의 일별 지출 합계를 계산하여 보내준다.

- **Endpoint**

  - (POST) nodeapi/analysis/analysisdaily

- **Request Example**

  - URL: (POST) nodeapi/analysis/analysisdaily

  - Body

    ```json
    {
        "id" : "testID",
        "sDate" : "sDate",
        "lDate" : "lDate"
    }
    ```

    

- **Response**

  - 일별 소비 분석 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : null,
        "dailyPattern" : {
            "daily" : "testDaily",
            "dailySum" : "testDailySum"
        }
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null",
        "dailyPattern" : "null"
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "dailyPattern" : "null"
    }
    ```

<a name="2"></a>

## analysisweek

- 설명

  - id, dates의 정보를 받아 주별 지출 합계를 계산하여 보내준다.

- **Endpoint**

  - (POST) nodeapi/analysis/analysisweek

- **Request Example**

  - URL: (POST) nodeapi/analysis/analysisweek

  - Body

    ```json
    {
        "id" : "testID",
        "dates" : "date,...,date"
    }
    ```

    

- **Response**

  - 일별 소비 분석 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : null,
        "weekPattern" : {
            "week" : "testWeek",
            "weekSum" : "testWeekSum"
        }
    }
    ```

  - db 연결 오류

    ```json
    {
        "code" : "503",
        "message" : "db_fail",
        "error" : "null",
        "weekPattern" : "null"
    }
    ```

  - 오류

    ```json
    {
        "code" : "500",
        "message" : "error",
    	"error" : "errorMessage",
        "weekPattern" : "null"
    }
    ```

