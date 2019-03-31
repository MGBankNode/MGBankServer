# AWS EC2 생성

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## AWS 접속

Amazone Web Service 에 접속하여 로그인한 후 AWS Management Console 화면에서 [Compute -> EC2] 에 접속 한다.

![image](https://user-images.githubusercontent.com/36066656/55286780-3e51c400-53db-11e9-97b2-07eeee1fa488.png)

## 인스턴스 생성위한 필요 항목 확인

- **Key Pairs**: 공개키 암호화 기업을 사용하여 EC2 유저 정보 암호화 및 해독하는 키 쌍
- **Security Groups**: 트래픽 제어하는 가상 방화벽 역할(인스턴스 생성후 ssh 접속 위한 port 설정)

![image](https://user-images.githubusercontent.com/36066656/55286832-fb442080-53db-11e9-827f-7cf7e7c3f02e.png)

## Key Pairs 생성

왼쪽의 [NETWORK & SECURITY -> Key Pairs]에 접속하여 Create Key Pair하면 설정한 Key pair name으로 .pem 파일을 자동 다운로드 한다.

> <주의>
>
> 해당 키로 인스턴스를 마음대로 접근할 수 있기 때문에 유출되지 않도록 해야한다.
>
> 또한, 유출이 되더라도 사용할 수 없도록 만들기 위해 비밀번호 설정을 해야한다.

![image](https://user-images.githubusercontent.com/36066656/55286984-0a2bd280-53de-11e9-9211-d3c881b59121.png)

### pem파일에 패스워드 설정하여 별도의 개인키로 관리

- Putty Key Generator를 실행하여 Load를 클릭하여 All Files 항목으로 pem 파일을 연다.

- 다운로드 링크: [Putty Key Generator](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

  ![image](https://user-images.githubusercontent.com/36066656/55287160-5d068980-53e0-11e9-90b7-03a9f40d01f4.png)

- Key passphrase와 Confirm passphrase에 개인키에 사용할 비밀번호를 쓰고 Save private Key를 클릭하여 ppk파일을 생성한다.

  ![image](https://user-images.githubusercontent.com/36066656/55287222-136a6e80-53e1-11e9-86d0-a066b698b806.png)

## Security Group 생성

왼쪽의 [NETWORK & SECURITY -> Security Group]에 접속하여 Create Security Group하여 생성한다.

- Inbound rule에 SSH를 선택하고 Source는 My IP를 설정하여 다른사람이 해당 인스턴스에 접근하지 못하도록 한다.

  ![image](https://user-images.githubusercontent.com/36066656/55287329-6c86d200-53e2-11e9-8c46-60ee71cc25ea.png)

## Instance 생성

- 왼쪽의 [INSTANCES -> Instances]에 접속하여 Lanch Instance를 클릭한다.

![image](https://user-images.githubusercontent.com/36066656/55287589-f1bfb600-53e5-11e9-9061-a9cfd6878693.png)

- [AWS Marketplace] 탭에서 Ubuntu를 검색하여 Ubuntu 18.04 LTS - Blonic을 Select

![image](https://user-images.githubusercontent.com/36066656/55287641-a0fc8d00-53e6-11e9-8fe8-90e829246b62.png)

- 무료인 t2.micro 인스턴스 타입을 선택

![image](https://user-images.githubusercontent.com/36066656/55287686-2d0eb480-53e7-11e9-9d20-90cb7c44397f.png)

- Configure Instance, Add Strorage, Add Tags 설정 그대로 넘어감
- Configure Security Group에서 Select an existing security group으로 앞에서 생성한 security group 선택

![image](https://user-images.githubusercontent.com/36066656/55287769-524ff280-53e8-11e9-8b6f-b3492763375d.png)

- Review에서 Launch를 눌러 앞에서 생성한 key pair 선택하여 Launch Instances 클릭하여 인스턴스 생성

![image](https://user-images.githubusercontent.com/36066656/55287792-9c38d880-53e8-11e9-8562-9cac98eb30eb.png)

## Putty를 이용하여 인스턴스 SSH 접속

- AWS [INSTANCES -> Instances]에 접속하여 인스턴스 정보를 사용하여 Public DNS의 값을 Putty의 Host Name에 적는다.

![image](https://user-images.githubusercontent.com/36066656/55287896-47965d00-53ea-11e9-84cb-ffe18ee4261d.png)

- Putty 왼쪽의 [Connection -> SSH -> Auth]의 Private key file for authenticatioon에 앞에서 생성했던 ppk 파일을 설정한다.

![image](https://user-images.githubusercontent.com/36066656/55287878-f6866900-53e9-11e9-8e3b-a4d90b4e5c95.png)

- login as에 ubuntu 입력하고, ppk 파일 생성시 설정한 Key passphrase 암호 입력 후 접속 완료

![image](https://user-images.githubusercontent.com/36066656/55288049-d5734780-53ec-11e9-96e8-3c10ded18964.png)