# budget API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [defaultbudget](#1)
2. [changebudget](#2)

<a name="1"></a>

## defaultbudget

- 설명

  - id의 정보를 받아 예산의 정보를 확인한다.

- **Endpoint**

  - (POST) nodeapi/budget/defaultbudget

- **Request Example**

  - URL: (POST) nodeapi/budget/defaultbudget

  - Body

    ```json
    {
        "id" : "testID"
    }
    ```

    

- **Response**

  - 예산 정보 확인 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null",
        "data" : "testBudget"
    }
    ```

  - 예산 정보 확인 실패

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

## changebudget

- 설명

  - id, budget의 정보를 받아 해당 예산만큼 예산을 변경한다.

- **Endpoint**

  - (POST) nodeapi/budget/changebudget

- **Request Example**

  - URL: (POST) nodeapi/budget/changebudget

  - Body

    ```json
    {
        "id" : "testID",
        "budget" : "testBudget"
    }
    ```

    

- **Response**

  - 예산 변경 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null"
    }
    ```

  - 예산 변경 실패

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