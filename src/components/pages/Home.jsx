import React from 'react';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';


const Home = () => {
  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
      fetch('https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems')
      .then(response => response.json())
      .then(pizzasArray => {
        setPizzaItems(pizzasArray); 
        setIsLoaded(true);
      })
      window.scroll(0, 0);
  }, []);

  return (
    <div className="container">
          <div className="content__top">

            <Categories/>

            <Sort/>

          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">

             {
              !isLoaded 
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) 
              : pizzaItems.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
             }

          </div>
    </div>
  )
}

export default Home