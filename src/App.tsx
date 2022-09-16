import React from 'react';
import './App.css';
import './scss/app.scss';
import {Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home'
import Cart from './components/pages/Cart'
import NotFound from './components/pages/NotFound'
import FullPizza from './components/pages/FullPizza';
import MainLayout from './components/layouts/MainLayout';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <MainLayout/> }>
        <Route path='' element={ <Home/> } />
        <Route path='cart' element={ <Cart/> } />
        <Route path='pizzas/:id' element={ <FullPizza/> } />
        <Route path='*' element={ <NotFound/> } />
      </Route>
    </Routes>
      
  );
}


export default App;

