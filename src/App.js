import React from 'react';
import './App.css';
import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';


const App = () => {
  const [pizzaItems, setPizzaItems] = React.useState([]);

  React.useEffect(() => {
      fetch('https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems')
      .then(response => response.json())
      .then(pizzasArray => setPizzaItems(pizzasArray))
  }, []);

  return ( <div className="wrapper">
      <Header/>
      
      <div className="content">
        <div className="container">
          <div className="content__top">

            <Categories/>

            <Sort/>

          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">

             {
              pizzaItems.map((obj, index) => <PizzaBlock {...obj}
                                                                  key={index} /> ) 
             }

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
