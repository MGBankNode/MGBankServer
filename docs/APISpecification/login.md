# login API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [logincheck](#1)

<a name="1"></a>

## logincheck

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

