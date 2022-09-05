import React from 'react';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';


const Home = () => {
  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // <Categories/>--------------------------------------------------------
  const [activeCategory, setActiveCategory] = React.useState(0);

  // <Sort/>--------------------------------------------------------
  const [activeSortItem, setActiveSortItem] = React.useState( {name: 'популярности', sortProperty: 'rating'} )

  React.useEffect(() => {
    setIsLoaded(false);

    const category = activeCategory > 0 ? `category=${activeCategory}` : ''
    const sortBy = activeSortItem.sortProperty.replace('-', '');
    const order = activeSortItem.sortProperty.includes('-') ? 'desc' : 'asc';

      fetch(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems?${category}&sortBy=${sortBy}&order=${order}`)
      .then(response => response.json())
      .then(pizzasArray => {
        setPizzaItems(pizzasArray); 
        setIsLoaded(true);
      })
      window.scroll(0, 0);
  }, [activeCategory, activeSortItem]);
  
  return (
    <div className="container">
          <div className="content__top">

            <Categories activeCategory={activeCategory} 
                        setActiveCategory={(index) => setActiveCategory(index)}/>

            <Sort activeSortItem={activeSortItem} 
                  setActiveSortItem={(index) => setActiveSortItem(index)} />

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