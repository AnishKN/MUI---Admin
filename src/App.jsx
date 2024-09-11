import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Authenticate from './pages/Authenticate'
import AdminRoutes from './pages/AdminRoutes'


function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index path='' element={<Authenticate />} />
            <Route path='admin' element={<AdminRoutes />} />
            <Route path='*' element="404" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
