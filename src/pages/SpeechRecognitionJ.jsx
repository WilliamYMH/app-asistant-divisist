import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { Container } from '../shared';

const languageOptions = [
  { label: 'Español', value: 'es-CO' },
];

const SpeechRecognitionJ = () => {
  const [lang, setLang] = useState('es-CO');
  const [value, setValue] = useState('');
  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
    // You could do something here after listening has finished
  };

  const onResult = (result) => {
    setValue(result);
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

  return (
    <Container>
      <form id="speech-recognition-form">
        <h2>Speech Recognition</h2>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Recognition.
          </p>
        )}
        {supported && (
          <React.Fragment>
            <p>
              {`Click 'Listen' and start speaking.
               SpeechRecognition will provide a transcript of what you are saying.`}
            </p>
            <label htmlFor="language">Language</label>
            <select
              form="speech-recognition-form"
              id="language"
              value={lang}
              onChange={changeLang}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label htmlFor="transcript">Transcript</label>
            <textarea
              id="transcript"
              name="transcript"
              placeholder="Waiting to take notes ..."
              value={value}
              rows={3}
              disabled
            />
            <button disabled={blocked} type="button" onClick={toggle}>
              {listening ? 'Stop' : 'Listen'}
            </button>
            {blocked && (
              <p style={{ color: 'red' }}>
                The microphone is blocked for this site in your browser.
              </p>
            )}
          </React.Fragment>
        )}
      </form>
    </Container>
  );
};

export default SpeechRecognitionJ;