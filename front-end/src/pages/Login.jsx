import { useState } from 'react';
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
  Alert,
  CircularProgress,
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => (
    setFormData({ ...formData, [ name ]: value })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => setIsLoading(true), 1000);

    const { REACT_APP_SERVER } = process.env;

    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/user/login`,
        formData,
      );
      setCookies(
        'desafioNative-token',
        response.data.token,
        { maxAge: 60 * 60 * 24 },
      );
      return navigate('/');
    } catch (e) {
      if (e.response.data) {
        const { error } = e.response.data;
        setLoginError(error);
      } else {
        setLoginError(e.message);
      }
      setIsLoading(false);
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
          isLoading && (
            <Alert severity="info" icon={false}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress color="info" sx={{ mr: 2 }} />
                <Typography component="p" variant="h6">Inicializando back-end</Typography>
              </Box>
            </Alert>
          )
        }
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
