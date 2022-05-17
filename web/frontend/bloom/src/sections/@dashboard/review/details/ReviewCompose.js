import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Portal, Divider, Backdrop, IconButton, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Image from '../../../../components/Image';
// utils
import axios from '../../../../utils/axios';
import {RHFTextField, FormProvider } from '../../../../components/hook-form';
import useAuth from '../../../../hooks/useAuth';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------
const THUMB_SIZE = 84;
const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  zIndex: 1999,
  margin: 'auto',
  minHeight: '60%',
  minWidth: '40%',
  maxHeight: '60%',
  maxWidth: '40%',
  outline: 'none',
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  flexDirection: 'column',
  boxShadow: theme.customShadows.z20,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.paper,
}));

// const InputStyle = styled(Input)(({ theme }) => ({
//   padding: theme.spacing(0.5, 3),
//   borderBottom: `solid 1px ${theme.palette.divider}`,
// }));

// ----------------------------------------------------------------------

ReviewCompose.propTypes = {
  row: PropTypes.object,
  image: PropTypes.array,
  isOpenCompose: PropTypes.bool,
  onCloseCompose: PropTypes.func,
  onRedirect: PropTypes.func,
};

export default function ReviewCompose({ row, image, isOpenCompose, onCloseCompose, onRedirect }) {
  const { user } = useAuth();

  // useEffect(() => {

  //   if(row.comment_review !== null) setReviewDetail(row.comment_review);
  //   else setReviewDetail('');
  //   // getReviewDetail();
  //   console.log("rd", row);
  //   console.log("dv",reviewDetail);

  // }, [row]);


  const { review_id, content, score, comment, comment_review } = row;
  const reviewImg = image;

  // const [reviewDetail, setReviewDetail] = useState('');
  // const [reviewImg, setReviewImg] = useState([]);

  const defaultValues = {
    review_comment: '',
  };
  
  const UpdateReviewSchema = Yup.object().shape({
    review_comment: Yup.string().required('답글이 비어있습니다.'),
  });
  
  const methods = useForm({
    resolver: yupResolver(UpdateReviewSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;



  // const getReviewDetail = async () => {
  //   try {
  //     const user = localStorage.getItem('user');
  //     if(user != null){
  //       const parseUser = JSON.parse(user);
  //       const response = await axios.get(`/api/review/${review_id}`, {
  //         headers : {
  //           Authorization: parseUser.access_token
  //         }
  //       })
  //       console.log(response.data);
  //       if(response.data.result === "success"){
  //         setReviewDetail(response.data.data);
  //         if(response.data.data.image_url !== null){
  //           setReviewImg(response.data.data.image_url.split(','));
  //         }else{
  //           setReviewImg([]);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      if(user != null){
        const response = await axios.post(`/api/review`, 
        {
          "content": data.review_comment,
          "review_id": review_id
        },
          {
          headers : {
            Authorization: user.access_token
          }
        });
        if(response.data.result === 'success'){
          handleSuccess();
          // setReviewDetail([]);
          alert("답글 등록이 완료되었습니다.", "success");
        }
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }

  };

  const settings2 = {
    dots: false,
    arrows: false,
    infinite: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: reviewImg > 3 ? 3 : reviewImg,
  };

  const handleClose = () => {
    onCloseCompose();
  };

  const handleSuccess = () => {
    onCloseCompose();
    onRedirect();
  };

  const starFive = () =>{
    const arrStar = [];
    for(let i = 0; i < score; i+=1){
      arrStar.push(<Iconify icon={'ic:star'} color={'gold'} width={24} height={24} />);
    }
    for(let i = 0; i < 5 - score; i +=1){
      arrStar.push(<Iconify icon={'ic:star'} color={'gray'} width={24} height={24} />);
    }
    return arrStar;
  }

  async function alert(msg, icons) {
    await Swal.fire({
      icon: icons,
      title: msg,
    });
  }

  if (!isOpenCompose) {
    return null;
  }
  return (
      
    <Portal>
      <Backdrop open sx={{ zIndex: 1998 }} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RootStyle>
        <Box
          sx={{
            pl: 3,
            pr: 1,
            height: 60,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">리뷰 관리</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClose}>
            <Iconify icon={'eva:close-fill'}  width={20} height={20} />
          </IconButton>
        </Box>

        <Divider />
        {/* <Box sx={{ display: 'grid', rowGap: 2, colGap: 2, gridTemplateRows: { xs: '1fr 1fr 1fr 1fr', sm: '1fr 1fr 1fr 1fr' }, }}> */}
        <Box sx={{ py: 2, px: 3,  display: 'flex', alignItems: 'center' }} >
          <Typography variant="subtitle2" noWrap>별점 : </Typography>
            {starFive()}
        </Box>
        <Box sx={{ py: 2, px: 3, alignItems: 'center' }} >
          <Typography variant="subtitle2" noWrap mb={1}>리뷰</Typography>
          {console.log(reviewImg.length)}
          {reviewImg.length !== 0 ? 
          <Slider {...settings2} >
          {reviewImg.map((img, index) => (
            <Box key={img} sx={{ px: 0.75 }}>
              <Image
                disabledEffect
                alt="thumb image"
                src={img}
                sx={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                }}
              />
            </Box>
          ))}
        </Slider>
        :""}
          <TextField disabled
            sx={{
              width: 1,
              bgcolor: 'background.neutral',
            }}
            multiline
            value={content}
          />
          
          
        </Box>
        <Box sx={{ py: 2, px: 3, alignItems: 'center' }} >
          <Typography variant="subtitle2" noWrap mb={1}>답글</Typography>
          
          {comment ? 
          <TextField disabled
          sx={{
            width: 1,
            bgcolor: 'background.neutral',
          }}
          multiline
          value={comment_review}
        />: 
          <RHFTextField 
          name="review_comment"
          multiline
          />
        }
        
        </Box>
        {comment ? 
          "" : 
          <>
          <Divider />
          <Box sx={{  py: 2, px: 3, alignItems: 'center' }} style={{alignSelf: 'end'}}>
          <LoadingButton fullWidth size="small" type="submit" variant="contained" loading={isSubmitting}>
           답글 등록
           </LoadingButton>
        </Box>
        </>
        }
      </RootStyle>
      </FormProvider>
    </Portal>
  );
}

//--------------------------

