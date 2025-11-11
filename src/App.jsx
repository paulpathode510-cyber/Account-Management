import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import all page components
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Account from "./Pages/Account";

function App() {
  return (
    // BrowserRouter enables routing functionality in the app
    <BrowserRouter>
      {/* Routes container holds all the defined routes */}
      <Routes>
        {/* Default route ("/") and "/login" both render the Login page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
