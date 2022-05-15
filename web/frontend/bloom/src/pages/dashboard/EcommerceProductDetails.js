import { sentenceCase } from 'change-case';
import { useParams, useNavigate, Link as RouterLink} from 'react-router-dom';
import { useEffect, useState } from 'react';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Button, Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { TabContext, TabList, TabPanel } from '@mui/lab';
// import Link from 'src/theme/overrides/Link';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// Axios
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Image from '../../components/Image';

// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/e-commerce/product-details';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import EcommerceProductUpdate from './EcommerceProductUpdate';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

export default function EcommerceProductDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  // const item_i = match.params.item_id;
  const { name } = useParams();
  // const params = useParams();
  // const name = params.name;
  const item_id = name;
  const { product, error, checkout } = useSelector((state) => state.product);
  // useEffect(() => {
    //   dispatch(getProduct(name));
    // }, [dispatch, name]);
  
  const [itemDetail, setItemDetail] = useState([]);
  useEffect(() => {
    // console.log(params);
    console.log(item_id);
    getItemDetail();
  }, []);
  
  useEffect(() => {
    console.log("itemDetail", itemDetail);
  }, [itemDetail])

  const getItemDetail = async () => {
    try {
      // 3. 로컬스토리지에서 user정보를 가져옴
      const user = localStorage.getItem('user');
      if(user != null ) {
        // 4. object인가 string인가를 JSON 형태로 사용하기 위해 파싱해줌(그래야 .access_token 이런식으로 사용 가능)
        const parseUser = JSON.parse(user);
        console.log(parseUser.access_token);
        // 5. api 호출!! 헤더에 access_token을 넣음
        const response = await axios.get(`/api/item/${item_id}`, {
          headers : {
            Authorization: parseUser.access_token
          }
        });
        console.log(item_id);
        const data = response.data.data;
        // 6. item 스테이트에 데이터 셋해줌!
        setItemDetail(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleAddCart = (product) => {
    dispatch(addCart(product));
  };
  
  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page title="ITEMS: Item Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Item Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Items',
              href: PATH_DASHBOARD.items.root,
            },
            {
              name: 'detail',
              href: PATH_DASHBOARD.items.list,
            },
            // { name: sentenceCase(name) },
          ]}
        />
          <Typography fontSize={30} textAlign={"center"}  marginBottom={10}>{itemDetail.name}</Typography>

        <CartWidget />

        {itemDetail && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={5.5}>
                <Image alt={itemDetail.image_url} src={itemDetail.image_url}/>
              </Grid> 
              <Grid item xs={0.5}/>
              <Grid item xs={6}>
                <Grid container sx={{mt:5}}>
                  <Grid item xs={12} key={itemDetail.name} >
                    <Box >
                      {/* <Typography variant="subtitle1" gutterBottom>
                        {itemDetail.name}
                      </Typography> */}
                      <Grid item xs={12} sx={{mb:2, flexDirection: 'row'}}>
                        <div>가격 : &nbsp;{itemDetail.price} 원</div>
                      </Grid>  
                      <Grid item xs={12} sx={{mb:2, flexDirection: 'row'}}>
                          남은 수량 : &nbsp;{itemDetail.total_quantity} 개
                      </Grid>  
                      <Grid item xs={12} sx={{mb:2}}>
                        <Typography>
                          {itemDetail.description}
                        </Typography>
                        
                      {/* <TextField
                        helperText=" "
                        id="demo-helper-text-aligned-no-helper"
                        label={itemDetail.price} 
                      />원 */}
                      </Grid>
                      {/* <Typography sx={{ color: 'text.secondary' }}>가격 : {itemDetail.price}원</Typography> */}
                      {/* <Typography sx={{ color: 'text.secondary' }}>남은 수량 : {itemDetail.total_quantity}개</Typography> */}
                      {/* <Typography sx={{ color: 'text.secondary' }}>{itemDetail.description}</Typography> */}
                    </Box>
                  </Grid>
                </Grid>

                  {/* <Image alt={name} src={itemDetail.image_url} ratio="1/1" /> */}
                {/* <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel product={product} />
                </Grid> */}
                {/* <Grid item xs={12} md={6} lg={5}> */}
                  {/* <ProductDetailsSummary */}
                    {/* shop_number={itemDetail.shop_number} */}
                    {/* cart={checkout.cart} */}
                    {/* onAddCart={handleAddCart} */}
                    {/* onGotoStep={handleGotoStep} */}
                  {/* /> */}
                {/* </Grid> */}
              <Grid textAlign={"center"}>
              <RouterLink  to={{
                  pathname: PATH_DASHBOARD.items.update(item_id),
                  // search: "?item_id=item_id",
                  // hash: "#the-hash",
                }}
              state = {{ data: itemDetail }}
              >
                <Button sx={{mr:3}}
                variant="contained"
                startIcon={<Iconify icon="eva:minus-fill" />}>
                  상품 수정 및 삭제
                </Button>
              </RouterLink>


              {/* <Button sx={{mr:3}}
                variant="contained"
                startIcon={<Iconify icon="eva:minus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.items.update(item_id)}
                state={{ data: itemDetail }}
                >
                상품 수정 및 삭제
              </Button> */}
            </Grid>
              </Grid>
            </Grid>

            {/* <Grid container sx={{ my: 8 }}>
                <Grid itemDetail xs={12} md={4} key={itemDetail.name}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {itemDetail.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>가격 : {itemDetail.price}원</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>남은 수량 : {itemDetail.total_quantity}개</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{itemDetail.description}</Typography>
                  </Box>
                </Grid>
            </Grid> */}

            
          
          </>
        )}
        {!itemDetail && <SkeletonProduct />}

        {/* {error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
  );
}
