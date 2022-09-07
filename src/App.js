import React from 'react';
import './App.css';
import './scss/app.scss';
import {Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/pages/Home'
import Cart from './components/pages/Cart'
import NotFound from './components/pages/NotFound'

import {Counter} from './redux/Counter'


export const SearchContext = React.createContext()

const App = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return ( <div className="wrapper">
      <Counter/>
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/cart' element={ <Cart/> } />
            <Route path='*' element={ <NotFound/> } />
          </Routes>
      </div>
      </SearchContext.Provider>
      
    </div>
  );
}

export default App;
