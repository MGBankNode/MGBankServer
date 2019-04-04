# 사용자 생성

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## 목차

- [사용자 생성](#1)
- [사용자 접속 포트 열기](#2)
- [생성한 사용자 계정에 sudo 사용 권한 부여](#3)

<a name="1"> </a>

## 사용자 생성

- nodeteam이라는 사용자 생성

### Key Pair 생성

- 생성할 사용자의 이름으로 AWS 사이트에서 Key Pair를 생성
  - 생성하는 방법은 앞 문서 참조: [AWS EC2 생성](https://github.com/MGBankNode/MGBankServer/tree/master/docs/PublishWebServer/CreateAWSEC2.md)

### 사용자 생성

``` bash
sudo adduser nodeteam --disabled-password
```

![image](https://user-images.githubusercontent.com/36066656/55462589-1019f180-5632-11e9-8d03-658a39f2cf06.png)

<a name="2"> </a>

## 사용자 접속 포트 열기

### 생성된 계정 전환

```bash
sudo su - nodeteam
```

### .ssh 폴더 생성 및 권한 설정

- /home/nodeteam 디렉터리 안에 .ssh 폴더 생성

```bash
mkdir .ssh
```

```bash
chmod 700 .ssh
```

![image](https://user-images.githubusercontent.com/36066656/55463099-4441e200-5633-11e9-8832-82d36d53a64a.png)

- vi 편집기를 사용하여 .ssh디렉터리 안에 authorized_keys 파일 생성
- puttyGen으로 nodeTeam.pem을 열어 public key의 내용을 authorized_keys 파일에 저장 후 권한 설정

```bash
chmod 600 .ssh/authorized_keys
```

![image](https://user-images.githubusercontent.com/36066656/55463672-84559480-5634-11e9-84e6-d906c8343bed.png)

### AWS 사이트에서 Security Group 생성

- 생성하는 방법은 앞 문서 참조:  [AWS EC2 생성](https://github.com/MGBankNode/MGBankServer/tree/master/docs/PublishWebServer/CreateAWSEC2.md)

![image](https://user-images.githubusercontent.com/36066656/55464085-50c73a00-5635-11e9-8e43-d8292ff37583.png)

<a name="3"> </a>

## 생성한 사용자 계정에 sudo 사용 권한 부여 

- root 인 ubuntu 계정으로 ssh 접속
- sudoers 파일을 수정하여 nodeteam에 sudo 권한 부여

```bash
sudo visudo -f /etc/sudoers
```

- nodeteam ALL=(ALL:ALL) ALL 추가하고 ctrl + x 으로 저장

![image](https://user-images.githubusercontent.com/36066656/55466193-ac93c200-5639-11e9-8440-ef5970ea3ab3.png)

