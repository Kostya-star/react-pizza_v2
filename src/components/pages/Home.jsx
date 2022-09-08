import React from 'react';
import * as axios from 'axios';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import { setActiveCategory } from '../../redux/slices/filterSlice';
import {setCurrentPage} from '../../redux/slices/paginationSlice'
import Pagination from './../Pagination';
import { SearchContext } from './../../App';

import { useSelector, useDispatch } from 'react-redux'


const Home = () => {
  const {activeCategory, activeSortItem} = useSelector(({filter}) => ( 
    {
      activeCategory: filter.activeCategory, 
      activeSortItem: filter.activeSortItem
  } ))

  const currentPage = useSelector(({pagination}) => pagination.currentPage)
  const dispatch = useDispatch();

  const {searchValue} = React.useContext(SearchContext)

  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  //<Pagination/> STATE-------------------------------------------------------
  // const pageCondition = activeCategory > 0 ? 1 : '';
  // const [currentPage, setCurrentPage] = React.useState(1)
  
  React.useEffect(() => {
    setIsLoaded(false);

    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = activeSortItem.sortProperty.replace('-', '');
    const order = activeSortItem.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : ''; 

      axios.get(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems?${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&${search}`)
        .then(response => {
          setPizzaItems(response.data)
          setIsLoaded(true);
        })
      window.scroll(0, 0);
  }, [activeCategory, activeSortItem, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = pizzaItems/*.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false)*/
                            .map(obj => <PizzaBlock key={obj.id} {...obj} />);

  const onSelectCategory = (index) => {
    dispatch(setActiveCategory(index))
  }     
  
  return (
    <div className="container">
          <div className="content__top">

            <Categories activeCategory={activeCategory} 
                        setActiveCategory={onSelectCategory}/>

            <Sort />

          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">

             {
              !isLoaded ? skeleton : pizzas
             }

          </div>

          <Pagination onChangePage={(currentPage) => dispatch(setCurrentPage(currentPage))}/>

    </div>
  )
}

export default Home