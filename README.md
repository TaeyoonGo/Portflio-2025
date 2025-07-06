# Gulp & GSAP 프로젝트 작업 개요

## 작업예정
- 디테일 애니메이션 작업 진행 (07.10 완료 예정)
- 반응형 작업 진행 (07.20 완료 예정)

## 개발환경
- Gulp 환경에서 작업 진행
- GitPage 배포

## 파일 구조
- dist : 배포용 파일 
- node_modules : Node
- src : 개발용 파일 모음 
  - html 
  - img 
  - js
  - lottie
  - scss
  - index.html
- .babelrc : es6 -> es5로 변환하기 위한 바벨 환경 세팅
- .gitignore
- gulpfile.babel.js : Gulp 환경 세팅
- package.json
- package-lock.json
- README.md

## 사용 라이브러리 
- Gulp : 프론트앤드 빌드를 도와주는 자동화 도구 
- Gsap : 애니메이션 라이브러리
  - ScrollTrigger : Gsap 스크롤 라이브러리
  - SplitText : Gsap 글자를 나눠주는 라이브러리 
  - ScrollToPlugin : Gsap 위치값 관련 라이브러리
  - ScrollSmoother : SmootherScrollbar 도와주는 Gsap 라이브러리
- SCSS : CSS 진처리기
- ImageLoaded : 이미지 로딩 관련 라이브러리
- lottie-web : Lottie 파일을 사용하기 위한 라이브러리
