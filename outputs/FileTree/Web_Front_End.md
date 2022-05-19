```text
└─bloom
    │  .DS_Store
    │  .env
    │  .eslintignore
    │  .eslintrc
    │  .gitignore
    │  .prettierignore
    │  .prettierrc
    │  config-overrides.js
    │  jsconfig.json
    │  package-lock.json
    │  package.json
    │  README.md
    │  yarn.lock
    │
    ├─.vscode
    │      settings.json
    │
    ├─public
    │  │  .DS_Store
    │  │  index.html
    │  │  manifest.json
    │  │  robots.txt
    │  │  _redirects
    │  │
    │  ├─assets     # 서비스에 사용되는 아이콘, 로고, 이미지, 폰트
    │  │  │  bg_card.png
    │  │  │  bg_gradient.jpeg
    │  │  │  overlay.svg
    │  │  │  piona_logo.png
    │  │  │  placeholder.svg
    │  │  ├─icons
    │  │  │  │  .DS_Store
    │  │  │  ├─flags
    │  │  │  └─navbar
    │  │  └─illustrations
    │  ├─favicon
    │  ├─fonts
    │  └─logo
    │
    └─src
        │  .DS_Store
        │  App.js
        │  config.js
        │  index.js
        │  reportWebVitals.js
        │  service-worker.js
        │  serviceWorkerRegistration.js
        ├─assets
        ├─components
        │  ├─animate
        │  ├─carouselㅤㅤ 
        │  ├─chart
        │  ├─color-utils
        │  ├─hook-form ㅤㅤ
        │  ├─mega-menu
        │  ├─nav-section ㅤㅤ
        │  ├─settings
        │  ├─skeleton ㅤㅤ
        │  ├─table ㅤㅤ 
        │  └─upload ㅤㅤ
        │
        ├─contexts
        ├─guards
        ├─hooks
        ├─layouts
        │  │  LogoOnlyLayout.js
        │  └─dashboard
        │      │  index.js
        │      │
        │      ├─header     # 헤더 설정
        │      │      AccountPopover.js
        │      │      index.js
        │      │
        │      └─navbar	ㅤㅤ# 네비게이션바 설정
        │              CollapseButton.js
        │              NavbarAccount.js
        │              NavbarDocs.js
        │              NavbarHorizontal.js
        │              NavbarVertical.js
        │              NavConfig.js
        │
        ├─locales   # 언어 설정
        │
        ├─pagesㅤㅤ # 화면 구성 페이지
        │  │  .DS_Store
        │  │  ComingSoon.js
        │  │  Maintenance.js
        │  │  Page403.js
        │  │  Page404.js
        │  │  Page500.js
        │  │
        │  ├─auth 
        │  │      Login.js          # 로그인 페이지
        │  │      Register.js	    # 회원가입 페이지
        │  │
        │  └─dashboard
        │          AdminReviewList.js 			        # 리뷰 관리
        │          AdminShopList.js				# 상품 관리
        │          EcommerceProductCreate.js	                # 상품 등록
        │          EcommerceProductDetails.js	                # 상품 상세보기
        │          EcommerceProductUpdate.js	                # 상품 수정 및 삭제
        │          EcommerceShop.js				# 상품 목록
        │          InvoiceList.js				# 예약 관리
        │          PermissionDenied.js
        │          ReviewList.js				# 리뷰 관리
        │          SaleList.js					# 정산 관리
        │          UserAccount.js				# 계정 관리
        │          UserList.js					# 회원관리
        │
        ├─routesㅤㅤ# 경로 설정
        │      index.js
        │      paths.js
        │
        ├─sections
        │  │  .DS_Store
        │  │
        │  ├─@dashboard
        │  │  │  .DS_Store
        │  │  │
        │  │  ├─e-commerceㅤㅤ# 상품 관련
        │  │  │  ├─checkout
        │  │  │  ├─product-details
        │  │  │  ├─product-list
        │  │  │  └─shop
        │  │  │
        │  │  ├─invoiceㅤㅤ# 예약 관련
        │  │  │  │  InvoiceAnalytic.js
        │  │  │  ├─details
        │  │  │  └─list
        │  │  │
        │  │  ├─reviewㅤㅤ# 리뷰 관련
        │  │  │  ├─details
        │  │  │  └─list
        │  │  │
        │  │  ├─saleㅤㅤ# 정산 관련
        │  │  │  ├─details
        │  │  │  │      index.js
        │  │  │  │      SaleStyle.js
        │  │  │  │      SaleToolbar.js
        │  │  │  └─list
        │  │  │          index.js
        │  │  │          SaleTableRow.js
        │  │  │          SaleTableToolbar.js
        │  │  │
        │  │  └─userㅤㅤ# 회원 관련
        │  │      ├─account
        │  │      │      AccountBilling.js
        │  │      │      AccountBillingAddressBook.js
        │  │      │      AccountBillingInvoiceHistory.js
        │  │      │      AccountBillingPaymentMethod.js
        │  │      │      AccountChangePassword.js
        │  │      │      AccountGeneral.js
        │  │      │      AccountNotifications.js
        │  │      │      AccountSocialLinks.js
        │  │      │      index.js
        │  │      │
        │  │      ├─cards
        │  │      │      index.js
        │  │      │      UserCard.js
        │  │      │
        │  │      └─list
        │  │              index.js
        │  │              ShopTableRow.js
        │  │              UserTableRow.js
        │  │              UserTableToolbar.js
        │  │
        │  └─auth
        │      │  AuthFirebaseSocial.js
        │      │
        │      ├─login
        │      │      index.js
        │      │      LoginForm.js
        │      │
        │      └─register
        │              index.js
        │              RegisterForm.js
        │
        ├─theme
        │  └─overrides
        └─utilsㅤㅤ# axios 및 형식 설정
                axios.js
                createAvatar.js
                cssStyles.js
                formatNumber.js
                formatTime.js
                getColorName.js
                getColorPresets.js
                getFileData.js
                getFileFormat.js
                getFontValue.js
                highlight.js
                jwt.js
                mapboxgl.js
                uuidv4.js
```
