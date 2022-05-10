import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// routes
import { PATH_AUTH } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('이름을 입력해주세요'),
    id: Yup.string().required('ID를 입력해주세요'),
    password: Yup.string().required('비밀번호를 입력해 주세요'),
    passwordCheck: Yup.string().oneOf([Yup.ref("password"), null], '비밀번호가 일치하지 않습니다').required('비밀번호를 입력해 주세요'),
    // phone: Yup.string().required('phone required'),
    // shopNumber: Yup.string().required('shop number required'),
  });

  const defaultValues = {
    name: '',
    id: '',
    password: '',
    passwordCheck: '',
    // phone: '',
    // shopNumber: '',
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
    try {
      const result = await register(data.name, data.id, data.password, data.phone, data.shopNumber);
      if(result === 'success') navigate(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: "회원가입에 실패하였습니다" });
      }
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
          <RHFTextField name="phone" label="휴대폰 인증" />
          <Button onClick={()=>{}}
            sx={{width:'100px'}}>
            인증 요청
          </Button>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="shopNumber" label="사업자번호" />
          <Button
          sx={{width:'100px'}}>
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
