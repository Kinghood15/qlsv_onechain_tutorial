import './App.css';
import Login from './layout/LoginStudent';
import SignUp from './layout/SignUpStudent';
import Home from './layout/pages/Home';
import Dashboard from './layout/pages/Dashboard';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotificationMessageProvider from './layout/Provider/NotificationMessageProvider';


function App() {
  return (
    <BrowserRouter>
      {/* <NotificationMessageProvider> */}
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="" exact element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      {/* </NotificationMessageProvider> */}
    </BrowserRouter>
  );
}

export default App;
