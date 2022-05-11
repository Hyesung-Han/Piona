import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
import axios from '../../../../utils/axios';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral({shop}) {
  const { enqueueSnackbar } = useSnackbar();
  // const { user_id, shop_number, access_token } = JSON.parse(localStorage.getItem("user"));
  const { user } = useAuth();
  const { currentImageUrl } = shop?.image_url || '';

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    shop_number: shop?.shop_number || '',
    name: shop?.name || '',
    zip_code: shop?.zip_code || '',
    address: shop?.address || '',
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
      const { shop_number, address, description, detail_address, hours, image_url, name, tel, url, zip_code } = shopInfo;
      const shop_lng = 0;
      const shop_lat = 0;

      const fd = new FormData();
      if(typeof image_url === 'string') {
        // fd.append('file', null);
      } else {
        console.log("파일있")
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
        console.log(data);
      } catch (e) {
        console.error(e);
      }
      
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // enqueueSnackbar('Update success!');
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
  
  const onClickSearchAddress = () => {
    console.log("주소검색");
    console.log("하위shop", shop);
  };

  // if (shop.length === 0 || !shop) return <>loading중..</>;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
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
                <RHFTextField name="zip_code" label="우편번호" />
                <Button
                  sx={{ml:3}}
                  onClick={()=>onClickSearchAddress()}>주소검색</Button>
              </Box>
              <RHFTextField name="address" label="주소" />
              <RHFTextField name="detail_address" label="상세주소" />
              <RHFTextField name="hours" multiline rows={2} label="영업시간" />
              <RHFTextField name="tel" label="가게 전화번호" />
              <RHFTextField name="url" label="가게 사이트 주소(SNS, 웹사이트 등)" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 2 }}>
              <RHFTextField name="description" multiline rows={4} label="가게 설명" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
