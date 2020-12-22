import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MicIcon from '@material-ui/icons/Mic';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import { makeStyles } from '@material-ui/core/styles';
import API from '../api/api';
import useUser from '../hooks/useUser'
import { useLocation } from "wouter"
import { useEffect } from "react";

const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background,
    padding: theme.spacing(1),
  },
}));


export default function SignIn(onHome) {
  const [lang, setLang] = useState('es-CO');
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  const [nota, setNota] = useState('');

  const [blocked, setBlocked] = useState(false);
  const [, navigate] = useLocation()
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser()
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);

  const onEnd = () => {
    console.log(value)
    let formData = {}
    formData['data'] = data
    formData['value'] = value
    API.post(`api/v1.0/get-nota-by-voice`, formData)
      .then(res => {
        if (!res.data.succes) return;
        return res.data.result
      }).then(res => {
        setNota(res)
        speak({ text: res, voice, rate, pitch })
      })
  };
  const onEnd2 = () => {
    // You could do something here after listening has finished
  };

  const { speak, cancel, speaking, voices } = useSpeechSynthesis({
    onEnd2,
  });

  useEffect(() => {
    if (!isLogged) {
      navigate('/login')
    } else {
      let res = getMaterias();
    }
  }, [isLogged, navigate, onHome])

  const getMaterias = () => {
    return API.get(`api/v1.0/get-notas-materias`)
      .then(res => {
        setData(res.data.result)
        console.log(res.data)
        return res.data
      })
  }


  const voice = voices[voiceIndex] || null;

  const onResult = (result) => {
    if (result.length > 35 && result.length < 60) {
      setValue(result);

    }
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });



  const toggle = listening
    ? stop
    : () => {
      setBlocked(false);
      listen({ lang });
    };



  const classes = useStyles();
  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <Button onClick={toggle}>
        <MicIcon></MicIcon>
      </Button>
      <div className={classes.root}>{value}</div>

      { /*speaking ? (
        <button type="button" onClick={cancel}>
          Stop
        </button>
      ) : (
          <button
            type="button"
            onClick={() => speak({ text: nota, voice, rate, pitch })}
          >
            Speak
          </button>
      )*/}
    </MuiThemeProvider>
  );
}
