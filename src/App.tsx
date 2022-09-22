import React from 'react';
import './App.css';
import './scss/app.scss';
import {Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home'
import MainLayout from './components/layouts/MainLayout';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart' */'./components/pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: 'FullPizza' */'./components/pages/FullPizza'));
const NotFound = React.lazy(() => import(/*webpackChunkName: 'NotFound' */'./components/pages/NotFound'));


const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <MainLayout/> }>
        <Route path='' element={ <Home/> } />
        <Route path='cart' element={
          <React.Suspense fallback={<div>Идет загрузка пицц!...</div>}>
            <Cart />
          </React.Suspense>} />

        <Route path='pizzas/:id' element={
          <React.Suspense fallback={<div>Идет загрузка страницы...</div>}>
            <FullPizza/>
          </React.Suspense>} />

        <Route path='*' element={
          <React.Suspense fallback={<div>Идет загрузка страницы...</div>}>
            <NotFound/>
          </React.Suspense>} />
      </Route>
    </Routes>
      
  );
}


export default App;

