import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Button, Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// import { getProducts, filterProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// Axios
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
// sections
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
} from '../../sections/@dashboard/e-commerce/shop';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);
  
  // 1. itemList를 state로 사용하기 위해 선언
  const [itemList, setItemList] = useState([]);

  // const { products, sortBy, filters } = useSelector((state) => state.product);

  // const filteredProducts = applyFilter(products, sortBy, filters);

  // const defaultValues = {
  //   gender: filters.gender,
  //   category: filters.category,
  //   colors: filters.colors,
  //   priceRange: filters.priceRange,
  //   rating: filters.rating,
  // };

  // const methods = useForm({
  //   defaultValues,
  // });

  // const { reset, watch, setValue } = methods;

  // const values = watch();

  // const isDefault =
  //   !values.priceRange &&
  //   !values.rating &&
  //   values.gender.length === 0 &&
  //   values.colors.length === 0 &&
  //   values.category === 'All';

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(filterProducts(values));
  // }, [dispatch, values]);

  // 2. 처음 렌더링 될 때 getItemList() 함수를 호출
  useEffect(() => {
    getItemList();
  }, []);

  // 7. itemList 변화를 감지해서 콘솔에 찍어줌! 확인차원에 만듦
  useEffect(() => {
    console.log("itemList", itemList);
  }, [itemList])

  const getItemList = async () => {
    try {
      // 3. 로컬스토리지에서 user정보를 가져옴
      const user = localStorage.getItem('user');
      if(user != null ) {
        // 4. object인가 string인가를 JSON 형태로 사용하기 위해 파싱해줌(그래야 .access_token 이런식으로 사용 가능)
        const parseUser = JSON.parse(user);
        console.log(parseUser.access_token);
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


  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  // const handleResetFilter = () => {
  //   reset();
  //   handleCloseFilter();
  // };

  // const handleRemoveGender = (value) => {
  //   const newValue = filters.gender.filter((item) => item !== value);
  //   setValue('gender', newValue);
  // };

  // const handleRemoveCategory = () => {
  //   setValue('category', 'All');
  // };

  // const handleRemoveColor = (value) => {
  //   const newValue = filters.colors.filter((item) => item !== value);
  //   setValue('colors', newValue);
  // };

  // const handleRemovePrice = () => {
  //   setValue('priceRange', '');
  // };

  // const handleRemoveRating = () => {
  //   setValue('rating', '');
  // };

  return (
    <Page title="ITEMS: Shop">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Item"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Items',
              href: PATH_DASHBOARD.items.root,
            },
            { name: 'list' },
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


        {/* <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              <ShopFilterSidebar
                onResetAll={handleResetFilter}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
              />
            </FormProvider>

            <ShopProductSort />
          </Stack>
        </Stack> */}

        {/* <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{filteredProducts.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              />
            </>
          )}
        </Stack> */}

        {/* 8. ShopProductList 컴포넌트에 products라는 이름으로 itemList를 넘겨줌! 뒤에 loading은 itemList가 없는 경우 나타나는 상태 */}
        <ShopProductList products={itemList} loading={!itemList.length} />
        {/* <CartWidget /> */}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

// function applyFilter(products, sortBy, filters) {
//   // SORT BY
//   if (sortBy === 'featured') {
//     products = orderBy(products, ['sold'], ['desc']);
//   }
//   if (sortBy === 'newest') {
//     products = orderBy(products, ['createdAt'], ['desc']);
//   }
//   if (sortBy === 'priceDesc') {
//     products = orderBy(products, ['price'], ['desc']);
//   }
//   if (sortBy === 'priceAsc') {
//     products = orderBy(products, ['price'], ['asc']);
//   }
//   // FILTER PRODUCTS
//   if (filters.gender.length > 0) {
//     products = products.filter((product) => filters.gender.includes(product.gender));
//   }
//   if (filters.category !== 'All') {
//     products = products.filter((product) => product.category === filters.category);
//   }
//   if (filters.colors.length > 0) {
//     products = products.filter((product) => product.colors.some((color) => filters.colors.includes(color)));
//   }
//   if (filters.priceRange) {
//     products = products.filter((product) => {
//       if (filters.priceRange === 'below') {
//         return product.price < 25;
//       }
//       if (filters.priceRange === 'between') {
//         return product.price >= 25 && product.price <= 75;
//       }
//       return product.price > 75;
//     });
//   }
//   if (filters.rating) {
//     products = products.filter((product) => {
//       const convertRating = (value) => {
//         if (value === 'up4Star') return 4;
//         if (value === 'up3Star') return 3;
//         if (value === 'up2Star') return 2;
//         return 1;
//       };
//       return product.totalRating > convertRating(filters.rating);
//     });
//   }
//   return products;
// }
