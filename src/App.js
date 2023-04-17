import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
  const [name, setName] = useState('');

  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);
  const [popup, setPopup] = useState(false);

  const [popupText, setPopupText] = useState('');
  const handleSubmit = () => {
    if (name.length > 0 && password.length > 0) {
      var formdata = new FormData();

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `http://localhost:4000/Login?password=${password}&name=${name}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result1) => {
          const result = JSON.parse(result1);
          console.log('check', result, result.message, typeof result);
          if (result.message === 'wrong credentials') {
            console.log('1');
            setPopup(true);
            setPopupText('Wrong credentials');
            setInterval(() => setPopup(false), 2000);
          } else if (result.message === 'not register') {
            console.log('2');
            setPopup(true);
            setPopupText('User not registered');
            setInterval(() => setPopup(false), 2000);
          } else if (result.message === 'login success') {
            console.log('2');
            setModal(true);
          }
        })
        .catch((error) => console.log('error', error));
    } else {
      setPopup(true);
      setPopupText('Empty username or password');
      setInterval(() => setPopup(false), 3000);
    }
  };
  const handleRegister = () => {
    if (name.length === 0 || password.length === 0) {
      setPopup(true);
      setPopupText('Empty username or password');
      setInterval(() => setPopup(false), 2000);
    } else {
      var formdata = new FormData();

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `http://localhost:4000/Register?password=${password}&name=${name}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result1) => {
          console.log(result1);
          const result = JSON.parse(result1);
          console.log('check', result, result.message, typeof result);
          if (result.message === 'user already exists') {
            setPopup(true);
            setPopupText('User already exists');
            setInterval(() => setPopup(false), 2000);
          }
          if (result.message === 'successful') {
            setModal(true);
          }
        })
        .catch((error) => console.log('error', error));
    }
  };
  return (
    <div className="mainContainer">
      {!modal && (
        <div className="loginContainer">
          <input
            className="emailContainer"
            type={'text'}
            value={name}
            placeholder="Enter user name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            className="passwordContainer"
            type={'password'}
            value={password}
            placeholder="Enter password "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="buttonsContainer">
            <div className="buttonContainer" onClick={() => handleSubmit()}>
              Login
            </div>
            <div className="buttonContainer" onClick={() => handleRegister()}>
              Register
            </div>
          </div>
          {popup && <div className="popupContainer">{popupText}</div>}
        </div>
      )}
      {modal && (
        <div className="loginDoneContainer">Logging Done Successfully</div>
      )}
    </div>
  );
}

export default App;
