# 이젠 돌아갈 때 (Time To Go Home)

군 생활 목표 달성 SNS TODOLIST  
[https://timetogohome.kro.kr](https://timetogohome.kro.kr)

## 프로젝트 소개

군 생활 동안 꾸준히 자기 계발을 하기가 쉽지 않다는 것은 모두가 공감할 것이다. 본 프로젝트는 자기 계발 동안 사용할 TODOLIST를 제공함과 동시에 유용한 TODOLIST를 서로 공유하고 내려받아 사용할 수 있게 함으로써 보다 나은 자기 계발 환경을 제공한다.

## 기능 설명

- 목표별로 TODOLIST를 생성하여 일정 및 완료 여부를 정리할 수 있다.
- 완료한 TODOLIST를 다른 사람들에게 공유할 수 있다.
- 공유된 TODOLIST 중 원하는 것을 내려받아 활용할 수 있다.

## 기대 효과

- 다른 사람들에게 본인의 TODOLIST를 공개하기 위해 더욱 열심히 자기 계발에 임하게 된다.
- 다른 사람들의 TODOLIST를 참고하고 사용함으로써 그들이 구축한 로드맵을 따라갈 수 있다.

## 시장 규모

### 군 장병 수요

- 공군 인트라넷 교양 카페 "휴머니스트" 게시글을 분석해 보면 자기 계발과 관련된 키워드(운동, 피부, 공부, 수능)에 대한 조회수와 댓글수가 상대적으로 높다. 이를 통해 많은 장병들이 자기 계발에 대해 높은 관심을 갖고 있는 것을 확인할 수 있다.

  | 키워드 | 평균 조회수 | 글 개수 | 평균 댓글 수 |
  | ------ | ----------- | ------- | ------------ |
  | 운동   | 3390.6      | 10      | 13.5         |
  | 피부   | 8352.1      | 17      | 25.3         |
  | 공부   | 3442.4      | 18      | 14.2         |
  | 수능   | 2687.2      | 16      | 11.6         |

- 해마다 수많은 사람들이 전역을 한다. 본 서비스를 활용하던 사람은 전역 이후에도 익숙하게 본 서비스를 자기 계발에 활용할 가능성이 높기 때문에 미래 시장 가치가 높다고 볼 수 있다. `(병력현황표, 출처: 병무청 현역입영과)`

  | 년도 | 군인 입영자 수 (명) | 현재 군인 수 (명) |
  | ---- | ------------------- | ----------------- |
  | 2019 | 107,269             | 570,000           |
  | 2020 | 109,371             | 555,000           |
  | 2021 | 97,649              | 540,000           |

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)

- ECMAScript 6 지원 브라우저 사용
- 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used)

### Infra

<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

### Server(back-end)

<img src="https://img.shields.io/badge/node-v16-515151?labelColor=339933&style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/prisma-4C51BF?style=for-the-badge&logo=prisma&logoColor=white"> <img src="https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"> <img src="https://img.shields.io/badge/cloudinary-3448c5?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzIuOCAxMTMuMTgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE0MC4yNSw0MC4yN0E1Ny44NCw1Ny44NCwwLDAsMCw4NS41NiwwLDU2Ljc1LDU2Ljc1LDAsMCwwLDM1LjI0LDI5LjlhNDIuNzksNDIuNzksMCwwLDAtMTAuMzMsODFsMS4wOC41aC4wNlY5OS4yM2EzMS45NSwzMS45NSwwLDAsMSwxMy4zMS01OWwzLS4zMSwxLjMxLTIuNzRBNDYsNDYsMCwwLDEsODUuNTYsMTAuODVhNDYuODMsNDYuODMsMCwwLDEsNDUuMTksMzUuNzlsMSw0LjExLDQuMjMuMDdhMjYuNTYsMjYuNTYsMCwwLDEsMjYsMjYuNDRjMCwxMC4xMS01LjgzLDE4LjM2LTE1LjcyLDIyLjU1djExLjU1bC43MS0uMjRjMTUuOTUtNS4yMSwyNS44Ni0xOC4xOSwyNS44Ni0zMy44NkEzNy40OSwzNy40OSwwLDAsMCwxNDAuMjUsNDAuMjdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjQuNTYsMTEwbDIuMzgsMi4zOGEuNDcuNDcsMCwwLDEtLjM0LjgxSDQ3Ljg0YTguNTMsOC41MywwLDAsMS04LjU0LTguNTNWNjguMTRhLjQ3LjQ3LDAsMCwwLS40Ny0uNDdIMzQuNzZhLjQ4LjQ4LDAsMCwxLS4zNC0uODFMNTAuMzUsNTAuOTRhLjQ2LjQ2LDAsMCwxLC42NywwTDY2Ljk0LDY2Ljg2YS40Ny40NywwLDAsMS0uMzQuODFINjIuNTNhLjQ3LjQ3LDAsMCwwLS40Ny40N1YxMDRBOC41Myw4LjUzLDAsMCwwLDY0LjU2LDExMFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik05OS43NiwxMTBsMi4zOCwyLjM4YS40Ny40NywwLDAsMS0uMzQuODFIODNhOC41Myw4LjUzLDAsMCwxLTguNTQtOC41M1Y3Ny4zMmEuNDcuNDcsMCwwLDAtLjQ3LS40OEg3MGEuNDguNDgsMCwwLDEtLjM0LS44MUw4NS41NSw2MC4xMWEuNDYuNDYsMCwwLDEsLjY3LDBMMTAyLjE0LDc2YS40Ny40NywwLDAsMS0uMzQuODFIOTcuNzNhLjQ3LjQ3LDAsMCwwLS40Ny40OFYxMDRBOC41Myw4LjUzLDAsMCwwLDk5Ljc2LDExMFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMzUsMTEwbDIuMzgsMi4zOGEuNDcuNDcsMCwwLDEtLjMzLjgxSDExOC4yNGE4LjU0LDguNTQsMCwwLDEtOC41NC04LjUzVjg2LjQ5YS40Ny40NywwLDAsMC0uNDctLjQ3aC00LjA3YS40Ny40NywwLDAsMS0uMzMtLjgxbDE1LjkyLTE1LjkzYS40OC40OCwwLDAsMSwuNjcsMGwxNS45MiwxNS45M0EuNDcuNDcsMCwwLDEsMTM3LDg2aC00LjA4YS40Ny40NywwLDAsMC0uNDcuNDdWMTA0QTguNTMsOC41MywwLDAsMCwxMzUsMTEwWiIvPjwvZz48L2c+PC9zdmc+"> <img src="https://img.shields.io/badge/json web tokens-000000?style=for-the-badge&logo=json web tokens&logoColor=white">

