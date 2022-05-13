import * as Yup from 'yup';
import { sentenceCase } from 'change-case';
import { useLocation, useParams, useNavigate, Link  as RouterLink} from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Button, Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { TabContext, TabList, TabPanel, LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';
import { fData } from '../../utils/formatNumber';
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

export default function EcommerceProductUpdate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { name } = useParams();
  const item_id = name;
  const { product, error, checkout } = useSelector((state) => state.product);
console.log("여기다",item_id)
const [itemDetail, setItemDetail] = useState([]);


const location = useLocation();
  const data = location.state.data; // location으로 데이터에 접근해서 받아온다!
  console.log(data)
  


  
  const defaultValues = {
    item_id: data?.item_id || '',
      shop_number: data?.shop_number || '',
      name: data?.name || '',
      price: data?.price || '' ,
      total_quantity: data?.total_quantity || '',
      description: data?.description || '',
      image_url: data?.image_url || '',
    };
    const currentImageUrl = data?.image_url || '';
    
    const UpdateUserSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
    });
    
    const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  
  
const onSubmit = async (itemInfo) => {
  const { description, image_url, item_id, name, price, total_quantity } = itemInfo;
  console.log("imageURL", image_url);
  console.log("CURRENTimageURL", currentImageUrl);
  const fd = new FormData();
  if(typeof image_url === 'string' || image_url === '') {
    console.log("난 바보야")
    // fd.append('file', null);
  } else {
    console.log("파일있")
    fd.append('file', image_url);
  }
  fd.append('itemInfoReq.description', description);
  fd.append('itemInfoReq.image_url', currentImageUrl);
  fd.append('itemInfoReq.item_id', item_id);
  fd.append('itemInfoReq.name', name);
  fd.append('itemInfoReq.price', price);
  fd.append('itemInfoReq.total_quantity', total_quantity);
  
  try {
    const user = localStorage.getItem('user');
    const parseUser = JSON.parse(user);


    const response = await axios.patch(`/api/item`, fd, { headers: {
        Authorization: parseUser.access_token
    }});
    const { data } = response;
    console.log("data", data);
  } catch (e) {
    console.error(e);
  }
  navigate(PATH_DASHBOARD.eCommerce.shop);
};

const handleDrop = useCallback(
  (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setValue(
        'image_url',
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  },
  [setValue]
);

  const onClickItemDeleteHandler = () => {
    Swal.fire({
      icon: 'warning',
      title: '정말 삭제하시겠습니까?',
      text: '삭제하시면 다시 복구시킬 수 없습니다.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(result => {
        if (result.value) {
            const user = localStorage.getItem('user');
            const parseUser = JSON.parse(user);
            console.log("itemid", item_id);
            axios.delete(`/api/item?item_id=${item_id}`, {
                headers : {
                Authorization: parseUser.access_token
                }
            })
            .then(result => {
            console.log(result);
            })
            .catch(e => {
            console.log('Item delete error', e);
            });
        }
        Swal.fire({
          icon: 'success',
          title: '글이 삭제되었습니다',
        });
        navigate(PATH_DASHBOARD.eCommerce.shop);
    });
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Page title="Ecommerce: Item Details">

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Item Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            {
              name: 'Item/Update',
              href: PATH_DASHBOARD.eCommerce.shop,
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
                <RHFUploadAvatar
                  name="image_url"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
              </Grid> 
              <Grid item xs={0.5}/>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box >
                      <Grid item xs={12} sx={{mb:2, flexDirection: 'row'}}>
                        <Grid>
                          <RHFTextField
                            // id="outlined-name"
                            // size='small'
                            // required="true"
                            name="price"
                            label="가격"
                            // onChange={OnChangeHandler("price")}
                            // defaultValue={itemDetail.price}
                            // style ={{width: '20%'}}
                          />
                        </Grid>
                      </Grid>  
                      <Grid item xs={12} sx={{mb:2, flexDirection: 'row'}}>
                          <RHFTextField
                            // id="outlined-name"
                            // size='small'
                            // defaultValue={itemDetail.total_quantity}
                            // onChange={OnChangeHandler("total_quantity")}
                            name="total_quantity"
                            label="수량"
                            style ={{width: '20%'}}
                            />
                      </Grid>  
                      <Grid item xs={12} sx={{mb:2}}>
                        <RHFTextField 
                          name="description"
                          label="상세정보"
                          // id="outlined-multiline-static"
                          // required="true"
                          multiline
                          rows={6}
                          // onChange={OnChangeHandler("description")}
                          // defaultValue={itemDetail.description}
                          style ={{width: '100%'}}
                        />
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              <Grid textAlign={"center"}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                상품 수정
              </LoadingButton>

              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:minus-fill" />}
                onClick={onClickItemDeleteHandler}
                >
                상품 삭제
              </Button>
            </Grid>
              </Grid>
            </Grid>
          </>
        )}

        {/* {!itemDetail && <SkeletonProduct />} */}

        {/* {error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
    </FormProvider>
  );
}
