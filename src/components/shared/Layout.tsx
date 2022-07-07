import { FC } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../../navigation/Navbar';

const Layout: FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen min-w-screen flex justify-center items-center p-8">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;