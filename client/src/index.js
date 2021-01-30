import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from "./Context/AuthContext";
import RoomContext from "./Context/RoomContext";

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <RoomContext>
        <App />
      </RoomContext>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
