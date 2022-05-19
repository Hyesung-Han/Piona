```text
└─bloom
    └─src
        └─main
           ├─java
           │  └─com
           │      └─jeans
           │          └─bloom
           │              │  BloomApplication.java
           │              │
           │              ├─api
           │              │  ├─controller       # API사용을 위한 Controller
           │              │  │      AdminController.java        # 관리자 관련 API 
           │              │  │      ItemController.java         # 상품 관련 API
           │              │  │      ReservationController.java  # 예약 관련 API
           │              │  │      ReviewController.java       # 리뷰 관련 API
           │              │  │      SaleController.java         # 정산 관련 API
           │              │  │      UserController.java         # 회원 관련 API
           │              │  │
           │              │  ├─request          # Request DTO
           │              │  │      FormDataReq.java
           │              │  │      ItemFormDataReq.java
           │              │  │      ItemInfoReq.java
           │              │  │      ItemWriteReq.java
           │              │  │      ReservationOrderStatusReq.java
           │              │  │      ReservationStatusReq.java
           │              │  │      ReviewCommentReq.java
           │              │  │      ShopInfoReq.java
           │              │  │      UserLoginPostReq.java
           │              │  │      UserRegiPostReq.java
           │              │  │
           │              │  ├─response         # API 호출 시 리턴을 위한 DTO
           │              │  │      ItemRes.java
           │              │  │      ReservationRes.java
           │              │  │      ReviewRes.java
           │              │  │      SaleRes.java
           │              │  │      ShopRes.java
           │              │  │      UserListRes.java
           │              │  │      UserRes.java
           │              │  │
           │              │  └─service          # API 사용을 위한 Service
           │              │          ItemService.java
           │              │          ItemServiceImpl.java
           │              │          MessageService.java
           │              │          MessageServiceImpl.java
           │              │          ReservationService.java
           │              │          ReservationServiceImpl.java
           │              │          ReviewService.java
           │              │          ReviewServiceImpl.java
           │              │          SaleService.java
           │              │          SaleServiceImpl.java
           │              │          UserService.java
           │              │          UserServiceImpl.java
           │              │
           │              ├─common
           │              │  ├─auth             # AwsS3, Jwt Token관련 설정
           │              │  │      AwsS3Service.java
           │              │  │      BloomUserDetails.java
           │              │  │      BloomUserDetailService.java
           │              │  │      JwtAuthenticationFilter.java
           │              │  │
           │              │  ├─response         # response return 형식 정의
           │              │  │      BaseResponseBody.java
           │              │  │
           │              │  └─util             # Jwt Token 유틸 정의
           │              │          JwtTokenUtil.java
           │              │
           │              ├─config              # 환경 설정 정의
           │              │      AwsS3Config.java
           │              │      CustomBasePathJsonSerializer.java
           │              │      SecurityConfig.java
           │              │      SwaggerConfig.java
           │              │      WebMvcConfig.java
           │              │
           │              └─db
           │                  ├─entity           # 데이터베이스 테이블 세팅
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
           │                  └─repository         # 테이블 사용을 위한 JPA Repository
           │                          CertifiedRepository.java
           │                          ItemRepository.java
           │                          ReservationRepository.java
           │                          ReviewCommentRepository.java
           │                          ReviewRepository.java
           │                          ShopRepository.java
           │                          UserRepository.java
           │
           └─resources
                   application.properties       # key값 정의
                   banner.txt
```
