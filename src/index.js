import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AuthProvider } from './Pages/Context/auth';
import { UserProvider } from './Pages/Context/user';

ReactDOM.render(<AuthProvider> <UserProvider> <App /> </UserProvider> </AuthProvider>, document.getElementById('root'));