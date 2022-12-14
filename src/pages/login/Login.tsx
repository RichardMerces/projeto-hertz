import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';
import './Login.css'
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>({
        usuario: '',
        senha: ''
    })

    function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token));
            navigate('/home');
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await login('/auth/logar', userLogin, setToken)
            alert('Usuario logado com sucesso!')
        } catch (erro) {
            alert('Dados incorretos!')
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box padding={20} >
                    <Box className="box login-box" >
                    <h1>LOGIN</h1>
                        <form onSubmit={onSubmit} >
                            <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                            <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                            <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>
                            </Box>
                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                            </Box>
                            <Link to='/cadastrar'>
                                <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                            </Link>
                        </Box>
                    </Box>

                </Box>
            </Grid>

        </Grid>
    );
}

export default Login;