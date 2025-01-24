#gulp
## 걸프(Gulp)란?
> Node.js 기반의 웹 개발을 위한 프로세스 자동화 도구 중 하나입니다.
> 주로 퍼블리싱 작업에 사용되며, 작업 흐름을 스트림을 통해 파이프라인으로 연결하여 구성하고
> Gulp는 작업 흐름을 스트림을 통해 파이프라인으로 연결하여 구성하며
> 코드 작성을 단순화하며 생산성을 높일 수 있는 강력한 도구 입니다.

**스트림 -> 전체 데이터 세트를 메모리에 로드할 필요 없이 소스에서 데이터를 읽거나 데이터를 청크 단위로 대상에 쓰는 데 사용되는 Node.js의 핵심 구성 요소**

*해당 작업은 노마드코더 Gulp 강의를 기반으로 최신 버전 커스텀해서 작업*
##### 장점 (구현 완료)
- CSS 진처리기 처리
- JavaScript 최신 문법 지원
- 자바스크립트 번들링 및 최적화
- 이미지 최적화
- HTML 템플릿 처리
- 자동 리로드
- 빌드 시 파일 복사
## Gulp 환경 구현
### Gulp 환경 세팅
- gulp : 프론트앤드 워크플로우 자동화 도구
- del : 빌드 시 build 폴더에 있는 파일 삭제
- gulp-file-include  : HTML에서 include 사용을 위해 적용
- gulp-webserver  : 웹 서버 구동
- gulp-newer : 변경된 이미지 파일만 필터링 해서 통과 -> 빌드 시간 단축
- gulp-imagemin : 이미지 최적화를 수행하는 플러그인
- sass : gulp-sass를 사용하기 위해 사용
- gulp-sass : gulp에서 scss를 사용하기 위해 사용
- gulp-autoprefixer : CSS 크로스 브라우징을 위해 적용
- gulp-csso : CSS Minify 처리 적용
- gulp-bro : 모듈을 번들링 할때 사용
- gulp-babelify : es6 -> es5로 변환 시 사용
### 업데이트 및  이슈 사항
- 강의에서 퍼그를 사용 -> 조금 더 쉬운 HTML을 사용 템플릿을 위해 gulp-include로 대체
- png,jpg 관련 이미지 파일이 랜더링이 안됨 (Gulp5 Issue)
    - 최신 Gulp 이미지 라이브러리 적용
    - 이미지 파일 불러올때 gulp option에서 encoding : false 처리
- del 플러그인 사용 시 동시에 다른작업을 함께 하면 안됨
    - gulp.series -> **순차 실행**
    - gulp.parallel -> **동시 실행**
- SCSS 환경 세팅의 경우 세팅법이 최신 버전 변경
    -  @import 대신에 @forward 적용
- autofix는 버전 세팅을 package.json에 적용
### 아쉬운 점
- 테스트 관련은 적용 해 본적이 없어서 사용 하지는 않았는데 추후에 사용 필요 시 추가 예정
