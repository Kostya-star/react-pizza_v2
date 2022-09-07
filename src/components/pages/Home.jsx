import React from 'react';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import { setCategoryId, setSortItem } from '../../redux/slices/filterSlice';
import Pagination from './../Pagination';
import { SearchContext } from './../../App';

import { useSelector, useDispatch } from 'react-redux'


const Home = () => {
  const {categoryId, sortItem} = useSelector(({filter}) => ({
    categoryId: filter.categoryId,
    sortItem: filter.sortItem,
  }))
  const dispatch = useDispatch();

  const {searchValue} = React.useContext(SearchContext)

  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // <Categories/> STATE--------------------------------------------------------
  // const [activeCategory, setActiveCategory] = React.useState(0);

  // <Sort/> STATE--------------------------------------------------------
  // const [activeSortItem, setActiveSortItem] = React.useState( {name: 'популярности', sortProperty: 'rating'} )

  //<Pagination/> STATE-------------------------------------------------------
  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    setIsLoaded(false);

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sortItem.sortProperty.replace('-', '');
    const order = sortItem.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : ''; 

      fetch(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`)
      .then(response => response.json())
      .then(pizzasArray => {
        setPizzaItems(pizzasArray); 
        setIsLoaded(true);
      })
      window.scroll(0, 0);
  }, [categoryId, sortItem, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = pizzaItems/*.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false)*/
                            .map(obj => <PizzaBlock key={obj.id} {...obj} />);

  const onSelectCategory = (index) => {
    dispatch(setCategoryId(index))
  }     
  
  const onSelectSortItem = (index) => {
    dispatch(setSortItem(index))
  }
  
  return (
    <div className="container">
          <div className="content__top">

            <Categories activeCategory={categoryId} 
                        setActiveCategory={onSelectCategory}/>

            <Sort activeSortItem={sortItem} 
                  setActiveSortItem={onSelectSortItem} />

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