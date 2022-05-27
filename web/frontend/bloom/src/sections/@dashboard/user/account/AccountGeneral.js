import * as Yup from 'yup';
import { useCallback, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RealAxios from 'axios';
// swal
import Swal from 'sweetalert2';
// @mui
import { Box, Grid, Card, Stack, Typography, Button, Dialog, TextField, DialogActions, DialogContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// daum postcode api
import DaumPostCode from 'react-daum-postcode';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
import axios from '../../../../utils/axios';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral({shop}) {
  // const { user_id, shop_number, access_token } = JSON.parse(localStorage.getItem("user"));
  const { user } = useAuth();
  const [currentImageUrl, setCurrentImageUrl] = useState(shop?.image_url || '');
  const [isOpen, setIsOpen] = useState(false);
  const [zip_code, setZipCode] = useState(shop?.zip_code || '');
  const [address, setAddress] = useState(shop?.address || '');
  const [shop_lng, setShopLng] = useState(0);
  const [shop_lat, setShopLat] = useState(0);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    shop_number: shop?.shop_number || '',
    name: shop?.name || '',
    detail_address: shop?.detail_address || '',
    hours: shop?.hours || '',
    tel: shop?.tel || '',
    url: shop?.url || '',
    description: shop?.description || '',
    image_url: shop?.image_url || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (shopInfo) => {
      const { shop_number, description, detail_address, hours, image_url, name, tel, url } = shopInfo;
      const fd = new FormData();
      if(typeof image_url === 'string' || image_url === '') {
        setCurrentImageUrl('');
      } else {
        fd.append('file', image_url);
      }
      fd.append('shopInfoReq.address', address);
      fd.append('shopInfoReq.description', description);
      fd.append('shopInfoReq.detail_address', detail_address);
      fd.append('shopInfoReq.hours', hours);
      fd.append('shopInfoReq.name', name);
      fd.append('shopInfoReq.tel', tel);
      fd.append('shopInfoReq.url', url);
      fd.append('shopInfoReq.zip_code', zip_code);
      fd.append('shopInfoReq.shop_lat', shop_lat);
      fd.append('shopInfoReq.shop_lng', shop_lng);
      fd.append('shopInfoReq.shop_number', shop_number)
      fd.append('shopInfoReq.image_url', currentImageUrl);
      
      try {
        const response = await axios.patch(`/api/user`, fd, { headers: {
        Authorization: user.access_token
      }});
      const { data } = response;
      if(data.result === 'success') {
        Swal.fire('수정 되었습니다.')
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCoords = async (searchAddress) => {
    try {
      const response = await RealAxios.get(`https://k6a201.p.ssafy.io/api/shop/coords?address=${searchAddress}`,
      {headers : {
        Authorization: user.access_token
      }});
      const {data} = response;
      if(data.result === 'success') {
        const {x, y} = data.data;
        setShopLng(x);
        setShopLat(y);
      }
    } catch(e) {
      console.error('error', e);
    }
   
  }

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

  const openPostCode = () => {
    setIsOpen(true);
  }

  const closePostCode = () => {
    setIsOpen(false);
  }

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        
        setZipCode(data.zonecode);
        setAddress(fullAddress);
    }
      
    getCoords(data.address);
    closePostCode();
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 8, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="image_url"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  파일 형식 *.jpeg, *.jpg, *.png, *.gif
                  <br /> 최대 크기 {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 2,
              }}
            >
              <RHFTextField name="name" label="상호명" />
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 2,
                  colGap: 2,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '2fr 1fr' },
                }}
              >
                <TextField name="zip_code" value={zip_code} placeholder="우편번호" disabled onClick={openPostCode} />
                <Button
                  sx={{ml:3}}
                  onClick={()=>openPostCode()}>주소검색</Button>
              </Box>
              <TextField name="address" value={address} placeholder="주소" disabled onClick={openPostCode} />
              <RHFTextField name="detail_address" label="상세주소" />
              <RHFTextField name="hours" multiline rows={2} label="영업시간" />
              <RHFTextField name="tel" label="가게 전화번호" />
              <RHFTextField name="url" label="가게 사이트 주소(SNS, 웹사이트 등)" />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 2 }}>
              <RHFTextField name="description" multiline rows={4} label="가게 설명" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                정보 수정하기
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={isOpen}
        onClose={closePostCode}
      >
        <DialogContent>
          <DaumPostCode onComplete={handlePostCode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePostCode}>닫기</Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
