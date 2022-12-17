import { Button, Card, CardActions, CardContent, Grid, Link, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Produto from '../../../models/Produto';
import { buscaId } from '../../../services/Service';
import './detalheProduto.css';
import BoxButtons from '../boxButtons/BoxButtons';

function DetalheProduto() {

    const [produto, setProduto] = useState<Produto>()
    const { id } = useParams<{id: string}>();
    const [token, setToken] = useLocalStorage('token');
    let navigate = useNavigate();

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/produtos/${id}`, setProduto, {
            headers: {
              'Authorization': token
            }
          })
        }

    return (
        <>
            <Grid container justifyContent='center'>
            <Box m={20}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {produto?.nome}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {produto?.descricao}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {produto?.categoria?.nome}
                        </Typography>
                        <Typography variant="body2" component="p">
                            R${produto?.preco}
                        </Typography>
                    </CardContent>
                    <BoxButtons />
                </Card>
            </Box>
            </Grid>
        </>
    )
}

export default DetalheProduto;