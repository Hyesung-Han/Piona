-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: k6a201.p.ssafy.io    Database: bloom
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alarm_t`
--

DROP TABLE IF EXISTS `alarm_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm_t` (
  `alarm_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `content` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_check` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`alarm_id`),
  KEY `FK_alarm_userId_idx` (`user_id`),
  CONSTRAINT `FK_alarm_userId` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm_t`
--

LOCK TABLES `alarm_t` WRITE;
/*!40000 ALTER TABLE `alarm_t` DISABLE KEYS */;
INSERT INTO `alarm_t` VALUES (1,'roycmlhj','피크닉 후에 반납을 잊지 마세요!','2022-05-17 03:00:02','Y'),(2,'jeanssowon','오늘은 즐거운 피크닉이 있는 날입니다!','2022-05-17 13:59:30','Y'),(3,'roycmlhj','오늘은 즐거운 피크닉이 있는 날입니다!','2022-05-17 13:59:30','Y'),(4,'roycmlhj','오늘은 즐거운 피크닉이 있는 날입니다!','2022-05-17 13:59:31','Y'),(15,'roycmlhj','피크닉 후에 반납을 잊지 마세요!','2022-05-17 16:20:02','Y'),(16,'roycmlhj','피크닉 후에 반납을 잊지 마세요!','2022-05-17 16:20:02','Y'),(17,'jeanssowon','피크닉 후에 반납을 잊지 마세요!','2022-05-17 16:20:03','Y'),(18,'jeanssowon','피크닉 후에 반납을 잊지 마세요!','2022-05-17 16:20:03','Y'),(19,'jeanssowon','피크닉 후에 반납을 잊지 마세요!','2022-05-17 16:20:03','Y'),(20,'roycmlhj','피크닉 후에 반납을 잊지 마세요!','2022-05-17 18:00:02','Y'),(21,'roycmlhj','피크닉 후에 반납을 잊지 마세요!','2022-05-17 18:00:02','Y'),(22,'jeanssowon','피크닉 후에 반납을 잊지 마세요!','2022-05-17 18:00:03','Y'),(23,'jeanssowon','피크닉 후에 반납을 잊지 마세요!','2022-05-17 18:00:03','Y'),(24,'jeanssowon','피크닉 후에 반납을 잊지 마세요!','2022-05-17 18:00:04','Y'),(25,'test01','오늘은 즐거운 피크닉이 있는 날입니다!','2022-05-18 09:00:01','N'),(26,'test01','피크닉 후에 반납을 잊지 마세요!','2022-05-18 18:00:01','N'),(27,'hanhs','피크닉 후에 반납을 잊지 마세요!','2022-05-18 18:00:02','Y'),(28,'roycmlhj','피크닉 후에 반납을 잊지 마세요!','2022-05-18 18:00:02','Y'),(29,'hanhs','오늘은 즐거운 피크닉이 있는 날입니다!','2022-05-19 13:44:47','Y'),(30,'hanhs','피크닉 후에 반납을 잊지 마세요!','2022-05-19 13:45:02','Y');
/*!40000 ALTER TABLE `alarm_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_t`
--

DROP TABLE IF EXISTS `cart_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_t` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `shop_number` varchar(10) NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `reservation_date` datetime NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `FK_cart_userId_idx` (`user_id`),
  KEY `FK_cart_shopNumber_idx` (`shop_number`),
  KEY `FK_cart_itemId_idx` (`item_id`),
  CONSTRAINT `FK_cart_itemId` FOREIGN KEY (`item_id`) REFERENCES `item_t` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_cart_shopNumber` FOREIGN KEY (`shop_number`) REFERENCES `shop_t` (`shop_number`) ON DELETE CASCADE,
  CONSTRAINT `FK_cart_userId` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_t`
--

LOCK TABLES `cart_t` WRITE;
/*!40000 ALTER TABLE `cart_t` DISABLE KEYS */;
INSERT INTO `cart_t` VALUES (78,'test01','1261879707',15,1,'2022-05-19 16:46:48'),(79,'test01','1261879707',17,1,'2022-05-19 16:46:59'),(80,'test02','1261879707',18,1,'2022-05-20 17:18:56'),(81,'test02','1261879707',23,1,'2022-05-20 17:19:07'),(82,'jeanssowon','1108511913',2,1,'2022-05-18 17:28:31'),(83,'jeanssowon','1108511913',4,1,'2022-05-18 17:28:38');
/*!40000 ALTER TABLE `cart_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certification_t`
--

DROP TABLE IF EXISTS `certification_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certification_t` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(15) NOT NULL,
  `random_num` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certification_t`
--

LOCK TABLES `certification_t` WRITE;
/*!40000 ALTER TABLE `certification_t` DISABLE KEYS */;
INSERT INTO `certification_t` VALUES (1,'01085839612',63391),(2,'01028351342',36979),(3,'010-2835-1342',72800),(4,'01033857507',73636),(5,'01028351342',60019),(6,'01085839612',11916),(7,'01085839612',86457),(8,'01085839612',84001),(9,'01085839612',16839),(10,'01033857507',19881),(11,'01028351342',61242),(12,'01028351342',10733),(13,'01028351342',41530),(14,'01020306995',80974),(15,'01020306995',38943),(16,'01020306995',64967),(17,'01020306995',86212),(18,'01020306995',33032),(19,'01020306995',69033),(20,'01020306995',26528),(21,'01020306995',61677),(22,'01020306995',51051),(23,'01020306995',66689),(24,'01028351342',67006),(25,'01028351342',71143),(26,'01020306995',18782),(27,'01085839612',19288),(28,'01020306995',32264),(29,'01020306995',41081),(30,'01085839612',66620),(31,'01085839612',57183),(32,'01020306995',52814),(33,'01020306995',30525),(34,'01085839612',83140),(35,'01028351342',24662),(36,'01028351342',56401),(37,'01028351342',15936),(38,'01033857507',65392),(39,'01028351342',42944),(40,'01028351342',98829),(41,'01028351342',15040),(42,'01053562594',92797);
/*!40000 ALTER TABLE `certification_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_t`
--

DROP TABLE IF EXISTS `item_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_t` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `shop_number` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `total_quantity` int NOT NULL,
  `description` varchar(1000) NOT NULL,
  `image_url` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `FK_item_shopNumber_idx` (`shop_number`),
  CONSTRAINT `FK_item_shopNumber` FOREIGN KEY (`shop_number`) REFERENCES `shop_t` (`shop_number`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_t`
--

LOCK TABLES `item_t` WRITE;
/*!40000 ALTER TABLE `item_t` DISABLE KEYS */;
INSERT INTO `item_t` VALUES (1,'2198500066','사과 주스 세트',25000,10,'사과 주스 2개, 꽃 10송이, 라탄 바구니, 딸기 샌드위치 2EA, 돗자리로 구성된 세트입니다.','https://piona.s3.ap-northeast-2.amazonaws.com/fc3f047c-d3da-4b01-b9d7-78aec88aeb49.jpg'),(2,'1108511913','멜로우 피크닉 바구니 2인 세트',27000,10,'라틴 바구니, 골드 주전자, 빵, 커피, \r\n디저트(마카롱+마시멜로우), 돗자리 2인세트\r\n선착순 3분께는 비눗방울도 나눠드립니다!!','https://piona.s3.ap-northeast-2.amazonaws.com/a96e0f36-557f-4910-bb1b-28ccc1f7d5b4.jpg'),(3,'2198500066','분홍분홍 세트',20000,10,'블루베리 딸기 스콘 2EA, 마카롱 세트 1EA, 음료수 1EA, 다이어리 세트, 라탄 바구니, 패턴 돗자리로 구성된 세트입니다.','https://piona.s3.ap-northeast-2.amazonaws.com/008667fe-7979-4443-9928-2ecc8ba73d9d.jpg'),(4,'1108511913','컨트리 피크닉 세트',15000,13,'돗자리 + 라틴 바구니 + 꽃(생화) + 음료수 + 비눗방울 (2인) 세트입니다!\r\n* 꽃을 싫어하시는 분들은 미리 말씀해주시면 디저트를 더 챙겨드려요❤','https://piona.s3.ap-northeast-2.amazonaws.com/b083f521-4757-4f27-8b27-455526cd6f71.jpg'),(5,'1108511913','프렌드 피크닉 세트',18000,10,'친구들끼리 부담없이 모여서 즐길 수 있는 아이템으로 구성된 세트 상품입니다! \r\n라틴 바구니 + 꽃다발 + 디저트 + 돗자리 (3~4인 세트)','https://piona.s3.ap-northeast-2.amazonaws.com/d8aa6023-1de4-4c75-87f8-42ad1eab67f7.jpg'),(6,'5018510503','바운스바운스 스피커',5000,20,'심장이 바운스바운스 뛰게 하는 스피커입니다.','https://piona.s3.ap-northeast-2.amazonaws.com/c2c1abb9-181e-4907-9081-dd047c9cbca8.jpg'),(7,'5018510503','초호화 먹보 세트',42000,5,'도넛, 샌드위치, 과일 등등 6인 기준 배부르게 먹을 수 있는 세트입니다. 음식을 남길 시 환경보호금 1만원이 부과됩니다.','https://piona.s3.ap-northeast-2.amazonaws.com/8096f810-aae1-4dde-a04a-5d93123a26fd.jpg'),(8,'1108511913','비치 피크닉 세트',23000,8,'더운 여름날 한강에서 피크닉을 즐기기 좋은 아이템으로 구성된 비치 피크닉 세트입니다!\r\n계절 과일 + 돗자리 + 디저트 + 그릇 (4인 세트)','https://piona.s3.ap-northeast-2.amazonaws.com/722ea0e7-e201-4001-af26-363a51d7b45a.jpg'),(9,'6108542406','핑쿠핑쿠 장미 세트',60000,3,'프러포즈에 딱 알맞은 세트입니다. 분홍 장미 20송이와 라탄바구니, 각종 샴페인, 일회용 카메라로 구성되어 있습니다.','https://piona.s3.ap-northeast-2.amazonaws.com/4af18bf5-5fbe-4b16-a230-83f10e472562.jpg'),(10,'6108542406','패턴 돗자리',5000,25,'Red & White의 적절한 조화를 이룬 이과 감성의 패턴 돗자리입니다.','https://piona.s3.ap-northeast-2.amazonaws.com/d461a984-84dd-4ba9-a5c1-cd37cc945df5.jpg'),(12,'6108542406','큐티뽀쨕 곰돌이 세트',15000,5,'어린아이를 동반한 가족 단위 구성원이 가장 많이 빌리는 세트입니다. 곰돌이 인형, 쿠키 세트, 찻잔 세트로 구성되어 있습니다.','https://piona.s3.ap-northeast-2.amazonaws.com/040a6fe7-7526-47a2-a0db-42e7e7431669.jpg'),(15,'1261879707','하트 커플 세트',24000,12,'아기자기한 상품들과 예쁜 돗자리로 이루어져있는 피크닉 세트입니다!\r\n저희 매장에서 가장 잘 나가는 상품입니다\r\n돗자리 + 거울 + 테이블 + 디저트 + 라틴 바구니 (2인 세트)','https://piona.s3.ap-northeast-2.amazonaws.com/76f5847a-ab88-4e07-977e-ec0c09be1d16.jpg'),(17,'1261879707','미니 스피커',4000,8,'한강에서 스피커를 틀고 조용하게 노래들으면 기분이 얼마나 좋게요~~?\r\n블루투스 연결로 쉽고 가볍고 간편하게 어디서나 음악을 즐기실 수 있습니다!','https://piona.s3.ap-northeast-2.amazonaws.com/32890a9e-04dd-445f-930a-1a9689566591.jpg'),(18,'1261879707','피크닉 파티 세트',36000,2,'우쿠렐레 + 라틴 바구니 + 돗자리 + 그릇 + 디저트 (3~4인세트)\r\n피크닉에 와서 우쿠렐레를 안 친다?! 그럼 피크닉이 아니죠!!\r\n제대로 된 피크닉을 즐겨보세요!','https://piona.s3.ap-northeast-2.amazonaws.com/c954a913-2a93-4aab-8919-b58957ae69f1.jpg'),(21,'1108511913','꽃다발 (생화)',25000,5,'원하시는 꽃으로 커스텀 가능합니다!\r\n참고로 생화이니 그때 그때 상태가 조금씩\r\n다를 수 있으니, 이 점 참고해주세요!','https://piona.s3.ap-northeast-2.amazonaws.com/e5fd982f-9602-42a0-9d0f-9ab31ed7634a.jpg'),(23,'1261879707','방수 피크닉 매트',5000,10,'두가지 사이즈로 넉넉하게 크~게 펼쳐서 앉으실수 있어요\r\n또한 손잡이가 달린 일체형으로\r\n편하게 들고다닐수 있답니다','https://piona.s3.ap-northeast-2.amazonaws.com/d7b47798-3cf0-4a25-b8d9-d93371ead15a.jpg'),(24,'5392000864','클래식 SET',12000,20,'클래식 set 구성\r\n\r\n텐트 + 엠보싱매트 + 담요1개','https://piona.s3.ap-northeast-2.amazonaws.com/0aa720d0-e484-4006-9a17-20d9d93344a0.jfif'),(25,'5392000864','시그니처 SET',17000,15,'시그니처 set 구성\r\n\r\n텐트 + 엠보싱매트 + 테이블 +\r\n피크닉매트 + 웨건(카트)','https://piona.s3.ap-northeast-2.amazonaws.com/2669d1e3-0266-43e2-8555-d5714904b4e7.jfif'),(26,'5392000864','플레이어 SET',20000,15,'플레이어 set 구성\r\n\r\n텐트 + 엠보싱매트 + 테이블 + 담요 + 피크닉매트\r\n+ 스피커 + 삼각대 + 보드게임 택1 + 웨건(카트)','https://piona.s3.ap-northeast-2.amazonaws.com/3790385e-2c3e-4505-9f30-dcb519140244.jfif'),(27,'5392000864','룰라 플레이어 SET',27000,10,'룰라 플레이어\r\n\r\n텐트 + 엠보싱매트 + 테이블 + 담요 + 피크닉매트 + 스피커\r\n삼각대 + 보드게임 + 등받이 의자2개 + 웨건(카트)','https://piona.s3.ap-northeast-2.amazonaws.com/86faba70-3110-417c-be8c-6ccbc32a3b19.jfif'),(28,'5392000864','파라솔 프리미엄 SET',36000,10,'파라솔 프리미엄 set\r\n텐트+엠보싱매트+피크닉매트+담요+삼각대+스피커+보드게임(1ea)+캠핑의자(2ea)+프리미엄 테이블+미니테이블+파라솔+하트거울+꽃+웨건','https://piona.s3.ap-northeast-2.amazonaws.com/99a4d83e-0278-4cc0-878c-5b40843ac8c4.jfif'),(29,'5392000864','둠칫둠칫 SET',15000,20,'둠칫둠칫 set 구성\r\n\r\n피크닉매트 + 엠보싱매트 + 우드테이블 + 담요\r\n+ 웨건(카트)','https://piona.s3.ap-northeast-2.amazonaws.com/801f8e81-1fc2-46c1-b64f-fff13c37887a.jfif'),(30,'4820601896','프렌치 SET',25000,20,'레이스 스몰 바구니 + 베이지 무지 돗자리 + 퍼플 라벤더 다발 + 고무나무 원형 플레이팅 도마 + PC와인잔 2 + 천연펄프접시 2 + 우드커트러리 세트 2 + 디자인 엽서 2','https://piona.s3.ap-northeast-2.amazonaws.com/4eafbeb7-ee92-4417-bcbf-79f4c4601d88.jfif'),(31,'4820601896','내추럴 SET',30000,15,'미니멀 플랫 바구니 + 베이지 무지 돗자리 + 화이트 데이지 다발 + 너도밤나무 플랫 플레이팅 도마 + 타원 라탄 트레이 + 라탄 플레이팅 접시(소) + PC와인잔 2 + 천연펄프접시 2 + 우드커트러리 세트 2 +디자인 엽서 2','https://piona.s3.ap-northeast-2.amazonaws.com/8c969320-d083-43f4-b3bc-8834d0d927b0.jfif'),(32,'4820601896','클래식 SET',35000,10,'엔틱 박공 바구니 + 블루 체크 돗자리 + 옐로우 리시안셔스 다발 + 수아르 정사각 플레이팅 도마 + 엔틱 라탄 트레이 + 아카시아나무 원형 접시 + PC와인잔 2 + 천연펄프접시 2 +우드커트러리 세트 2 + 디자인 엽서 2','https://piona.s3.ap-northeast-2.amazonaws.com/f0be179a-e8a4-4c68-990b-b865de2afd6d.jfif'),(33,'4820601896','러블리 SET',40000,20,'보냉 테이블 바구니 + 옐로우 체크 돗자리 + 살몬 로즈 다발 + 대나무 사각 플레이팅 도마 + 물결 라탄 트레이 + 라탄 플레이팅 접시(소) + 라탄 플레이팅 접시(중) + PC와인잔 3 + 천연펄프접시 3 + 우드커트러리 세트 3 + 디자인 엽서 2','https://piona.s3.ap-northeast-2.amazonaws.com/4665ecf8-48ab-4306-83f8-bb945d4f0d57.jfif'),(34,'3641101103','피크닉바구니 패키지',21000,20,'피크닉바구니 + 위생와인잔 + 엠보싱매트 + 체크돗자리 + 테이블 + 프리미엄 사운드바 스피커 + 웨건(손수레) + 라탄코스터2개 + 플라워 + 플레이팅 도마','https://piona.s3.ap-northeast-2.amazonaws.com/52028549-fcaf-4cba-a0bb-1a1786315bd6.jfif'),(35,'3641101103','테슬파라솔 패키지',23000,20,'텐트 + 테이블 + 엠보싱매트 + 피크닉돗자리 + 프리미엄 사운드바 스피커 + 웨건(손수레) + 의자2개 + 담요2개 + 감성조명 선택3개','https://piona.s3.ap-northeast-2.amazonaws.com/1aef1718-a66c-45a6-af9b-b8c3ee745ad3.jfif'),(36,'3641101103','사장님의 실수 패키지',36000,10,'텐트 + 테이블 + 엠보싱매트 + 피크닉돗자리 + 프리미엄 사운드바 스피커 + 웨건(손수레) + 의자2개 + 에어베개2개 + 담요1개 + 감성조명 선택2개 + 보드게임 + 라탄코스터2 + 감성플라워','https://piona.s3.ap-northeast-2.amazonaws.com/da5960cc-9354-4d37-a6ae-2d4e49baff3b.jfif'),(37,'3641101103','시네마 패키지',39000,11,'빔프로젝터 + 스크린 + 보조배터리 + 테이블 + 엠보싱매트 + 피크닉돗자리 + 프리미엄 사운드바 스피커 + 웨건(손수레) + 의자2개 + 에어베개2개 + 담요 1개','https://piona.s3.ap-northeast-2.amazonaws.com/8a5d64c0-20d4-4f8b-abaa-ca72f76ec37a.jfif'),(38,'3641101103','아케이드패키지',25000,18,'텐트 + 테이블 + 엠보싱매트 + 피크닉돗자리 + 프리미엄 사운드바 스피커 + 웨건(손수레) + 담요2개 + 감성조명 선택1개 + 보드게임선택 1개','https://piona.s3.ap-northeast-2.amazonaws.com/5c530bbb-2279-4f54-99b1-aceeb21e466c.jfif'),(39,'4410901649','쿨 set',35000,11,'웨건(수레)+원터치텐트+쿠션엠보매트+\r\n\r\n피크닉테이블+담요+프리미엄큰테이블+\r\n\r\n피크닉방수돗자리+후레쉬전등+무드등 +\r\n\r\n조명블루투스스피커+캠핑의자2개+\r\n\r\n비취파라솔+쿨러백+아이스팩3개+모기향+\r\n\r\n인싸템어우동양산+해돌이','https://piona.s3.ap-northeast-2.amazonaws.com/926aff66-6a01-46f0-8c36-454429accb2e.jpg'),(40,'4410901649','심 플 set',13000,30,'원터치텐트(3~4인용)+피크닉방수돗자리','https://piona.s3.ap-northeast-2.amazonaws.com/e58497cb-4058-4eaa-bb29-b9913816e9a7.jpg'),(41,'4410901649','뚝섬(게임) set',23000,20,'웨건(수레)+원터치텐트+피크닉테이블+\r\n\r\n쿠션엠보매트+피크닉방수돗자리+담요+\r\n\r\n블루투스스피커+보드게임1종+\r\n\r\n인싸템어우동양산+해돌이','https://piona.s3.ap-northeast-2.amazonaws.com/a4de28b1-c053-4d1f-9c3e-b9953fe10cc2.jpg'),(42,'4410901649',' 낭만 set ',25000,20,'웨건(수레)+원터치텐트+쿠션엠보매트+\r\n\r\n피크닉방수돗자리+피크닉테이블+담요+\r\n\r\n조명블루투스스피커+캠핑의자2개+\r\n\r\n(무드등+후레쉬전등)or\r\n\r\n(베개 2개)or(보드게임1종)+\r\n\r\n인싸템어우동양산+해돌이','https://piona.s3.ap-northeast-2.amazonaws.com/ff0595a2-4d53-4637-baf0-159c3131cba6.jpg'),(43,'4410901649','소풍 set',25000,13,'웨건(수레)+원터치텐트+담요\r\n\r\n조명블루투스스피커+캠핑의자2개+\r\n\r\n프리미엄큰테이블+쿠션엠보매트+\r\n\r\n(피크닉방수돗자리+피크닉테이블)or\r\n\r\n(비취파라솔)or(보드게임1종+가렌더조명)+\r\n\r\n인싸템어우동양산+해돌이','https://piona.s3.ap-northeast-2.amazonaws.com/079ba777-947c-4e52-bf5b-52de52570fbd.jpg'),(44,'4410901649','피크닉 별빛 set',16000,24,'웨건(수레)+쿠션엠보매트+피크닉테이블+\r\n\r\n피크닉방수돗자리+담요+\r\n\r\n무드등+후레쉬전등+미러블루투스스피커+\r\n\r\n가렌더전등+해돌이','https://piona.s3.ap-northeast-2.amazonaws.com/21c5fa4b-6625-4686-898a-37e549400821.jpg'),(45,'2148788737','그늘이되어줄게',35000,17,'원터치텐트+담요+엠보싱매트+웨건(카트)+테이블+<캠핑의자 2개 or 에어베개 2개 or 에어베드 1개>택1','https://piona.s3.ap-northeast-2.amazonaws.com/d205974c-5868-4541-a5a6-9982b443ea34.jfif'),(46,'2148788737','낭만몽땅',30000,20,'원터치텐트+담요+엠보싱매트+웨건(카트)+테이블+<캠핑의자2or에어베드1or에어베개2>택1+가랜드조명+무드등1','https://piona.s3.ap-northeast-2.amazonaws.com/1f801b0e-be98-4ebb-b757-dd61103a9ea6.jfif'),(47,'2148788737','개느님 세트',35000,12,'웨건 + 텐트 + 엠보싱매트 + 강아지펜스 + 테이블+ 담요 + (의자2/배게2/베드 중 택 1)','https://piona.s3.ap-northeast-2.amazonaws.com/6f817af9-8594-4771-b610-1e4e127323fa.jfif'),(48,'2118879575','알록달록 꽃다발',4000,5,'색 별로 고를 수 있는 꽃다발입니다!\r\n조화인 점 참고해주시고 대여 후 꼭 반납 바랍니다!','https://piona.s3.ap-northeast-2.amazonaws.com/a00596e8-39ff-4256-aeb2-17406306b34b.jpg'),(49,'2148788737','인싸세트',35000,20,'캠핑+피크닉의 완전체!\r\n웨건+원터치텐트+엠보싱매트+<캠핑의자2 or 에어베개2 or 에어베드1>+피크닉바구니세트(일회용와인잔2+조화+블루투스스피커+라탄코스터2+우드도마+우드테이블+피크닉매트+선풍기or담요)','https://piona.s3.ap-northeast-2.amazonaws.com/0d684821-b428-43ba-bf14-2156a6ade4d2.jfif'),(50,'2118879575','돗자리 간식 2인세트',18000,3,'파릇파릇한 색의 돗자리와 간단한 간식, 와인(잔 포함)\r\n\r\n날씨 좋은 날 간단하게 피크닉 가기 좋은 세트입니다!','https://piona.s3.ap-northeast-2.amazonaws.com/38372d1b-5753-47b4-8cde-430816cf9845.jpg'),(51,'2148788737','한여름 밤의 꿈',25000,12,'아이스박스와 함께 시원하게 한강에서 맥주!\r\n웨건+아이스박스21L&아이스팩+피크닉매트+가랜드조명+무드등+보드게임+담요\r\n(사전 예약시 테이블 서비스로 드립니다~)','https://piona.s3.ap-northeast-2.amazonaws.com/b79a6ca1-b475-4e50-a95f-2694aa8931f2.jfif'),(52,'2118879575','샴페인 세트',36000,3,'샴페인(잔 포함)과 간단한 과일, 돗자리, 바구니 세트입니다\r\n\r\n2인 전용으로 1인 이상 추가 시 인당 5000원 부가 됩니다!','https://piona.s3.ap-northeast-2.amazonaws.com/970092f2-310f-446f-aac4-aaade4c4e7d9.jpg'),(53,'2118879575','탁자 바구니 2인세트',19000,5,'탁자와 의자, 라틴 바구니 2인 세트','https://piona.s3.ap-northeast-2.amazonaws.com/a67a50a5-b061-4f7c-9e0d-7b5e0ef085f5.jpg'),(54,'4198700807','피크닉 2인세트',17000,3,'라탄 바구니, 흰 천(돗자리 2 인용), 간단한 간식 (과일 제외)','https://piona.s3.ap-northeast-2.amazonaws.com/b79ad5c0-37c0-4466-837c-03bef44be79f.jpg'),(55,'4198700807','인형 탁자 세트(2인)',5,16000,'인형과 라탄 바구니, 돗자리, 접시 (2인) 세트 입니다\r\n','https://piona.s3.ap-northeast-2.amazonaws.com/52dd5df1-8877-48c7-b599-460d067525fb.jpg'),(56,'4198700807','시계는 와치 노래는 뤠디오',4000,3000,'시계 기능과 노래는 라디오로 들을 수 있게 만들어진 상품입니다\r\n대여용이니 꼭 반납 부탁드립니다.','https://piona.s3.ap-northeast-2.amazonaws.com/9eb09b54-4bf7-4008-a39f-992fdaa7c485.jpg'),(57,'1018126409','히아신스 꽃다발',18000,2,'꽃다발은 생화로 이루어져 있으며,\r\n대여가 아닌 구매입니다\r\n이 점 참고해주세요','https://piona.s3.ap-northeast-2.amazonaws.com/36b15f8b-092d-4a28-a4c4-2cbf1174a410.jpg'),(58,'1018126409','실속 세트',8000,14,'돗자리와 바구니로만 이루어져있는 실속 세트입니다!\r\n사진에 포함된 음식들과 접시는 세트 상품이 아닙니다.','https://piona.s3.ap-northeast-2.amazonaws.com/cd88417e-f481-4895-8934-14be56c1d538.jpg'),(59,'1018126409','2인 기본 세트',23000,17,'돗자리 + 바구니 + 접시 + 꽃다발(조화) + 테이블\r\n\r\n사진에 있는 음식들은 미포함 상품입니다.','https://piona.s3.ap-northeast-2.amazonaws.com/edc12fc4-4e97-49e8-8077-0ad9e551336d.jpg'),(62,'2198500066','와치 스피커',4000,8,'시계와 블루투스 스피커의 기능을 한번에 하는 상품입니다!\r\n대여 시 자세한 사용 방법을 알려드리고 있으니,\r\n편하게 예약해주세요!','https://piona.s3.ap-northeast-2.amazonaws.com/84c88f7b-6bc8-4c43-a65c-d14dd9d6bf80.jpg'),(63,'2198500066','뜨개 담요',3000,12,'손수 뜬 담요는 아니지만 그만큼 예쁜 걸 찾기 위해 고생했답니다~!  \r\n한강 근처는 언제나 바람이 많이 불기 때문에 담요가 필수입니다!! 어서 빌려가세요!!','https://piona.s3.ap-northeast-2.amazonaws.com/a95f8e19-0f02-4d66-9fad-8ed70bd61fa2.jpg'),(64,'2198500066','블루투스 스피커',3000,11,'블루투스 스피커입니다. \r\n버튼을 누르면 작동이 시작되니 연속해서 누르지 말아주세요!\r\n자세한 작동 방법은 대여 시 알려드립니다!','https://piona.s3.ap-northeast-2.amazonaws.com/425566b9-d638-4338-848c-4e1d362372c1.jpg'),(65,'2198500066','라탄 실속 세트',13000,5,'천 돗자리와 라탄 바구니, 주전자, 받침대 세트입니다!\r\n2인 전용으로 구성된 상품이며, 3인 이상 사용 시 1인당 3000원씩 추가됩니다! \r\n실속있게 피크닉을 즐겨보세요!','https://piona.s3.ap-northeast-2.amazonaws.com/733738fb-8077-4aec-ab93-2c989ad8c3b7.jpg'),(66,'2198500066','돗자리 (2 - 3인용)',3000,20,'빨간 체크 돗자리와 무지개 돗자리 중 편하게 선택하시면 됩니다!\r\n재고에 따라 원하시는 돗자리가 없을 수도 있다는 점 참고해주시며, 예약 시간과 상관없이 선착순으로 돗자리를 선택하실 수 있습니다!','https://piona.s3.ap-northeast-2.amazonaws.com/3e17720c-6af3-43b2-b990-070716ce63dc.jpg'),(67,'2198500066','큐티 피크닉 세트',25000,6,'돗자리 + 라탄 바구니 + 거울 + 곰인형 + 테이블 + 테이블 보 + 받침대 + 컵(2인)이 포함된 세트입니다\r\n이미지에 나와있는 음식들은 모두 미포함 상품이니 참고해주세요!','https://piona.s3.ap-northeast-2.amazonaws.com/10ed53e5-1f6a-4ad1-b9da-509ca9f881e4.jpg'),(68,'4410901649','돗자리(2 - 3인용)',3000,20,'빨간 체크 돗자리와 무지개색 돗자리 중 대여 시 고르시면 됩니다!\r\n선착순으로 물품이 빠져나가기 때문에 늦게 오시면 원하시는 상품을 받지 못하실 수도 있습니다.','https://piona.s3.ap-northeast-2.amazonaws.com/720bc0fc-69f4-43ce-aeab-be5b1cda4f9c.jpg'),(69,'4410901649','블루투스 스피커',3000,15,'블루투스 스피커 입니다.\r\n자세한 사용 방법은 대여 시 알려드립니다!','https://piona.s3.ap-northeast-2.amazonaws.com/214cc7ea-5ae0-4d5a-8fa1-35656b9bfb90.jpg'),(70,'4410901649','와치 스피커',4000,12,'시계와 블루투스 스피커를 겸비한 상품입니다!\r\n대여 시 사용 방법을 알려드리고 있으니 편하게 예약주세요!','https://piona.s3.ap-northeast-2.amazonaws.com/02351c34-f12e-450d-97fb-0088f420d16f.jpg'),(71,'4410901649','핑크 커플 세트',25000,6,'핑크 돗자리 + 라탄 바구니 + 꽃(조화) + 거울 + 곰돌이 인형 + 테이블(테이블 보 포함) 으로 구성된 세트 상품입니다!','https://piona.s3.ap-northeast-2.amazonaws.com/54dc304c-c3f2-4496-a249-d7f2edf00130.jpg'),(72,'2618123567','조화세트',3000,2,'감성적인 분위기를 더해줄 조화입니다','https://piona.s3.ap-northeast-2.amazonaws.com/9bbcea80-aaa5-49c6-979a-f41b0d9fe056.jpg'),(73,'2618123567','s',1,1,'zz',NULL);
/*!40000 ALTER TABLE `item_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_detail_t`
--

DROP TABLE IF EXISTS `reservation_detail_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_detail_t` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `reservation_date` datetime NOT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `FK_reservation_itemId_idx` (`item_id`),
  KEY `FK_reservation_reservationId_idx` (`reservation_id`),
  CONSTRAINT `FK_reservation_itemId` FOREIGN KEY (`item_id`) REFERENCES `item_t` (`item_id`),
  CONSTRAINT `FK_reservation_reservationId` FOREIGN KEY (`reservation_id`) REFERENCES `reservation_t` (`reservation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_detail_t`
--

LOCK TABLES `reservation_detail_t` WRITE;
/*!40000 ALTER TABLE `reservation_detail_t` DISABLE KEYS */;
INSERT INTO `reservation_detail_t` VALUES (6,3,15,1,'2022-05-17 01:38:37'),(7,3,17,1,'2022-05-17 01:38:44'),(8,4,2,1,'2022-05-17 11:37:48'),(9,4,4,1,'2022-05-17 11:37:54'),(10,5,3,1,'2022-05-17 11:48:06'),(11,7,1,1,'2022-05-17 15:30:17'),(12,9,1,1,'2022-05-17 15:44:29'),(13,11,1,1,'2022-05-17 15:49:00'),(14,15,2,1,'2022-05-18 16:42:30'),(15,15,21,1,'2022-05-18 16:42:42'),(16,21,18,1,'2022-05-20 17:18:56'),(17,21,23,1,'2022-05-20 17:19:07'),(18,22,39,1,'2022-05-17 09:12:48'),(19,23,24,1,'2022-05-17 09:12:48'),(20,23,28,1,'2022-05-17 09:12:48'),(21,24,33,1,'2022-05-17 09:12:48'),(22,25,40,2,'2022-05-17 09:12:48'),(23,26,44,1,'2022-05-17 09:12:48'),(24,27,51,2,'2022-05-17 09:12:48'),(25,28,38,1,'2022-05-17 09:12:48'),(26,28,36,1,'2022-05-17 09:12:48'),(27,29,37,1,'2022-05-17 09:12:48'),(28,30,41,1,'2022-05-18 11:45:46'),(29,30,69,1,'2022-05-18 11:45:53'),(30,31,65,1,'2022-05-18 11:49:25'),(31,31,64,1,'2022-05-18 13:17:13'),(32,32,1,1,'2022-05-18 16:14:13'),(33,33,44,1,'2022-05-19 04:41:08'),(34,33,70,1,'2022-05-19 04:41:08'),(35,33,68,1,'2022-05-19 04:41:08'),(36,34,2,1,'2022-05-20 15:10:02'),(37,34,8,1,'2022-05-20 15:10:07'),(38,35,54,1,'2022-05-20 15:16:03'),(39,35,56,1,'2022-05-20 15:16:08'),(40,36,57,1,'2022-05-20 15:26:25'),(41,36,58,1,'2022-05-20 15:26:29'),(42,36,59,1,'2022-05-20 15:26:36'),(43,37,1,1,'2022-05-20 15:59:15'),(44,37,62,1,'2022-05-20 15:59:21'),(45,38,1,1,'2022-05-20 17:20:08'),(46,38,63,1,'2022-05-20 17:20:17'),(47,39,39,1,'2022-05-20 20:25:16'),(48,39,68,1,'2022-05-20 20:25:26'),(49,40,58,1,'2022-05-20 20:59:07'),(50,40,59,1,'2022-05-20 20:59:12');
/*!40000 ALTER TABLE `reservation_detail_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_t`
--

DROP TABLE IF EXISTS `reservation_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_t` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `shop_number` varchar(10) NOT NULL,
  `total_price` int NOT NULL,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(1) DEFAULT 'R',
  PRIMARY KEY (`reservation_id`),
  KEY `FK_reservation_userId_idx` (`user_id`),
  KEY `FK_reservation_shopNumber_idx` (`shop_number`),
  CONSTRAINT `FK_reservation_shopNumber` FOREIGN KEY (`shop_number`) REFERENCES `shop_t` (`shop_number`),
  CONSTRAINT `FK_reservation_userId` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_t`
--

LOCK TABLES `reservation_t` WRITE;
/*!40000 ALTER TABLE `reservation_t` DISABLE KEYS */;
INSERT INTO `reservation_t` VALUES (3,'jeanssowon','1261879707',28000,'2022-05-17 11:28:45','D'),(4,'roycmlhj','1108511913',42000,'2022-05-17 11:39:10','D'),(5,'roycmlhj','2198500066',20000,'2022-05-17 11:48:19','D'),(7,'jeanssowon','2198500066',25000,'2022-05-17 15:31:10','D'),(9,'jeanssowon','2198500066',25000,'2022-05-17 15:46:42','D'),(11,'jeanssowon','2198500066',25000,'2022-05-17 15:52:26','D'),(15,'test01','1108511913',52000,'2022-05-17 16:45:29','R'),(21,'test02','1261879707',41000,'2022-05-17 17:43:19','R'),(22,'hanhs','4410901649',35000,'2022-05-17 18:23:00','D'),(23,'roycmlhj','5392000864',48000,'2022-05-17 18:25:39','D'),(24,'jeanssowon','4820601896',40000,'2022-05-17 18:26:47','D'),(25,'test01','4410901649',26000,'2022-05-17 18:27:42','D'),(26,'test02','4410901649',16000,'2022-05-17 18:28:00','D'),(27,'danghyuna','2148788737',50000,'2022-05-17 18:33:00','D'),(28,'yongmi','3641101103',61000,'2022-05-17 18:37:20','D'),(29,'kwonowow','3641101103',39000,'2022-05-17 18:38:00','D'),(30,'hanhs','4410901649',26000,'2022-05-18 11:48:32','D'),(31,'hanhs','2198500066',16000,'2022-05-18 13:18:20','D'),(32,'roycmlhj','2198500066',25000,'2022-05-18 16:14:26','R'),(33,'hanhs','4410901649',23000,'2022-05-19 13:43:16','F'),(34,'roycmlhj','1108511913',50000,'2022-05-19 15:10:18','R'),(35,'roycmlhj','4198700807',21000,'2022-05-19 15:16:25','R'),(36,'roycmlhj','1018126409',49000,'2022-05-19 15:26:55','D'),(37,'hanhs','2198500066',29000,'2022-05-19 15:59:46','R'),(38,'hanhs','2198500066',28000,'2022-05-19 17:20:43','R'),(39,'roycmlhj','4410901649',38000,'2022-05-19 20:25:45','R'),(40,'roycmlhj','1018126409',31000,'2022-05-19 20:59:29','D');
/*!40000 ALTER TABLE `reservation_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_comment_t`
--

DROP TABLE IF EXISTS `review_comment_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_comment_t` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `review_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `FK_reviewComment_reviewId_idx` (`review_id`),
  CONSTRAINT `FK_reviewComment_reviewId` FOREIGN KEY (`review_id`) REFERENCES `review_t` (`review_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_comment_t`
--

LOCK TABLES `review_comment_t` WRITE;
/*!40000 ALTER TABLE `review_comment_t` DISABLE KEYS */;
INSERT INTO `review_comment_t` VALUES (1,1,'감사합니다~~!! 다음에도 또 이용해주세요! 사진 너무 예쁘네요ㅎㅎ','2022-05-17 16:10:00'),(2,9,'좋은 리뷰 감사드립니다! 앞으로도 영텐트 더 많이 이용해주세요~~','2022-05-18 10:50:02'),(3,10,'감사합니다! 앞으로도 많이 이용해주세요!','2022-05-18 11:15:35'),(4,4,'이용해주셔서 감사합니다 다음에 또 이용해주세요!!','2022-05-18 11:27:29'),(5,7,'감사하빈다','2022-05-19 16:03:33'),(6,12,'감사합니다','2022-05-19 17:24:07'),(7,15,'치킨 사진은 너무하네요,,, 저희는 음식점이 아닌데ㅠ','2022-05-19 21:47:02'),(8,3,'손님 파손된 물품에 대한 보상을 말씀드렸는데 불친절하다뇨,,, 경찰서에서 봽죠','2022-05-19 21:47:53'),(9,11,'감사합니다~~~~~','2022-05-19 21:48:28'),(10,6,'이게 무슨 내용이죠?... 일단 감사합니다','2022-05-19 21:50:14');
/*!40000 ALTER TABLE `review_comment_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_t`
--

DROP TABLE IF EXISTS `review_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_t` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `image_url` varchar(1500) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `score` int NOT NULL,
  `is_ban` varchar(1) NOT NULL DEFAULT 'N',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `kw_reasonable` varchar(1) DEFAULT 'N',
  `kw_mood` varchar(1) DEFAULT 'N',
  `kw_clean` varchar(1) DEFAULT 'N',
  `kw_adorable` varchar(1) DEFAULT 'N',
  `kw_various` varchar(1) DEFAULT 'N',
  `kw_kind` varchar(1) DEFAULT 'N',
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `review_id_UNIQUE` (`review_id`),
  KEY `FK_review_userId_idx` (`user_id`),
  KEY `FK_review_reservationId_idx` (`reservation_id`),
  CONSTRAINT `FK_review_reservationId` FOREIGN KEY (`reservation_id`) REFERENCES `reservation_t` (`reservation_id`),
  CONSTRAINT `FK_review_userId` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_t`
--

LOCK TABLES `review_t` WRITE;
/*!40000 ALTER TABLE `review_t` DISABLE KEYS */;
INSERT INTO `review_t` VALUES (1,3,'jeanssowon','https://piona.s3.ap-northeast-2.amazonaws.com/896c38cb-cf3b-44a3-a5c7-6f7615e59515.JPEG','다들 BS시그니엘 피크닉하세요~~~ 구성진짜 최고... 다음에도 또 이용할게요  ><\n',5,'N','2022-05-17 16:08:39','Y','N','N','Y','Y','N'),(3,24,'jeanssowon','https://piona.s3.ap-northeast-2.amazonaws.com/4a6157b4-37d8-45f6-9146-2042d2fe2f59.JPEG','깔끔해서 마음에 들었는데 너무 불친절하시네요 ㅜ',2,'Y','2022-05-17 18:35:41','N','N','Y','N','N','N'),(4,27,'danghyuna','https://piona.s3.ap-northeast-2.amazonaws.com/1a5f6c7d-e314-4e00-b568-9e7aac43af56.JPEG','미리 피크닉세트 빌려서 남자친구한테 서프라이즈했는데 완전 성공이에요~~~~~ 너무 좋았습니다.',5,'Y','2022-05-18 10:26:53','N','Y','Y','Y','Y','N'),(5,29,'kwonowow','https://piona.s3.ap-northeast-2.amazonaws.com/7fe85c5c-5c98-46ce-911a-395f9ade2314.JPEG','조금 비싸긴하지만 세트로 빌리니까 편하고 감성피크닉 제대로 한 것 같습니다!!! 뚝섬가면 또 빌릴거에요~~~',4,'N','2022-05-18 10:28:09','N','Y','Y','Y','Y','Y'),(6,28,'yongmi','https://piona.s3.ap-northeast-2.amazonaws.com/9ae3f52d-6ba7-43cd-8213-ce83bb0a6366.JPEG','너무 만족스러우니까 피크닉으로 삼행시하겠습니다\n피 : 피어나 / 크:정말 / 닉: 최고야 ',4,'Y','2022-05-18 10:31:22','Y','Y','Y','N','N','N'),(7,25,'test01','https://piona.s3.ap-northeast-2.amazonaws.com/47410243-2d69-4b5b-96d3-38a7475367ff.JPEG','사실 이런 세트 빌리는거 귀찮아서 은박돗자리 챙기는 편인데 이정도 가격이면 또 빌려쓸 것 같아요',4,'N','2022-05-18 10:32:48','Y','N','N','N','Y','N'),(8,23,'roycmlhj','https://piona.s3.ap-northeast-2.amazonaws.com/86ef60b9-f03e-45df-9cff-bca74f1d45c6.JPEG','소품도 다양해서 친구랑 좋은 추억남기고 사진도 많이 찍었어요! 다음에는 다른 세트로 이용해볼게요! 번창하세요',5,'N','2022-05-18 10:36:21','N','Y','N','Y','Y','N'),(9,26,'test02','https://piona.s3.ap-northeast-2.amazonaws.com/5ae5b9ed-b9fc-4b72-b5fc-b966572ce973.JPEG','한강 피크닉 감성.... 진짜 최곱니다... 영텐트와 함께라면 더 ......최곱니다.....',5,'N','2022-05-18 10:39:00','Y','Y','Y','Y','N','N'),(10,11,'jeanssowon','https://piona.s3.ap-northeast-2.amazonaws.com/8f047b8a-2b8a-42c6-91df-46f9fd3f686d.JPEG','구성이 너무  알차서 세트하나로 점심부터 간식까지 뚝딱! 하고 사진도 이쁘게 많이 찍었어요!!! 대만족!!!!!',5,'N','2022-05-18 11:02:53','N','Y','N','N','Y','N'),(11,4,'roycmlhj','https://piona.s3.ap-northeast-2.amazonaws.com/fb66e3a9-9436-4223-a8a2-96211925e134.JPEG','여기 사장님 진짜 친절하시고 뭐든 더 챙겨주시려고 해서 바구니가 아주 든든했습니다! 물론 감성은 기본이고 소품도 아기자기해서 귀여웠어요',5,'N','2022-05-18 11:04:54','N','Y','N','Y','N','Y'),(12,22,'hanhs','https://piona.s3.ap-northeast-2.amazonaws.com/6774348b-2295-45ac-a81b-2fac1f64ed40.JPEG','재밌어요',4,'Y','2022-05-19 16:00:34','N','Y','N','N','Y','N'),(13,30,'hanhs','https://piona.s3.ap-northeast-2.amazonaws.com/6d77c61b-1266-45a9-a82f-47f8e38c0078.JPEG','감사합니다',4,'N','2022-05-19 17:21:29','N','Y','N','N','Y','N'),(14,36,'roycmlhj','https://piona.s3.ap-northeast-2.amazonaws.com/0c9177e5-d5a0-475f-89d0-563cc16a7b88.JPEG','감사합니다\n',4,'N','2022-05-19 20:26:19','Y','N','N','Y','N','N'),(15,40,'roycmlhj','https://piona.s3.ap-northeast-2.amazonaws.com/e9caad3f-401d-4922-bdf9-f71f5898944d.JPEG','감사합니다',3,'Y','2022-05-19 21:01:20','N','Y','N','N','Y','Y');
/*!40000 ALTER TABLE `review_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_t`
--

DROP TABLE IF EXISTS `shop_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_t` (
  `shop_number` varchar(10) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `hours` varchar(1000) DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `detail_address` varchar(200) DEFAULT NULL,
  `name` varchar(70) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `url` varchar(300) DEFAULT NULL,
  `image_url` varchar(1500) DEFAULT NULL,
  `shop_lng` decimal(10,7) DEFAULT NULL,
  `shop_lat` decimal(10,7) DEFAULT NULL,
  PRIMARY KEY (`shop_number`),
  UNIQUE KEY `shop_number_UNIQUE` (`shop_number`),
  KEY `FK_shop_userId_idx` (`user_id`),
  CONSTRAINT `FK_shop_userId` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_t`
--

LOCK TABLES `shop_t` WRITE;
/*!40000 ALTER TABLE `shop_t` DISABLE KEYS */;
INSERT INTO `shop_t` VALUES ('1018126409','sujin','028462615','휴무일 없음, 09 : 00 ~ 20 : 00',6510,'서울 서초구 잠원로3길 40 (잠원동, 태남홀딩스)','2층','Lunchicken 피크닉','한강 반포 공원 도착 직전에 있는 편의점 씨유 건물 2층입니다.\r\n감성 넘치는 상품들이 가득하니 많은 이용 부탁드립니다.','','https://piona.s3.ap-northeast-2.amazonaws.com/c43ab191-8659-45df-a1c0-0844cf84a515.jpeg',127.0036767,37.5082154),('1018676277','god3','028546213','평일 10 : 00 ~ 19 : 00\r\n주말 09 : 00 ~ 20 : 00',6502,'서울 서초구 신반포로 45 (반포동, 반포아파트)','장미 공원 입구에서 50m 직진','지오디 피크닉','장미공원 입구에서 50m 직진하시면 보입니다\r\n지오디 피크닉 많이 사랑해주세요','','https://piona.s3.ap-northeast-2.amazonaws.com/15a24ed7-ad0a-4b04-8041-9753f457de7d.jpeg',126.9899654,37.5040998),('1102295242','xoem',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1108511913','hanhs4544','023315231','평일 09:00 ~ 18:00\r\n주말 휴무',6500,'서울 서초구 신반포로11길 40 (반포동, 한강공원 반포 안내센터)','한강 공원 반포 피크닉 센터','애성피크닉','반포 한강공원과 가장 가까운 피크닉 센터입니다! \r\n가장 싸고 빠르게, 다양하게 이용하실 수 있습니다!','','https://piona.s3.ap-northeast-2.amazonaws.com/d4b2effa-b35e-458e-9831-242a5100b30f.jpg',126.9927291,37.5077215),('1261879707','kbs','022136485','평일 13:00 ~ 21:00\r\n주말 11:00 ~ 21:00',6503,'서울 서초구 신반포로15길 29 (반포동, 신반포상가)',' 신반포상가 1층 101호','BS시그니엘 피크닉','BS 시그니엘 피크닉입니다\r\n시그니엘 호텔을 오마주하여 그와 걸맞는 최고의 상품들을 자랑합니다.','','https://piona.s3.ap-northeast-2.amazonaws.com/e10ee97b-64ae-4686-ac3a-cdd2c56d2823.jpg',126.9946980,37.5054822),('2118879575','gogo','028546925','평일 11 : 00 ~ 19 : 00\r\n주말 09 : 00 ~ 20 : 00',6547,'서울 서초구 신반포로 100 (반포동, 래미안 퍼스티지 신반포역상가)','지하 1층 103호','2Minus1 Picnic','신반포역 상가 지하 1층에 있습니다.\r\n상품에 포함된 꽃은 모두 생화이며, 드리는 것이니 많이 이용해주세요','','https://piona.s3.ap-northeast-2.amazonaws.com/d50dde88-b18e-403a-934a-09ecdb812dd3.jpg',126.9957048,37.5030869),('2148788737','pc109','02-6080-1090','11:00~23:00 / 주말-토,일,공휴일 : 10:00~23:00',5095,'서울 광진구 자양번영로1길 35 (자양동)','1층 2호','피크닉 109 뚝섬점','워너원,임영웅,이영지,송가인의 힐링스팟\r\n뚝섬 텐트존 1분거리에서 피크닉 받고 편하게 즐기자!\r\n다양한 이벤트와 함께라면 더욱 즐겁다!','http://picnic109ts.modoo.at','https://piona.s3.ap-northeast-2.amazonaws.com/c0f7fe47-a682-4c6b-8340-fcbdd6d231c7.jfif',0.0000000,0.0000000),('2198500066','jjilibbong','010-7777-7777','오전 9:00부터 오후 22:00까지',6589,'서울 서초구 동광로46길 13-5 (반포동, 한강빌리지)','101호 럭키피크닉','럭키피크닉','행운이 가득한 피크닉 세트 대여점입니다~','www.instagram.com/explore/tags/럭키피크닉','https://piona.s3.ap-northeast-2.amazonaws.com/f32931fb-2ede-47ac-8e31-7c95c7a339fd.png',127.0104554,37.5343598),('2618123567','test','010-3131-1788','내맘임 ㅋㅋ',10099,'경기 김포시 걸포1로 10 (걸포동, 오스타파라곤아파트)','니마음속ㅋㅋ','피어나','사실 테스트 계정입니다\r\n','ㅇㅇ','https://piona.s3.ap-northeast-2.amazonaws.com/6f47f8a0-2217-4618-9d00-5a0893c15d7f.jpg',0.0000000,0.0000000),('3641101103','healingtent','070-8802-2406','매일 11:00 - 23:00',5085,'서울 광진구 능동로 25 (자양동)','힐링텐트','힐링텐트 뚝섬점','한강공원 최대규모 프리미엄 텐트 대여점\r\n힐링텐트입니다\r\n\r\n\r\n특별한 추억위한 또하나의 이벤트\r\n\r\n힐링을 선물합니다\r\n힐링에 필요한 모든것을 빌려드립니다','홈페이지 http://healingtent.modoo.at/','https://piona.s3.ap-northeast-2.amazonaws.com/f6f1bd5a-a79f-41f2-a672-9d197c37c271.jfif',127.0675002,37.5336834),('4198700807','jungjun','024685846','평일 09 : 00 ~ 18 : 00\r\n주말 09 : 00 ~ 20 : 00',6510,'서울 서초구 신반포로23길 78 (잠원동, 반포3동주민센터)','반포 3동 주민센터 1층 매장','반포 블루멘 피크닉','반포 3동 주민센터 1층에 위치하였으며, \r\n특별히 반포 3동 주민분들께는 3천원 할인권을 드리니 많은 이용 바랍니다','','https://piona.s3.ap-northeast-2.amazonaws.com/979bd976-a4c1-4640-87a5-0405a224264c.jpg',127.0056289,37.5120925),('4410901649','zerotent','0507-1355-4560','매일 10:00 - 22:00',5096,'서울 광진구 능동로 18 (자양동, 이튼타워리버3차)','1층 119호','뚝섬텐트대여 영텐트 뚝섬점','품질만족!! 가격만족!! 써비스만족!!\r\n\r\n한강피크닉은 가성비좋은 영텐트에서!!\r\n\r\n아무때나 오셔서 픽업 가능합니다.','https://youngtent4560.imweb.me','https://piona.s3.ap-northeast-2.amazonaws.com/9b25f2a3-835a-4949-8b8c-667d467608b6.jpg',127.0681986,37.5327596),('4820601896','sarada11','0507-1341-1652','매일 11:00 ~ 22:00',5702,'서울 송파구 송이로17길 58-18 (가락동)','405호','워니피크닉','\'워니피크닉\'은 프랑스에서 즐기는 피크닉 감성을 그대로 가져온 피크닉웨어 대여 서비스입니다.\r\n\r\n워니피크닉이 제안하는 피크닉웨어로 음식의 맛을 더하고 분위기를 업그레이드시키는 플레이팅을 꾸며보세요.\r\n\r\n피크닉대여는 \'워니피크닉\'으로 간편하고 감성적인 뚝섬피크닉 즐기세요:)','https://www.instagram.com/wonnipicnic','https://piona.s3.ap-northeast-2.amazonaws.com/177fd312-a4bb-4c4d-89a5-f01c3a434a3c.jfif',127.1261915,37.5014015),('5018510503','samdongjun','070-1234-1234','오전 7:00 ~ 오후 21:00',7213,'서울 영등포구 당산로 203 (당산동5가, 데시앙루브오피스텔)','1층','엘레강스꼴','감성피크닉 대여 전문점입니다.','www.instagram.com/explore/tags/엘레강스꼴','https://piona.s3.ap-northeast-2.amazonaws.com/cf980065-11b9-43a1-a351-4e0a4752d759.jpg',126.8999007,37.5323543),('5392000864','thetent','0507-1314-4910','매일 11:00 ~ 22:00',5096,'서울 광진구 뚝섬로34길 67 (자양동, 광진트라팰리스)','104호','뚝섬텐트대여 더텐트 뚝섬점','뚝섬유원지 텐트대여 전문점 더텐트 입니다.\r\n뚝섬텐트대여는 더텐트로 방문하시면 좋아요 ^_^','https://thetenthanriver.modoo.at/','https://piona.s3.ap-northeast-2.amazonaws.com/9f77a558-f9f6-4e14-b14a-29c2f4467dbe.jfif',127.0677745,37.5318554),('6108542406','onehojin','070-7777-7777','24시간 연중무휴',4070,'서울 마포구 양화진2길 8 (합정동)','1층 켈켈피크닉','켈켈피크닉','합정역 7번 출구로 나와서 쭉 직진하시면 한강이 나옵니다 속았지?','www.instagram.com/explore/tags/켈켈피크닉','https://piona.s3.ap-northeast-2.amazonaws.com/d2028a5e-7b92-4226-b5d5-c0c5abdf1983.jpg',0.0000000,0.0000000);
/*!40000 ALTER TABLE `shop_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_t`
--

DROP TABLE IF EXISTS `user_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_t` (
  `user_id` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `is_del` varchar(1) NOT NULL DEFAULT 'N',
  `user_code` varchar(1) NOT NULL DEFAULT 'M',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `access_token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `phone_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `id_UNIQUE` (`user_id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_t`
--

LOCK TABLES `user_t` WRITE;
/*!40000 ALTER TABLE `user_t` DISABLE KEYS */;
INSERT INTO `user_t` VALUES ('danghyuna','$2a$10$7REkqO7xy6PmW4kh9hYFR.TMJiJoi2ga0a6S6QCG98tQmn8DILhy.','당현아','당코치','01048351342','N','M','2022-05-17 18:31:15',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTM5MjQwMTUsImlhdCI6MTY1MjgzNzE1MH0.PO1BJ7wzGaQHxgrnfGs8Pv6sjGzWPHtabAc13zPojCA_laNig1wTOtTFXICQcBYiywwlUHjTLxMe-fEMq8talg','dkmnEymZQ42oyjn9YHPtMv:APA91bF-W1ikQ0DBA9kpYtQpFJQ1iZ0yJtv5Ink2lo8XlHDU6lrg7PnYbPLtk5bgDPf2JKdxW4HDHny4XGkI5pyxDuusOG9vYpfmhDWoLuI5tHGm8NGlP-uaInpzDQkC0ah8zeyadhcg'),('god3','$2a$10$y4O24kZSKHAeID6rkK4xBuX8OZgaODAFlTx/sOh4kYHKH4R4WsAd2','김신삼',NULL,'01085839612','N','S','2022-05-17 17:34:56',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTE0MTksImlhdCI6MTY1Mjk2NDU1NH0.qCmU9_Uf5n41srNhqJmcgSKBniql35RTWBeSI9rsPm9-V6ROXsJinvZ30Z2lk7Y_hU1RH7VtOHv2FgQhDanFow',NULL),('gogo','$2a$10$jodRMNp1N2pXvWIRC5obY.isH0nZkeFoPKa10L6zkkE.fe5Z.KuN2','고주희',NULL,'01085839619','N','S','2022-05-17 17:15:09',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTE0MDcsImlhdCI6MTY1Mjk2NDU0MX0.EDu_bolm-AxVSEUGS6eVihkEXDiGQqJHe_OEfk8tF5zBDjOmZ87dz5BQ-8lGDSIDE5aDs_ncL0RpX4R7XEFL0w',NULL),('hanhs','$2a$10$NVsq6LyKnQs7qDt76bzu7uwxM7FTR6y1VLpYEWCEQHUE.0PPV8LGe','한혜성','김싸피','01028352342','N','M','2022-05-13 23:24:23',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTkzMDMsImlhdCI6MTY1Mjk3MjQzN30.Kbv2usyLOvkJBrlhWqeydSdxFHR9Zp2AWsSPXCwySmYeDnWe4zZTAiKDS_-Nt-2k7tjTr8pv8AMW7M40dp3j_A','dAt635WRSAK1G38Xf4SkT3:APA91bEhLOyjZotbqhJRK1SQHxXzli7D_LlO6HW73Q9WBJN47EBbdgnxYJU0OFG9xUJb9l5I0cBjV7oQRyU7Ia06D5L19jWgbJygxLWfOWlT-cZlDuCtX4-xwhomYvrKJsLiXzlqxv3G'),('hanhs4544','$2a$10$WqUMHSqit3Lq.GH3Zy0DrOGn87vRUOI0Ooycjt5FchxqxqZZeCRkq','한혜성',NULL,'01085839611','N','S','2022-05-13 22:24:57',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTUxMDUsImlhdCI6MTY1Mjk2ODIzOX0.bKDfAux82U22TKMcNGO5MOzT6H--0g4lKEhwzFTCKv7c3i_qhd-QznwWAP_iyHUB7bbwlwGcB2rdCZY2KoJtXg',NULL),('healingtent','$2a$10$26qi/IaZg.ETuvucMkLaPuCKxxUqLBFmQF1S4XG7Li2gpzdW0ZbDi','최힐링',NULL,'01020306993','N','S','2022-05-17 17:15:10',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTE0NTUsImlhdCI6MTY1Mjk2NDU5MH0.fPDi3fj0IM51VupLHdKNO481RKdRDe2kwbJqwzOVf_LCjwUgYHr1uEi1N-XzKd6oSWPAD90jpGXHyhXn_sT8cQ',NULL),('jeanssowon','$2a$10$tJpNhStNonJq/INpbCYLv.U95b6HlOzKIJWdZs0rFDl9cPlzmT/US','최소원','쭈꾸미만두','01029351342','N','M','2022-05-13 23:26:20',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwMTYyOTUsImlhdCI6MTY1MjkyOTQzMH0.5M21A9g3IIgxlGZw3GOWwO0elXHfs0R5t55yG_mifL3Vpmf_IH3d0ZudLqETFcLrwvxV4Fo6bNoctZMIV2Jrtg','dkmnEymZQ42oyjn9YHPtMv:APA91bF-W1ikQ0DBA9kpYtQpFJQ1iZ0yJtv5Ink2lo8XlHDU6lrg7PnYbPLtk5bgDPf2JKdxW4HDHny4XGkI5pyxDuusOG9vYpfmhDWoLuI5tHGm8NGlP-uaInpzDQkC0ah8zeyadhcg'),('jjilibbong','$2a$10$hcsqMnCp0VY1CAttMm/rS.0d9.QMi8y4uVpHW6JQB5BKkO9C.mUgS','한지희',NULL,'01028351345','N','S','2022-05-13 22:26:02',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTUwOTQsImlhdCI6MTY1Mjk2ODIyOH0.QcE_UZa8fY2GrHuGxrc3d9ngLDzEWHYc1j95GBL_ckt0AgfIl30CTZD-ctq8MDafuMQ00mVN4zZ6Im3BOuoVvg',NULL),('junga','$2a$10$UGvUegjz3qdQBXfMfj22ruNcRnKSFGBqZU9qBHOUDcSD4H.x32Lcq','이정아','junga','01011223344','N','A','2022-05-16 22:43:17',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTM5MjYyOTcsImlhdCI6MTY1MjgzOTQzMX0.vmBWcEXKlGsaepP0zeuZLVi-JMYjbU8IO8Mx2X7OV9ytJKqvrOWGDK0zvm8lGABY0_545BR7Ldi88LPzOZxirQ',NULL),('jungjun','$2a$10$RUN4WxJUHc0sN0KdmSUDxu1exbxIT30T8XXeqph1ED3z0AjYQ4P1q','황정준',NULL,'01085839610','N','S','2022-05-17 16:48:44',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTM4NjYxMjAsImlhdCI6MTY1Mjc3OTI1NX0.1v9sNYTXC0cyqErkYKKMY7qPgOVF8Z1jtXuDQJmWEEBciPK4GacQQpRemjwl-sS4-T9phPmFhLRQQpWqC69UfQ',NULL),('kbs','$2a$10$bPtMMrbxbMrCIvqHiyiAveqtkEkVsZBb.b4izzYjGm7i4iILC4fEi','김배승',NULL,'01085839613','N','S','2022-05-13 23:02:12',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTQyMTEsImlhdCI6MTY1Mjk2NzM0NX0.htAmxGD1GJshWS59mN_RJNmGZ7smkMg6_D_lg6JvgOxvKJJC_ELFk34Q1VSl9GoEYbp3YsKy-Y-Xajqr9xr0Cg',NULL),('kwonowow','$2a$10$blOojKGQCdNQaXSHJ15qGeNucgdJiaC4F/XfEyHicfF.dMpgBz9Gy','권오우','권코치','01068351342','N','M','2022-05-17 18:32:31',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTM5MjQxMDgsImlhdCI6MTY1MjgzNzI0M30.mdT34kmKmYTIwAsw_UBRlf0KKl5TGbMU3SyunO4ACvNNDf6qUFUHe9PfKWEmu5BdOi6sDHYUDYZmiUvWFUiBmA',NULL),('onehojin','$2a$10$ewtG0Om6nzkKqg1ejf2WHeBBXYSOt/2z6tAz8Gc42ip5.u2tnAlHu','일호진',NULL,'01028351348','N','S','2022-05-13 22:55:35',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTM1NDAzMjAsImlhdCI6MTY1MjQ1MzQ1NX0.5ZM-Lw6xWG6Fr3qnFCsXlPR7FAVC8ZY51pXZPhxu5yQGIF_t56lejjeI2AlV4dAjUKZ1-rXjH8xcWh59XA6qbQ',NULL),('pc109','$2a$10$T6OPqu7eX3VOqZNoHv.ytOezcTLiesm9QYwmNO9VMkSHJ7KycUr2u','이한나',NULL,'01020306995','N','S','2022-05-17 17:36:54',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTEyMTQsImlhdCI6MTY1Mjk2NDM0OX0.-5CbCZgfhXYKPmGOImS74Es_vP6AGa7oevmKnS2i6F-m0RN4zzOpg71c2HxHIDYXZt9fGr2PGmR5Kn0JbjPK0g',NULL),('roycmlhj','$2a$10$qUd3f14fLV7BslsaQaPAreiKCSzjEBWu.AjWMpLYR7D6BvfTcKHAG','이호진','자루빗','01028351349','N','M','2022-05-13 23:21:48',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNDgzNzYsImlhdCI6MTY1Mjk2MTUxMH0.NAoAv6JbS8k3ndiocrRHIZ36xwUeMK6BdREEWINJ56osfWS_PwvpXWjE3T2r2iTKZ4wvH3oYmqDLgnHgOsK9mw','dWP62piLRQ6qIAdwIVDe5d:APA91bFp_B-2CulOhckXS67cIetF6gUQdfDlEcAVHWaHc9eydUn4C1m6p-3izPxm1XIqEvwufNOAW2pZjH8aTC9xjBlk5XoE_0eEFujNIG6R0jfEYD6zNsY_vqECPimsIiBVjjDplqMg'),('samdongjun','$2a$10$yqNkV7WGvV.rsYVoebOZfOJTrC7HoMUm0X7Fbup1ocjpEF.J.m6Xq','삼동준',NULL,'01028351343','N','S','2022-05-13 22:47:25',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTM1MzY1MjEsImlhdCI6MTY1MjQ0OTY1NX0.tw8YBRWVzlDtLibbGRZJIk_O5Rmxz4oR0RUv39jsD_uOujlG-IGx_Q-gqOMbIRYvWwfVU1Nh9Eh_6P0TKdJmOw',NULL),('sarada11','$2a$10$M4Tr8/2p6.LOE1vOcQXEyeIIL1Bj0eg1m79I/poWrlsNtVAaPvDru','윤텐트',NULL,'01020306991','N','S','2022-05-17 17:05:01',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTEzMDYsImlhdCI6MTY1Mjk2NDQ0MX0.kh-T8Uw_HY5km2HFg_nU_O5dACbziC4pyKLfg-WsLDOPbAli1JSTUE0jO33UVL98vUMLEyPdwczCvAsb0pWQ_A',NULL),('sujin','$2a$10$Fxj9c80GBOeIQspE.lcX6uY7FP.PmFiq5y6tWwLj4nUKQcYA3dtS6','한수진',NULL,'01085839615','N','S','2022-05-17 17:24:57',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTEyNDksImlhdCI6MTY1Mjk2NDM4NH0.y8ApUvEIfNDdYJpg-dzxUvv4HIq08gYFe8_p7Ynf9of7IUF_1_wKBzJYS8koMVKeG8fj4HjViEPSBCY2rekxEA',NULL),('test','$2a$10$jnDSube00c1AZO.4KP1.d.wHkdjphqRnFyZYLJr5Q4oS2/NOoIvNe','테스트',NULL,'01033857507','N','S','2022-05-19 16:45:25',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTkyMzYsImlhdCI6MTY1Mjk3MjM3MX0.OFQN15IQb9KC5bLDROB7CJ7_DuiTFg0GMLnDeTAjGdB7Kp4MNxALy91p7QXD5aIdZoXQWsLt_Q55KfV6-iC5MA',NULL),('test01','$2a$10$h4LVp.jYR2RM4iMWz/llauEFXm16sj70KyjJphCtmwVdjeA5lu7sC','이동준','삼동준','01028152342','N','M','2022-05-17 10:45:40',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTk3ODEsImlhdCI6MTY1Mjk3MjkxNX0.RfP6pEvLeqnv_PPBqB_AhvopBNlxHfmYdFdn8O419Ve4KtqyY3jYvNg0-bII5LKwCGZo_hSo8CSpzu4iPxYIqg','dkmnEymZQ42oyjn9YHPtMv:APA91bF-W1ikQ0DBA9kpYtQpFJQ1iZ0yJtv5Ink2lo8XlHDU6lrg7PnYbPLtk5bgDPf2JKdxW4HDHny4XGkI5pyxDuusOG9vYpfmhDWoLuI5tHGm8NGlP-uaInpzDQkC0ah8zeyadhcg'),('test02','$2a$10$rHf29YNlh5hZpi76QR7ILej3VQKpkZQyq9VeAGSNfwJWPx2iHkNBu','두혜성','두혜성','01038351342','N','M','2022-05-17 10:48:11',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTM5MjQ3MTYsImlhdCI6MTY1MjgzNzg1MH0.hYoRvx2D4gurm9IGCV-CySK_-W7uRRUcBUHm2tbbh1m0vfUqsZFECuEmkw7JRSmsU4omRcPrVjBDOJCL6W6SJg','dkmnEymZQ42oyjn9YHPtMv:APA91bF-W1ikQ0DBA9kpYtQpFJQ1iZ0yJtv5Ink2lo8XlHDU6lrg7PnYbPLtk5bgDPf2JKdxW4HDHny4XGkI5pyxDuusOG9vYpfmhDWoLuI5tHGm8NGlP-uaInpzDQkC0ah8zeyadhcg'),('thetent','$2a$10$e1Kx1z6oyZ2wl.Esg9SbbOxW4yC22WuJUfE6F7GK7stYujBu.h/LS','김자리',NULL,'01020306990','N','S','2022-05-17 16:46:10',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTUxMjEsImlhdCI6MTY1Mjk2ODI1NX0.dD7CoA1-WbfR_9BJyKZatQ19RFREC8iwGosoE5Qpyh7iWHHXjcnFxBEBGuHNlgJThZG4B4L0nfZmLfxgnsT82g',NULL),('xoem','$2a$10$/Bbr59Kd3.QMLSnFb0ZITeaSeUUXneyTCdJ1svPBDk5Eb5HkvDcIi','오윤택',NULL,'01020306997','N','S','2022-05-16 16:01:03',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTE0NDAsImlhdCI6MTY1Mjk2NDU3NH0.4AocQvd8oADYq-1-VS08dunu6ZNcN3q1Xwd8oSH60H3jJYO-WsrRjJ-1A34Myy0zWAa7DEjQaHdFxeJQjDkazg',NULL),('xoem00','$2a$10$6N6cg2P0ZbcHyd7bvGuETeZmaMGcTMqINyYZJeYywUYXhSEV0HNMG','오윤택',NULL,'01020306996','N','A','2022-05-16 11:26:16',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTE0OTIsImlhdCI6MTY1Mjk2NDYyNn0.P7di7Lalt0j9LqDI2ZRDDWESknK313_ngYxfHJQWtMri4ayLSXSIjyenhCnX5LZ8QyaXOGw5MJWU8ZQ7OuVBdw',NULL),('yongmi','$2a$10$HE.pnyYrhEByvbzu7iEouuU6qatUTDs7vSKZYUNDTUY/gRB1TCV42','박용미','박프로','01028351372','N','M','2022-05-17 18:35:13',NULL,NULL,'dkmnEymZQ42oyjn9YHPtMv:APA91bF-W1ikQ0DBA9kpYtQpFJQ1iZ0yJtv5Ink2lo8XlHDU6lrg7PnYbPLtk5bgDPf2JKdxW4HDHny4XGkI5pyxDuusOG9vYpfmhDWoLuI5tHGm8NGlP-uaInpzDQkC0ah8zeyadhcg'),('zerotent','$2a$10$4Tqu1TWpTwrmR4iBIAh3Ley0YXZkEzl07LieptdKUABNYJJN1F.w2','박영뚝',NULL,'01020306988','N','S','2022-05-17 17:27:39',NULL,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NTQwNTUwMzQsImlhdCI6MTY1Mjk2ODE2OH0.2_KmxoAlqs8foZvV09O0rByyjcPQkZOzw3QcAC5eU4ZmDvWH91bQNKuiwPe3zyyAPDCFQP94ts0XXhhMEHIsow',NULL);
/*!40000 ALTER TABLE `user_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist_t`
--

DROP TABLE IF EXISTS `wishlist_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist_t` (
  `wish_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `shop_number` varchar(10) NOT NULL,
  PRIMARY KEY (`wish_id`),
  KEY `FK_wishlist_userId_idx` (`user_id`),
  KEY `FK_wishlist_shopNumber_idx` (`shop_number`),
  CONSTRAINT `FK_wishlist_shopNumber` FOREIGN KEY (`shop_number`) REFERENCES `shop_t` (`shop_number`) ON DELETE CASCADE,
  CONSTRAINT `FK_wishlist_userId` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist_t`
--

LOCK TABLES `wishlist_t` WRITE;
/*!40000 ALTER TABLE `wishlist_t` DISABLE KEYS */;
INSERT INTO `wishlist_t` VALUES (1,'roycmlhj','1108511913'),(4,'jeanssowon','2198500066'),(5,'jeanssowon','1261879707'),(6,'jeanssowon','1108511913'),(7,'jeanssowon','5018510503'),(18,'hanhs','1261879707'),(19,'hanhs','3641101103'),(21,'roycmlhj','1018126409'),(22,'roycmlhj','1261879707');
/*!40000 ALTER TABLE `wishlist_t` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20  0:18:10
