## 사용자 위치 기반 부산 모범음식점 추천 사이트 제작

###### 본 프로젝트는 https://github.com/Growing-Jiwoo/Spring-Boot-Module-Project 링크의

###### 일부 기능을 재활용하여 React.js와 TypeScript를 활용하여 단독으로 다시 개발한 프로젝트입니다.

###### 폴더 내 db.xlsx를 db에 반드시 등록을 해야합니다.

## 설치 및 실행

### 설치

#### React - `npm install`

#### Django - `pip install -r requirements.txt`

### 실행

#### React - `npm start`

#### Django - `python manage.py runserver`

### [인원]

- 1명

### [사용 기술]

#### * Client
- React.js, TypeScript

#### * Server
- MySQL, Django

### [기존 프로젝트에서 추가로 구현된 기능]

- 최근 조회한 음식점 리스트 사이드바 구현 (local storage)
- 음식점 조회시 조회수 카운팅 구현
- 모범음식점 조회수 top3 차트 및 테이블 구현 (react-table, nivo)
- 로그인 시 사용자 근처 모범음식점 조회수 top3 출력 모달창 구현 (react-modal)

### [폴더 구조]

ModelRestaurant  
├─ Client  
│ ├─ src  
│ │ ├─ @types  
│ │ ├─ assets  
│ │ ├─ components  
│ │ ├─ hook  
│ │ ├─ pages  
│ │ ├─ style  
│ │ └─ util  
└─ Server

### [사용 라이브러리]

`React` `typescript` `react-modal` `react-hook-geolocation` `navermaps` `styled-components` 

### [회고록]
- https://growing-jiwoo.tistory.com/98
