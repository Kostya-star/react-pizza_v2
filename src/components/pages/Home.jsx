import React from 'react';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Pagination from './../Pagination';


const Home = ({ searchValue }) => {
  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // <Categories/> STATE--------------------------------------------------------
  const [activeCategory, setActiveCategory] = React.useState(0);

  // <Sort/> STATE--------------------------------------------------------
  const [activeSortItem, setActiveSortItem] = React.useState( {name: 'популярности', sortProperty: 'rating'} )

  //<Pagination/> STATE-------------------------------------------------------
  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    setIsLoaded(false);

    const category = activeCategory > 0 ? `category=${activeCategory}` : ''
    const sortBy = activeSortItem.sortProperty.replace('-', '');
    const order = activeSortItem.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : ''; 
    console.log(currentPage);

      fetch(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
      .then(response => response.json())
      .then(pizzasArray => {
        setPizzaItems(pizzasArray); 
        setIsLoaded(true);
      })
      window.scroll(0, 0);
  }, [activeCategory, activeSortItem, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = pizzaItems/*.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false)*/
                            .map(obj => <PizzaBlock key={obj.id} {...obj} />);
  
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
              !isLoaded ? skeleton : pizzas
             }

          </div>

          <Pagination onChangePage={(currentPage) => setCurrentPage(currentPage)}/>

    </div>
  )
}

export default Home