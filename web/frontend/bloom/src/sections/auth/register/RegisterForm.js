import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// swal
import Swal from 'sweetalert2';
// config
import { HOST_API } from '../../../config';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';// routes
// routes
import { PATH_AUTH } from '../../../routes/paths';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [phoneErrMsg, setPhoneErrMsg] = useState('');

  const [shopNumber, setShopNumber] = useState('');
  const [shopNumberCheck, setShopNumberCheck] = useState(false);
  const [shopNumberErr, setShopNumberErr] = useState(false);
  const [shopNumberErrMsg, setShopNumberErrMsg] = useState('');

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('이름을 입력해주세요'),
    id: Yup.string().required('ID를 입력해주세요'),
    password: Yup.string().required('비밀번호를 입력해 주세요'),
    passwordCheck: Yup.string().oneOf([Yup.ref("password"), null], '비밀번호가 일치하지 않습니다').required('비밀번호를 입력해 주세요'),
  });

  const defaultValues = {
    name: '',
    id: '',
    password: '',
    passwordCheck: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    if(!phoneCheck) {
      setPhoneErr(true);
      setPhoneErrMsg('올바른 휴대폰 번호를 입력해 주세요');
      return;
    }
    if(!shopNumberCheck) {
      setShopNumberErr(true);
      setShopNumberErrMsg('올바른 사업자번호를 입력해 주세요');
      return;
    }

    try {
      const result = await register(data.name, data.id, data.password, phone, shopNumber);
      if(result === 'success') navigate(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: "회원가입에 실패하였습니다" });
      }
    }
  };

  const onChangeHandler = name => e => {
    if(name === 'phone') {
      setPhone(e.target.value);
    }
    if(name === 'shopNumber') {
      setShopNumber(e.target.value);
    }
  }

  const onClickPhoneCheck = () => {
    if(phone !== '' && phone.length > 9) {
      checkPhone();
    } else {
      setPhoneErr(true);
      setPhoneErrMsg('올바른 휴대폰 번호를 입력해 주세요');
    }
  }

  const checkPhone = async () => {
    Axios.get(`${HOST_API}/api/user/phoneRequest?phoneNumber=${phone}`)
    .then(data => {
      const {result} = data.data;
      if(result === 'success') {
        (async () => {
          const { value: certifiedNum } = await Swal.fire({
            title: '인증번호를 입력해주세요.',
            input: 'text',
            inputPlaceholder: '인증번호를 입력하세요',
            inputAttributes: {
              autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: '완료',
            showLoaderOnConfirm: true,
          });
          if(certifiedNum) {
            Axios.get(`${HOST_API}/api/user/phoneCheck?phoneNumber=${phone}&certifiedNum=${certifiedNum}`)
            .then(certifyData => {
              const { result, data } = certifyData.data;
              if(result === 'success' && data === true) {
                setPhoneErr(false);
                setPhoneErrMsg('');
                setPhoneCheck(true);
              } else {
                setPhoneErr(true);
                setPhoneErrMsg('인증번호가 일치하지 않습니다');
              }
            }).catch(e => {
              setPhoneErr(true);
              setPhoneErrMsg('인증에 실패하였습니다');
              console.error('error', e);
            })
          }
        })();
      }
    }).catch(e => {
      console.error('error', e);
    })

  }

  const onClickShopNumberCheck = () => {
    if(shopNumber !== '' && shopNumber.length === 10) {
      const b_no = [shopNumber];
      checkShopNumber(b_no);
    } else {
      setShopNumberErr(true);
      setShopNumberErrMsg('올바른 사업자번호를 입력해 주세요');
    }
  }

  const checkShopNumber = async (b_no) => {
    const apiKey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;
    try {
      const response = await Axios.post(`https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${apiKey}`, {
        b_no,
      });
      const {data, status_code} = response.data;
      if(status_code === "OK") {
        const {b_stt, tax_type} = data[0];
        if(b_stt === '01' || b_stt === '계속사업자') {
          setShopNumberErr(false);
          setShopNumberErrMsg('');
          setShopNumberCheck(true);
        } else {
          setShopNumberErr(true);
          setShopNumberErrMsg(tax_type);
        }
      }
    } catch (e) {
      console.error('error', e);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="name" label="성명"/>

        <RHFTextField name="id" label="ID"/>

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="passwordCheck"
          label="PasswordCheck"
          type={showPasswordCheck ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPasswordCheck(!showPasswordCheck)}>
                  <Iconify icon={showPasswordCheck ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField 
            fullWidth
            name="phone" 
            label="휴대폰 인증" 
            onChange={onChangeHandler('phone')}
            error={phoneErr}
            helperText={phoneErrMsg}
            disabled={phoneCheck} />
          <Button
            sx={{width:'150px'}}
            onClick={()=>{onClickPhoneCheck()}}
            disabled={phoneCheck}>
            인증 요청
          </Button>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            name="shopNumber" 
            label="사업자번호" 
            onChange={onChangeHandler('shopNumber')} 
            disabled={shopNumberCheck}
            error={shopNumberErr}
            helperText={shopNumberErrMsg} />
          <Button
            sx={{width:'150px'}}
            onClick={()=>{onClickShopNumberCheck()}}
            disabled={shopNumberCheck}>
            인증 요청
          </Button>
        </Stack>


        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
