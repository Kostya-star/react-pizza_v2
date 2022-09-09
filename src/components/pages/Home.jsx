import React from 'react';
import * as axios from 'axios';
import qs from 'qs';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import { setActiveCategory, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import Pagination from './../Pagination';
import { SearchContext } from './../../App';
import { sortItems } from '../../components/Sort';

import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {activeCategory, activeSortItem, currentPage} = useSelector(({filter}) => ( 
    {
      activeCategory: filter.activeCategory, 
      activeSortItem: filter.activeSortItem,
      currentPage: filter.currentPage,
    } ))


  const {searchValue} = React.useContext(SearchContext)

  const [pizzaItems, setPizzaItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);


    // USE EFFECT 1
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItems.find(obj => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({
        ...params,
        sort,
      })
      )
    }
  }, [dispatch])


      // USE EFFECT 2
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
  

    // USE EFFECT 3 
    // здесь я взял и из данных объекта фильтрации преобраховал их в 
    // строку с помощьюs stringify и эту строку с помощью useNavigte() запихнул в URL. 
  React.useEffect(() => {
    const queryString = qs.stringify({
      activeCategory,
      sortProperty: activeSortItem.sortProperty,
      currentPage,
    });
    navigate(`?${queryString}`)

  }, [activeSortItem, currentPage, activeCategory, navigate])

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = pizzaItems/*.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false)*/
                            .map(obj => <PizzaBlock key={obj.id} {...obj} />);

  const onSelectCategory = (index) => {
    dispatch(setActiveCategory(index))
  }     

  const onChangePage = (currentPage) => {
    dispatch(setCurrentPage(currentPage))
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

          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>

    </div>
  )
}
export default Home