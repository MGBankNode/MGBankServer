# WinSCP를 이용하여 서버 프로젝트 전송

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## 목차

- [WinSCP로 시작](#1)

<a name="1"></a>

## WinSCP로 시작

- WinSCP: SFTP, SCP, FTP 및 FTPS 프로토콜을 사용해 원격 컴퓨터로 파일 업로드 + 전송할 수 있는 Windows용 GUI 기반 파일 관리자

### WinSCP 설치

- WinSCP 다운로드 경로: <https://winscp.net/eng/download.php>

- 설치 시 기본 putty에 설정된 정보 가져오기

  ![image](https://user-images.githubusercontent.com/36066656/55548781-38c3e900-570f-11e9-829e-4304e455c905.png)

### WinSCP 로그인

- 가져온 기본 정보로 로그인 - nodeteam 으로 접속

  ![image](https://user-images.githubusercontent.com/36066656/55549272-6cebd980-5710-11e9-851f-36eb6f7c18f2.png)

- 호스트 이름: AWS ubuntu Instance의 Public DNS 주소

- [수정] -> 사용자 이름 입력: nodeteam

  ![image](https://user-images.githubusercontent.com/36066656/55550053-4d55b080-5712-11e9-924e-8f684d7fd8c3.png)

- [고급] - [SSH] - [인증] 에서 개인키 파일 설정 후 저장하고 로그인

  ![image](https://user-images.githubusercontent.com/36066656/55550290-d53bba80-5712-11e9-9715-a275f5de4924.png)

<a name="2"></a>

## 서버 프로젝트 전송

![image](https://user-images.githubusercontent.com/36066656/55550634-aa9e3180-5713-11e9-87dc-ad3b4e2c025d.png)

