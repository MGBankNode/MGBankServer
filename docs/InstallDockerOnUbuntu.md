# Docker On Ubuntu

#### 작성자

광운대학교 컴퓨터 소프트웨어학과 2016117033 박연지

## 도커 설치

### sudo curl -sSL https://get.docker.com/ | sh

![image](https://user-images.githubusercontent.com/36066656/54844680-c4567680-4d1a-11e9-8edf-dec5ec8db23a.png)

### sudo apt-get -y install python-pip

![image](https://user-images.githubusercontent.com/36066656/54844742-f1a32480-4d1a-11e9-89f3-61e6045b533a.png)

## docker-compose 설치

- docker-compose 설치
- 도커로 서버 구축 시, 컨테이너를 띄움
- 한 컨테이너에 필요한 소프트웨어를 몰아서 설치할 수도 있고, 각 컨테이너를 따로 만들고 내부적으로 연결 가능
- docker-compose: 여러 컨테이너를 한 번에 띄울 수 있게 해주는 tool

> >  주의! 컨테이너 안의 데이터는 영속성 x

### sudo pip install docker-compose

![image](https://user-images.githubusercontent.com/36066656/54844886-49419000-4d1b-11e9-82ff-59977913b0ee.png)

### sudo -H pip install docker-compose

![image](https://user-images.githubusercontent.com/36066656/54844918-5eb6ba00-4d1b-11e9-9abe-bd48b155c190.png)

