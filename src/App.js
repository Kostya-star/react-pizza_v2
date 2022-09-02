import './App.css';
import './scss/app.scss';
import pizzasItems from './assets/pizzas.json';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

console.log(pizzasItems);
const App = () => {

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
              pizzasItems.pizzas.map((obj, index) => <PizzaBlock {...obj}
                                                                  key={index} /> ) 
             }

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
