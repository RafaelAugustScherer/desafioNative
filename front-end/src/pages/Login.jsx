import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorAlert from '../components/ErrorAlert';

const Login = () => {
  const [, setCookies] = useCookies(['desafioNative-token']);
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    username: '',
    password: '',
  });
  const [ showPassword, setShowPassword ] = useState(false);
  const [ loginError, setLoginError ] = useState(false);

  const handleChange = ({ target: { name, value } }) => (
    setFormData({ ...formData, [ name ]: value })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { REACT_APP_SERVER } = process.env;

    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/user/login`,
        formData,
      );
      setCookies('desafioNative-token', response.data.token);
      return navigate('/');
    } catch (e) {
      console.log(e);
      const { error } = e.response.data;
      setLoginError(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: '720px', mx: 5, mt: 5 }}
    >
      <Typography
        variant="h3"
        component="h1"
        textAlign="center"
      >
        Login
      </Typography>
      <Box sx={{ '&& > *': { my: 2 } }}>
        {
          loginError && (
            <ErrorAlert content={loginError} setContent={setLoginError} />
          )
        }
        <TextField
          name="username"
          label="Usuário"
          onChange={handleChange}
          value={formData.username}
          fullWidth
        />
        <TextField
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Senha"
          onChange={handleChange}
          value={formData.password}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="mudar visibilidade da senha"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          size="large"
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
