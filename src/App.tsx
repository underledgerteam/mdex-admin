import React from 'react';
import NavBar from './components/NavBar';
import Transactions from './components/Transactions';
import WalletCard from './components/WalletCard';
 
const App = () => {
  return (
    <div>
      <NavBar />
      <WalletCard />
      <Transactions />
    </div>
  );
}

export default App;
