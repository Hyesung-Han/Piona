```tex
│  .buckconfig
│  .eslintrc.js
│  .flowconfig
│  .gitignore
│  .prettierrc.js
│  .ruby-version
│  .watchmanconfig
│  App.js 
│  app.json
│  AppInner.js
│  babel.config.js
│  Gemfile
│  Gemfile.lock
│  index.js
│  metro.config.js
│  package-lock.json
│  package.json
│
├─.bundle
│      config
│
├─android
│  │  build.gradle
│  │  gradle.properties
│  │  gradlew
│  │  gradlew.bat
│  │  settings.gradle
│  │
│  ├─.gradle
│  ├─app
│  │  │  build.gradle
│  │  │  build_defs.bzl
│  │  │  debug.keystore
│  │  │  google-services.json
│  │  │  proguard-rules.pro
│  │  │  _BUCK
│  │  │
│  │  ├─build
│  │  │  ├─generated
│  │  │  │  ├─ap_generated_sources
│  │  │  │  ├─res
│  │  │  │  ├─rncli
│  │  │  │  └─source
│  │  │  ├─intermediates
│  │  │  ├─outputs
│  │  │  │  ├─apk
│  │  │  │  │  └─debug
│  │  │  │  │          app-debug.apk
│  │  │  │  │          output-metadata.json
│  │  │  │  │
│  │  │  │  └─logs
│  │  │  │          manifest-merger-debug-report.txt
│  │  │  │
│  │  │  └─tmp
│  │  │      └─compileDebugJavaWithJavac
│  │  │              previous-compilation-data.bin
│  │  │
│  │  └─src
│  │      ├─debug
│  │      │  │  AndroidManifest.xml
│  │      │  │
│  │      │  └─java
│  │      │      └─com
│  │      │          └─bloom
│  │      │                  ReactNativeFlipper.java
│  │      │
│  │      └─main
│  │          │  AndroidManifest.xml
│  │          │
│  │          ├─java
│  │          ├─jni
│  │          │      Android.mk
│  │          │      MainApplicationModuleProvider.cpp
│  │          │      MainApplicationModuleProvider.h
│  │          │      MainApplicationTurboModuleManagerDelegate.cpp
│  │          │      MainApplicationTurboModuleManagerDelegate.h
│  │          │      MainComponentsRegistry.cpp
│  │          │      MainComponentsRegistry.h
│  │          │      OnLoad.cpp
│  │          │
│  │          └─res
│  └─gradle
│      └─wrapper
│              gradle-wrapper.jar
│              gradle-wrapper.properties
│
├─src
│  ├─assets [앱에서 사용된 이미지]
│  │      Bloom_Logo.png
│  │      Bloom_Splash_2nd.png
│  │      Mainbackground.jpg
│  │      picnic.svg
│  │      select_star.png
│  │      shop.png
│  │      unselect_star.png
│  │
│  ├─components [컴포넌트]
│  │  ├─AlarmCard
│  │  │      index.js					# 알람정보 카드
│  │  │
│  │  ├─CalenderModal
│  │  │      index.js					# 날짜 선택 모달
│  │  │
│  │  ├─CartCard
│  │  │      footer.js					# 장바구니 삭제/가격 및 구매하기 카드
│  │  │      index.js					# 장바구니정보 카드
│  │  │
│  │  ├─DoneCard
│  │  │      index.js					# 예약완료정보 카드
│  │  │
│  │  ├─MenuCard
│  │  │      index.js					# 아이템정보 카드
│  │  │
│  │  ├─PicnicCard
│  │  │      index.js					# 진행중인 예약정보 카드
│  │  │
│  │  ├─ReviewCard
│  │  │      index.js					# 리뷰정보 카드
│  │  │
│  │  ├─ShopCard
│  │  │      index.js					# 가게정보 카드
│  │  │
│  │  ├─SignBtn
│  │  │      index.js					# 로그인/회원가입 버튼
│  │  │
│  │  ├─SignInModal
│  │  │      index.js					# 로그인 모달
│  │  │
│  │  └─SignUpModal
│  │          index.js					# 회원가입 모달
│  │
│  ├─navigations [네비게이션 : Router]
│  │  ├─MyAppNav
│  │  │      index.js					# 로그인시 nav
│  │  │
│  │  └─MyAppNav_Sign
│  │          indes.js					# 비로그인시 nav
│  │
│  ├─pages [페이지]
│  │  ├─Alarm
│  │  │      index.js					# 알람
│  │  │
│  │  ├─Cart
│  │  │      index.js					# 장바구니
│  │  │
│  │  ├─ChangeInfo
│  │  │      index.js					# 내정보수정
│  │  │
│  │  ├─Main
│  │  │      index.js					# 홈
│  │  │
│  │  ├─Map
│  │  │      index.js					# 지도
│  │  │
│  │  ├─MenuDetail
│  │  │      index.js					# 아이템 상세 조회
│  │  │
│  │  ├─MyInfo
│  │  │      index.js					# 내정보 조회
│  │  │
│  │  ├─Picniced
│  │  │      index.js					# 완료된 예약
│  │  │
│  │  ├─Picnicing
│  │  │      index.js					# 진행중인 예약
│  │  │
│  │  ├─PwdCheck
│  │  │      index.js					# 비밀번호확인
│  │  │
│  │  ├─RegisterReview
│  │  │      index.js					# 리뷰등록
│  │  │
│  │  ├─SearchResult
│  │  │      index.js					# 검색결과 [검색/키워드]
│  │  │
│  │  ├─ShopHome
│  │  │      index.js					# 가게홈
│  │  │
│  │  ├─ShopMenu
│  │  │      index.js					# 가게아이템
│  │  │
│  │  ├─ShopReview
│  │  │      index.js					# 가게리뷰
│  │  │
│  │  ├─Sign
│  │  │      index.js					# 로그인/회원가입
│  │  │
│  │  └─WishList
│  │          index.js					# 위시리스트
│  │
│  ├─redux [상태관리]
│  │  ├─slices [리듀서 1조각]
│  │  │      cart.js					# 장바구니
│  │  │      picnic.js					# 예약
│  │  │      shop.js					# 가게
│  │  │      user.js					# 유저
│  │  │
│  │  └─store [저장소]
│  │          index.js
│  │          reducer.js [slice의 집합]
│  │
│  └─utils
│      └─Axios [비동기 처리/API 호출]
│              index.js
│
└─__tests__
        App-test.js
```

