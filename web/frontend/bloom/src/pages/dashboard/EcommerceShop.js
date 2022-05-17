import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// @mui
import { Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// Axios
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';
// sections
import {
  ShopProductList,
} from '../../sections/@dashboard/e-commerce/shop';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { themeStretch } = useSettings();
  
  // 1. itemList를 state로 사용하기 위해 선언
  const [itemList, setItemList] = useState([]);

  // 2. 처음 렌더링 될 때 getItemList() 함수를 호출
  useEffect(() => {
    getItemList();
  }, []);

  // 7. itemList 변화를 감지해서 콘솔에 찍어줌! 확인차원에 만듦
  useEffect(() => {
  }, [itemList])

  const getItemList = async () => {
    try {
      // 3. 로컬스토리지에서 user정보를 가져옴
      const user = localStorage.getItem('user');
      if(user != null ) {
        // 4. object인가 string인가를 JSON 형태로 사용하기 위해 파싱해줌(그래야 .access_token 이런식으로 사용 가능)
        const parseUser = JSON.parse(user);
        // 5. api 호출!! 헤더에 access_token을 넣음
        const response = await axios.get(`/api/item?shop_number=${parseUser.shop_number}`, {
          headers : {
            Authorization: parseUser.access_token
          }
        });
        const {data} = response.data;
        // 6. itemList 스테이트에 데이터 셋해줌!
        setItemList(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Page title="ITEMS: Shop">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="상품 목록"
          links={[
            { name: '홈', href: PATH_DASHBOARD.root },
            {
              name: '상품 목록',
            },
            
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.items.new}
            >
              상품 추가
            </Button>
          }
        />
        {/* 8. ShopProductList 컴포넌트에 products라는 이름으로 itemList를 넘겨줌! 뒤에 loading은 itemList가 없는 경우 나타나는 상태 */}
        <ShopProductList products={itemList} loading={!itemList.length} />
      </Container>
    </Page>
  );
}