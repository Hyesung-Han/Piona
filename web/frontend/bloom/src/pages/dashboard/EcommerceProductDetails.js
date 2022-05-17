import { useParams, Link as RouterLink} from 'react-router-dom';
import { useEffect, useState } from 'react';

// @mui
import { Button, Box, Grid, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// Axios
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Image from '../../components/Image';

// ----------------------------------------------------------------------

export default function EcommerceProductDetails() {
  const { themeStretch } = useSettings();
  const { name } = useParams();
  const item_id = name;
  const [itemDetail, setItemDetail] = useState([]);
  useEffect(() => {
    getItemDetail();
  }, []);
  
  useEffect(() => {
  }, [itemDetail])

  const getItemDetail = async () => {
    try {
      // 3. 로컬스토리지에서 user정보를 가져옴
      const user = localStorage.getItem('user');
      if(user != null ) {
        // 4. object인가 string인가를 JSON 형태로 사용하기 위해 파싱해줌(그래야 .access_token 이런식으로 사용 가능)
        const parseUser = JSON.parse(user);
        // 5. api 호출!! 헤더에 access_token을 넣음
        const response = await axios.get(`/api/item/${item_id}`, {
          headers : {
            Authorization: parseUser.access_token
          }
        });
        const data = response.data.data;
        // 6. item 스테이트에 데이터 셋해줌!
        setItemDetail(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Page title="ITEMS: Item Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="상품 상세"
          links={[
            { name: '홈', href: PATH_DASHBOARD.root },
            {
              name: '상품 목록',
              href: PATH_DASHBOARD.items.list,
            },
            {
              name: '상품 상세',
              href: PATH_DASHBOARD.items.list,
            },
          ]}
        />
          <Typography fontSize={30} textAlign={"center"}  marginBottom={10}>{itemDetail.name}</Typography>

        {itemDetail && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={5.5} sx={{ml:5}}>
                <Image alt={itemDetail.image_url} src={itemDetail.image_url} sx={{width: 450, height:450, borderRadius: '10%'}}/>
              </Grid> 
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} key={itemDetail.name} >
                    <Box >
                      <Grid item xs={12} sx={{mb:2, flexDirection: 'row', mt:1}}>
                        <TextField xs={3} style ={{width: '20%'}}
                          sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                  border: "none"
                                }
                              },
                            }}
                          label="가격 (원) &nbsp; : "
                          disabled
                          font-color='black'/>
                            <TextField
                              required={false}
                              label=""
                              value={itemDetail.price}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& > fieldset": {
                                    border: "none"
                                  }
                                },
                              }}
                              style ={{width: '20%'}}
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
                          label="수량 (개) &nbsp; : "
                          disabled
                          font-color='black'/>
                            <TextField
                              required={false}
                              value={itemDetail.total_quantity}
                              label=""
                              style ={{width: '20%'}}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& > fieldset": {
                                    border: "none"
                                  }
                                },
                              }}
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
                          <TextField 
                            label=""
                            required={false}
                            multiline
                            rows={6}
                            value={itemDetail.description}
                            style ={{width: '80%'}}
                            
                          />
                        </Grid>
                    </Box>
                  </Grid>
                </Grid>
              <Grid textAlign={"center"}>
              <RouterLink  to={{
                  pathname: PATH_DASHBOARD.items.update(item_id),
                }}
              state = {{ data: itemDetail }}
              style = {{ textDecoration: 'none'}}              
              >
                <Button sx={{mr:10}}
                variant="contained"
                startIcon={<Iconify icon="eva:minus-fill" />}
                >
                  상품 수정 및 삭제
                </Button>
              </RouterLink>
            </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {!itemDetail && <SkeletonProduct />}
      </Container>
    </Page>
  );
}