### Front-end

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white"> <img src="https://img.shields.io/badge/json web tokens-000000?style=for-the-badge&logo=json web tokens&logoColor=white">

### Utility

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-000000?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white"> <img src="https://img.shields.io/badge/github codespace-515151?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCA4QzAgMy41OCAzLjU4IDAgOCAwQzExLjcyOTMgMCAxNC44NjA3IDIuNTQ4NiAxNS43NDgyIDZIMTIuNzE2NEMxMi41OTk0IDUuNzk0OTIgMTIuNDU5NSA1LjYwNTEzIDEyLjMgNS40M0MxMi4zOCA1LjIzIDEyLjY2IDQuNDEgMTIuMjIgMy4zMUMxMi4yMiAzLjMxIDExLjU1IDMuMDkgMTAuMDIgNC4xM0M5LjM4IDMuOTUgOC43IDMuODYgOC4wMiAzLjg2QzcuMzQgMy44NiA2LjY2IDMuOTUgNi4wMiA0LjEzQzQuNDkgMy4xIDMuODIgMy4zMSAzLjgyIDMuMzFDMy4zOCA0LjQxIDMuNjYgNS4yMyAzLjc0IDUuNDNDMy4yMyA1Ljk5IDIuOTIgNi43MSAyLjkyIDcuNThDMi45MiA5LjcyODkyIDMuODM3MyAxMC43MDkgNSAxMS4xNzE0VjEyLjgwNEM0LjU2MDA3IDEyLjc2ODMgNC4wODQ4MyAxMi41NTMxIDMuNzIgMTEuOTRDMy41NyAxMS43IDMuMTIgMTEuMTEgMi40OSAxMS4xMkMxLjgyIDExLjEzIDIuMjIgMTEuNSAyLjUgMTEuNjVDMi44NCAxMS44NCAzLjIzIDEyLjU1IDMuMzIgMTIuNzhDMy40NDg5NSAxMy4xNDI3IDMuODExNzYgMTMuNzcxNyA1IDEzLjgwODRWMTUuNDE2OEMyLjA2NjggMTQuMjI5NyAwIDExLjM2MzEgMCA4WiIgZmlsbD0iIzI0MjkyRSIvPgo8cGF0aCBkPSJNMTUuNjgxNiA3Ljk3MTY5TDEzLjgyNzIgNy4wNzg4M0MxMy42MTI2IDYuOTc1NDggMTMuMzU2MSA3LjAxOTA4IDEzLjE4NzYgNy4xODc1M0w3LjM2Njk3IDEyLjIyMjVDNy4yMDM2OSAxMi4zNzE0IDcuMjAzODcgMTIuNjI4NSA3LjM2NzM4IDEyLjc3NzFMOC4zNjMyNCAxMy43Mjc5QzguNDk2OTEgMTMuODQ5NCA4LjY5ODIyIDEzLjg1ODQgOC44NDIxNCAxMy43NDkyTDE0LjAwMDEgOS43NUwxNS4yMTU0IDguNDA5NzdDMTUuMzM5OSA4LjI3MjQzIDE1LjQ3OTkgOC4xMDk3IDE1LjY2NDMgOC4xMjg5MUMxNS44NDIyIDguMTQ3NDUgMTYuMDAwMSA4LjI5Mzk2IDE2LjAwMDEgOC41MDAwM1Y4LjQ3ODVDMTYuMDAwMSA4LjI2MjQyIDE1Ljg3NjMgOC4wNjU0MyAxNS42ODE2IDcuOTcxNjlaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CjxwYXRoIGQ9Ik0xNS42ODE2IDE1LjAyODRMMTMuODI3MiAxNS45MjEyQzEzLjYxMjYgMTYuMDI0NiAxMy4zNTYxIDE1Ljk4MSAxMy4xODc2IDE1LjgxMjVMNy4zNjY5NyAxMC4yNzc2QzcuMjAzNjkgMTAuMTI4NyA3LjIwMzg3IDkuODcxNjEgNy4zNjczOCA5LjcyMjk3TDguMzYzMjQgOC43NzIxOEM4LjQ5NjkxIDguNjUwNjYgOC42OTgyMiA4LjY0MTcxIDguODQyMTQgOC43NTA4OUwxNC4wMDAxIDEzLjI1TDE1LjIxNTQgMTQuNTkwM0MxNS4zMzk5IDE0LjcyNzYgMTUuNDc5OSAxNC44OTA0IDE1LjY2NDMgMTQuODcxMkMxNS44NDIzIDE0Ljg1MjYgMTYuMDAwMSAxNC43MDYxIDE2LjAwMDEgMTQuNVYxNC41MjE2QzE2LjAwMDEgMTQuNzM3NyAxNS44NzYzIDE0LjkzNDYgMTUuNjgxNiAxNS4wMjg0WiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyKSIvPgo8cGF0aCBkPSJNMTMuODI3MiAxNS45MjE0QzEzLjYxMjUgMTYuMDI0NyAxMy4zNTYgMTUuOTgxIDEzLjE4NzUgMTUuODEyNUMxMy4zOTUxIDE2LjAyMDEgMTQgMTUuODczMSAxNCAxNS41Nzk1VjcuNDIwNTJDMTQgNy4xMjY5NiAxMy4zOTUxIDYuOTc5OTUgMTMuMTg3NSA3LjE4NzUyQzEzLjM1NiA3LjAxOTA1IDEzLjYxMjUgNi45NzU0IDEzLjgyNzIgNy4wNzg2NUwxNS42ODEzIDcuNzIwMjlDMTUuODc2MSA3LjgxMzk4IDE2IDguMDExMDMgMTYgOC4yMjcyMVYxNC43NzI5QzE2IDE0Ljk4OSAxNS44NzYxIDE1LjE4NjEgMTUuNjgxMyAxNS4yNzk4TDEzLjgyNzIgMTUuOTIxNFoiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcikiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyIiB4MT0iMTEuNjIyNCIgeTE9IjcuMDIzMzIiIHgyPSIxMS42MjI0IiB5Mj0iMTMuODI1NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDE5NkNBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNjVBOSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXIiIHgxPSIxMS42MjI0IiB5MT0iOC42NzQ2NSIgeDI9IjExLjYyMjQiIHkyPSIxNS45NzY4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMUE3REUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA3QUNDIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhciIgeDE9IjE0LjU5MzciIHkxPSI3LjAyMzIyIiB4Mj0iMTQuNTkzNyIgeTI9IjE1Ljk3NjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzJFQzJGNiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxRjlDRjAiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K">

