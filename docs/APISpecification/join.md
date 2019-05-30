# join API

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## API 목록

1. [idcheck](#1)
2. [joinuser](#2)

<a name="1"></a>

## idcheck

- 설명

  - id의 정보를 중복된 아이디가 있는지 확인한다.

- **Endpoint**

  - (POST) nodeapi/join/idcheck

- **Request Example**

  - URL: (POST) nodeapi/join/idcheck

  - Body

    ```json
    {
        "id" : "testID"
    }
    ```

    

- **Response**

  - 사용 중인 아이디 존재한다.

    ```json
    {
        "code" : "200",
        "message" : "fail",
        "error" : "null"
    }
    ```

  - 사용 가능한 아이디

    ```json
    {
        "code" : "200",
        "message" : "success",
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

    

<a name="2"></a>

## joinuser

- 설명

  - id,  password, name, phone의 정보를 받아 DB에 회원 정보를 저장한다.

- **Endpoint**

  - (POST) nodeapi/join/joinuser

- **Request Example**

  - URL: (POST) nodeapi/join/joinuser

  - Body

    ```json
    {
        "id" : "testID",
        "password" : "testPW",
        "name" : "testUserName",
        "phone" : "01012345678"
    }
    ```

    

- **Response**

  - 회원가입 성공

    ```json
    {
        "code" : "200",
        "message" : "success",
        "error" : "null"
    }
    ```

  - 회원가입 실패

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

