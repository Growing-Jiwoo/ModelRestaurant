## [React.js를 활용한 개인 사이드 프로젝트] 사용자 위치 기반 부산 모범음식점 추천 사이트 제작

###### 본 프로젝트는 https://github.com/Growing-Jiwoo/Spring-Boot-Module-Project 링크의

###### 일부 기능을 재활용하여 React.js와 TypeScript를 활용하여 단독으로 다시 개발한 프로젝트입니다.

###### 폴더 내 db.xlsx를 db에 반드시 등록을 해야합니다.

## Installation

## React

`npm install`

## Running the App

## React

`npm start`

## Django

Django 폴더 내 ModelRestaurant으로 진입 후

`python manage.py runserver`

### [인원]

- 1명

### [사용 기술]

React.js, TypeScript, HTML, CSS, MySQL, Django

### [기존 프로젝트에서 추가로 구현된 기능]

- 최근 조회한 음식점 리스트 사이드바 구현 (local storage)
- 음식점 조회시 조회수 카운팅 구현
- 모범음식점 조회수 top3 차트 및 테이블 구현 (react-table, nivo)
- 로그인 시 사용자 근처 모범음식점 조회수 top3 출력 모달창 구현 (react-modal)

### [폴더 구조]

![image](https://user-images.githubusercontent.com/115076308/230529811-fd3bd842-d0b6-4a44-a161-50a7cc04e7ce.png)

- components  
  각 페이지에 출력되는 모든 컴포넌트들이 위치하는 폴더

- commons  
  공통적으로 사용되는 Component들이 위치하는 폴더

- Utils  
  전역에서 공통으로 사용하는 util 함수들이 위치하는 폴더

- Hooks  
  전역에서 공통으로 Custom hooks들이 위치하는 폴더

- Style  
  전역에서 공통으로 사용되는 CSS 파일들이 위치하는 폴더

- Type  
  전역에서 공통으로 사용되는 타입들이 위치하는 폴더

- styled.tsx  
  Components의 각 폴더에 들어있는 styled.tsx 파일은 각 url의 컴포넌트들에 사용되는 style을 모아두는 파일

- ...LayOut.tsx  
  LayOut으로 끝나는 파일은 각 페이지의 자식 컴포넌트 단위를 묶는 부모 컴포넌트(레이아웃) 파일

### [사용 라이브러리]

`@types/navermaps@3.6.1`  
`@types/react-dom@18.0.9`  
`@types/react-js-pagination@3.0.4`  
`@types/react-table@7.7.14`
`@types/react-modal@3.13.1`
`@types/react@18.0.26`  
`@types/styled-components@5.1.26`  
`react-async@10.0.1`  
`react-bootstrap@2.7.0`  
`react-dom@18.2.0`  
`react-hook-geolocation@1.1.0`  
`react-router-dom@6.4.5`  
`react-select@5.7.0`  
`react-table@7.8.0`  
`react-cookie@4.1.1`  
`styled-components@5.3.6`  
`typescript@4.9.4`  
`axios@1.2.2`  
`bootstrap@5.2.3`
