import React from 'react';
import Navbar from './navigation/Navbar';
import Transactions from './components/Transactions';
import Home from './page/Home'
 
const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Transactions />
    </div>
  );
}

export default App;
