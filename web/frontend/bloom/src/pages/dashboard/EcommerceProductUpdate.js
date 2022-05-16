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
const [itemDetail, setItemDetail] = useState([]);


const location = useLocation();
  const data = location.state.data; // location으로 데이터에 접근해서 받아온다!
  
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
  const fd = new FormData();
  if(typeof image_url === 'string' || image_url === '') {
    // fd.append('file', null);
  } else {
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
  } catch (e) {
    console.error(e);
  }
  navigate(PATH_DASHBOARD.items.list);
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
          title: '아이템이 삭제되었습니다',
        });
        navigate(PATH_DASHBOARD.items.list);
    });
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Page title="ITEMS: Item Update">

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="상품 수정"
          links={[
            { name: '홈', href: PATH_DASHBOARD.root },
            {
              name: '상품 목록',
              href: PATH_DASHBOARD.items.list,
            },
            {
              name: '수정 및 삭제',
            },
          ]}
        />
          <Typography fontSize={30} textAlign={"center"}  marginBottom={10}>{data.name}</Typography>


        {itemDetail && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={5.5}>
                <RHFUploadAvatar
                sx={{width:410, height: 410}}
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
                        <TextField xs={3} style ={{width: '20%'}}
                          sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                  border: "none"
                                }
                              },
                            }}
                          label="가격 (원) : "
                          font-color='black'/>
                          <RHFTextField
                            name="price"
                            label=""
                            style ={{width: '20%'}}
                            sx={{textAlign:'center'}}
                          />
                        </Grid>
                      </Grid>  
                      <Grid item xs={12} sx={{mb:2, flexDirection: 'row'}}>
                      <TextField xs={3} style ={{width: '20%'}}
                          sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                  border: "none"
                                }
                              },
                            }}
                          label="수량 (개)  : "
                          font-color='black'/>
                          <RHFTextField
                            name="total_quantity"
                            label=""
                            style ={{width: '20%'}}
                            />
                      </Grid>  
                      <Grid item xs={12} sx={{mb:2}}>
                      <TextField xs={3} style ={{width: '40%'}}
                          sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                  border: "none"
                                }
                              },
                            }}
                          label="상품 설명"
                          font-color='black'/>
                        <RHFTextField 
                          name="description"
                          label=""
                          multiline
                          rows={6}
                          style ={{width: '80%'}}
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
                onClick={onClickItemDeleteHandler}
                sx={{mr:10, ml:3}}>
                상품 삭제
              </Button>
            </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {/* {!itemDetail && <SkeletonProduct />} */}
      </Container>
    </Page>
    </FormProvider>
  );
}
