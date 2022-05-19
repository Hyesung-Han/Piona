```text
bloom
└─src
    └─main
       ├─java
       │  └─com
       │      └─jeans
       │          └─bloom
       │              │  BloomApplication.java
       │              │
       │              ├─api
       │              │  ├─controller   # API사용을 위한 Controller
       │              │  │      AlarmController.java    # 알람 관련 API
       │              │  │      CartController.java     # 장바구니 관련 API
       │              │  │      PicnicController.java   # 예약 관련 API 
       │              │  │      ReviewController.java   # 리뷰 관련 API
       │              │  │      ShopController.java     # 상점 관련 API
       │              │  │      UserController.java     # 회원 관련 API
       │              │  │      WishListController.java # 위시리스트 관련 API
       │              │  │
       │              │  ├─request      # Request DTO
       │              │  │      CartListReq.java    
       │              │  │      CartReq.java
       │              │  │      FCMReq.java
       │              │  │      ReservationDetailReq.java
       │              │  │      ReservationReq.java
       │              │  │      ReviewWriteReq.java
       │              │  │      UserLoginPostReq.java
       │              │  │      UserRegiPostReq.java
       │              │  │      WishListReq.java
       │              │  │
       │              │  ├─response     # API 호출 시 리턴을 위한 DTO
       │              │  │      AlarmRes.java
       │              │  │      CartRes.java
       │              │  │      ItemRes.java
       │              │  │      ReservationRes.java
       │              │  │      ReviewDetailRes.java
       │              │  │      ShopRes.java
       │              │  │      UserRes.java
       │              │  │      WishListRes.java
       │              │  │
       │              │  └─service      # API 사용을 위한 Service
       │              │          AlarmService.java
       │              │          AlarmServiceImpl.java
       │              │          CartService.java
       │              │          CartServiceImpl.java
       │              │          FCMService.java
       │              │          FCMServiceImpl.java
       │              │          ItemService.java
       │              │          ItemServiceImpl.java
       │              │          MessageService.java
       │              │          MessageServiceImpl.java
       │              │          PicnicService.java
       │              │          PicnicServiceImpl.java
       │              │          ReviewService.java
       │              │          ReviewServiceImpl.java
       │              │          SearchShopService.java
       │              │          SearchShopServiceImpl.java
       │              │          ShopService.java
       │              │          ShopServiceImpl.java
       │              │          UserService.java
       │              │          UserServiceImpl.java
       │              │          WishListService.java
       │              │          WishListServiceImpl.java
       │              │
       │              ├─common
       │              │  ├─auth     # AwsS3, Jwt Token관련 설정
       │              │  │      AwsS3Service.java
       │              │  │      BloomUserDetails.java
       │              │  │      BloomUserDetailService.java
       │              │  │      JwtAuthenticationFilter.java
       │              │  │
       │              │  ├─response # response return 형식 정의
       │              │  │      BaseResponseBody.java
       │              │  │
       │              │  └─util     # Jwt Token 유틸 정의
       │              │          JwtTokenUtil.java
       │              │
       │              ├─config      # 환경 설정 정의
       │              │      AwsS3Config.java
       │              │      CustomBasePathJsonSerializer.java
       │              │      SecurityConfig.java
       │              │      SwaggerConfig.java
       │              │      WebMvcConfig.java     
       │              │
       │              └─db
       │                  ├─entity      # 데이터베이스 테이블 세팅
       │                  │  │  Alarm.java
       │                  │  │  Cart.java
       │                  │  │  CertificationNum.java
       │                  │  │  Item.java
       │                  │  │  Reservation.java
       │                  │  │  ReservationDetail.java
       │                  │  │  Review.java
       │                  │  │  ReviewComment.java
       │                  │  │  Shop.java
       │                  │  │  User.java
       │                  │  │  WishList.java
       │                  │  │
       │                  │  └─type
       │                  │          OrderStatus.java
       │                  │          StatusType.java
       │                  │          UserCode.java
       │                  │
       │                  └─repository      # 테이블 사용을 위한 JPA Repository
       │                          AlarmRepository.java
       │                          CartRepository.java
       │                          CertifiedRepository.java
       │                          ItemRepository.java
       │                          PicnicRepository.java
       │                          ReservationDetailRepository.java
       │                          ReviewRepository.java
       │                          ShopRepository.java
       │                          UserRepository.java
       │                          WishListRepository.java
       │
       └─resources
           │  application.properties    # key값 정의
           │  banner.txt
           │
           └─firebase                   # firebase 서비스 키
                   firebase_service_key.json

```
