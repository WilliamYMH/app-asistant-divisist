import React from 'react';
import { useEffect } from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import useUser from '../hooks/useUser'
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import {useLocation} from "wouter"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    alerts: {
        width: '100%', // Fix IE 11 issue.
    },  
    paper: {
        margin: theme.spacing(5, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login({onLogin})  {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const {isLoginLoading, hasLoginError, login, isLogged} = useUser()
    const [, navigate] = useLocation()

    useEffect(() => {
        if (isLogged) {
          navigate('/')
          onLogin && onLogin()
        }
      }, [isLogged, navigate, onLogin])
      
    const onSubmit = (data) => {
        login(data)
    }
        
return (
    <Grid container component="main" className={classes.root}>
        
        <CssBaseline />
        
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {isLoginLoading && <LinearProgress />}
            <div className={classes.alerts}>
            {
                hasLoginError && <Alert severity="info">Credenciales invalidas</Alert>
            }
            </div>
            <div className={classes.paper}>
            
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar sesion
                            </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="usuario"
                        label="Codigo"
                        name="usuario"
                        autoComplete="codigo"
                        autoFocus
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="documento"
                        label="Documento"
                        name="documento"
                        autoComplete="documento"
                        inputRef={register}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        inputRef={register}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recuerdame"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Iniciar Sesion
                                </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link target="_blank" href="https://divisist2.ufps.edu.co/index/restablecer_clave" variant="body2">
                                olvido la contraseña?
                                        </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </form>
            </div>
        </Grid>
    </Grid> 
    
);
}