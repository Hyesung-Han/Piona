import { useEffect, useState } from 'react';
// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  AccountGeneral,
} from '../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { user } = useAuth();
  const [ shop, setShop ] = useState([]);

  useEffect(()=>{
    getShopInfo(user.shop_number);
  }, []);
  const getShopInfo = async (shop_number) => {
    try {
        const response = await axios.get(`/api/user?shop_number=${shop_number}`, {
          headers : {
            Authorization: user.access_token
          }
        })
        const { data } = response;
        setShop(data.data);
      } catch (e) {
        console.error(e);
      }
  };

  const { themeStretch } = useSettings();

  if (shop.length === 0 || !shop) return <>loading중..</>;
  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="정보 수정"
          links={[
            { name: '홈', href: PATH_DASHBOARD.root },
            { name: '내 정보 수정' },
          ]}
        />

        <Box sx={{ mb: 5 }} />

        <AccountGeneral shop={shop}/>
      </Container>
    </Page>
  );
}
