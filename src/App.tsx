import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/shared/Layout';
import Home from "./adminPage/Home";
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
