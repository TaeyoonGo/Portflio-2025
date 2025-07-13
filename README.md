# Gulp & GSAP 프로젝트 작업 개요

## 개발환경
- Gulp 환경에서 프론트 작업 진행
- Firebase를 활용하여 웹사이트 배포
- 서버주소 : https://portfolio-2025-8556c.web.app/

## 파일 구조
- dist : 배포용 파일 
- node_modules : Node.js 프로젝트에서 외부에서 다운로드 받은 패키지들을 저장하고 관리
- src : 개발 소스 모음 
  - html : HTML 파일 모음 
  - img : 이미지 파일 모음
  - js : 자바스크립트 파일 모음
  - lottie : 로티파일 모음
  - scss : SCSS 파일모음
  - index.html : 기본 페이지
- .babelrc : babel 환경세팅
- .gitignore 
- gulpfile.babel.js : Gulp 환경 세팅
- package.json : 패키지 모음
- package-lock.json : 패키지 의존성 모음
- README.md : 배포문서

## 사용 라이브러리 
- Gulp : 프론트앤드 빌드를 도와주는 자동화 도구 
- Gsap : 애니메이션 라이브러리
  - ScrollTrigger : 스크롤 위치에 따라 애니메이션을 트리거하고 제어하는 기능
  - SplitText : 텍스트를 단어, 문자 단위로 분리해 세밀한 애니메이션 구현
  - ScrollSmoother : 스크롤 동작을 부드럽게 만들어 사용자 경험 향상
  - ScrollToPlugin : 특정 위치로 부드럽게 스크롤 이동하는 기능
  - ScrambleTextPlugin : 텍스트가 변형되며 전환되는 스크램블 애니메이션 효과
- SCSS : CSS 진처리기
- ImageLoaded : 이미지 로딩 관련 라이브러리
- lottie-web : Lottie 파일을 사용하기 위한 라이브러리

## 이슈 트레킹
- 스크롤 트리거 사용 시 리사이즈 부분 이슈 :
  - Gsap 권장방식 (200ms 후 사이즈에 맞춰서 리사이즈 완료됨)
- Massory-layout Responsive 이슈 :
  - GridCSS로 변환
