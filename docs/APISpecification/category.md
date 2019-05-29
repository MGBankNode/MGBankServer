# category API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [updatecategory](#1)

<a name="1"></a>

## updatecategory

- 설명

  - id, hId, prevCategory, curCategory의 정보를 받아  해당 내역과 같은 모든 거래 내역의 카테고리를 변경한다.

- **Endpoint**

  - (POST) nodeapi/category/updatecategory

- **Request Example**

  - URL: (POST) nodeapi/category/updatecategory

  - Body

    ```json
    {
        "id" : "testID",
        "hId" : "testHID",
        "prevCategory" : "testPrevCategory",
        "curCategory" : "testCurCategory"
    }
    ```

    

- **Response**

  - 카테고리 변경 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null"
    }
    ```

  - 카테고리 변경 실패

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