## 설치 안내 (Installation Process)

### Server(back-end)

<details>
<summary>env file example</summary>

```
MYSQL_ROOT_PASSWORD="ROOT_PASSWORD"
DATABASE_URL="mysql://아이디:비밀번호@DB주소:DB포트/Database명"
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
```

</details>

```bash
$ git clone git주소
$ cd WEB_BE
$ docker-compose up -d
```

### Front-end

```bash
$ git clone git주소
$ cd WEB_FE
$ npm install
$ npm run start
```

## 프로젝트 사용법 (Getting Started)

## 팀 정보 (Team Information)

| 성명   | 역할                                                          | Github                                                                                                                                           | e-mail                                                                                                                              |
| ------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 김희권 | Team Leader,<br>Backend(Express),<br>Database(MySQL)          | [<img src="https://img.shields.io/badge/22thking-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/22thking)          | [<img src="https://img.shields.io/badge/kimhee7042@naver.com-white?style=for-the-badge&logo=gmail">](mailto:kimhee7042@naver.com)   |
| 나강건 | Backend(Express),<br>Database(MySQL),<br>Infra(Nginx, Docker) | [<img src="https://img.shields.io/badge/devgeon-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/devgeon)            | [<img src="https://img.shields.io/badge/devgeon.git@gmail.com-white?style=for-the-badge&logo=gmail">](mailto:devgeon.git@gmail.com) |
| 오승우 | Front-end(React)                                              | [<img src="https://img.shields.io/badge/Thinking--bot-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/Thinking-bot) | [<img src="https://img.shields.io/badge/osca5518@naver.com-white?style=for-the-badge&logo=gmail">](mailto:osca5518@naver.com)       |

## 저작권 및 사용권 정보 (Copyleft / End User License)

- [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.
