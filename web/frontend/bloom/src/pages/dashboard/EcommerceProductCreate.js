import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';
import { fData } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// Axios
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  
  const defaultValues = {
      name: '',
      price: '' ,
      total_quantity: '',
      description: '',
      image_url: '',
      shop_number: ''
    };
    const currentImageUrl =  '';
    
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
  const { total_quantity, price, name, description, image_url, shop_number } = itemInfo;
  const fd = new FormData();
  if(typeof image_url === 'string' || image_url === '') {
    // console.log("")
  } else {
    fd.append('file', image_url);
  }
  fd.append('totalQuantity', total_quantity);
  fd.append('price', price);
  fd.append('name', name);
  fd.append('description', description);
  fd.append('shopNumber', user.shop_number);

  try {
    const response = await axios.post(`/api/item`, fd, { headers: {
      Authorization: user.access_token
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Page title="ITEMS: Item Details">

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="상품 등록"
          links={[
            { name: '홈', href: PATH_DASHBOARD.root },
            {
              name: '상품 등록',
            },
          ]}
        />
          <Typography fontSize={30} textAlign={"center"} variant="h3" marginBottom={10} gutterBottom/>

        { (
          <>
            <Grid container spacing={2}>
              <Grid item xs={5.5}>
                <Typography color={"gray"} fontSize="12px" textAlign={'center'}>상품 이미지를 등록해주세요.</Typography>
                <RHFUploadAvatar
                sx={{width: 400, height:400, borderRadius: '10%', mt:2}}
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
              </Grid> 
              <Grid item xs={0.5}/>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box >
                      <Grid item xs={12} sx={{mb:2, flexDirection: 'row'}}>
                        <TextField xs={3} style ={{width: '20%'}}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                              "& > fieldset": {
                                border: "none"
                              }
                            },
                          }}
                        label="상품 이름 : "
                        disabled
                        font-color='black'/>
                        <RHFTextField
                          xs={8}
                          name="name"
                          label=""
                          style ={{width: '60%', ml:"1"}}
                        />
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
                        label="가격 : "
                        disabled
                        font-color='black'/>
                          <RHFTextField
                            name="price"
                            label=""
                            style ={{width: '60%'}}
                          />
                        
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
                        label="수량 : "
                        disabled
                        font-color='black'/>
                          <RHFTextField
                            name="total_quantity"
                            label=""
                            style ={{width: '60%'}}
                            />
                      </Grid>  
                      <Grid item xs={12} sx={{mb:2}}>
                        <RHFTextField 
                          name="description"
                          label="상품 설명"
                          multiline
                          rows={6}
                          style ={{width: '80%'}}
                        />
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              <Grid>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting} style={{width:'80%'}}>
                상품 등록
              </LoadingButton>
            </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
    </FormProvider>
  );
}
