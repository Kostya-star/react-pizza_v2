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
import { setPizzas } from '../../redux/slices/pizzaSlice';

import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom';


const Home = () => {
  const pizzaItems = useSelector(({pizzas}) => pizzas.items)
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {activeCategory, activeSortItem, currentPage} = useSelector(({filter}) => ( 
    {
      activeCategory: filter.activeCategory, 
      activeSortItem: filter.activeSortItem,
      currentPage: filter.currentPage,
    } ))


  const {searchValue} = React.useContext(SearchContext)

  const [isLoaded, setIsLoaded] = React.useState(false);

  const fetchPizzas = async() => {
    setIsLoaded(false);
    
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = activeSortItem.sortProperty.replace('-', '');
    const order = activeSortItem.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : ''; 

        try {
          const response = await axios.get(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems?${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&${search}`)
          dispatch(setPizzas(response.data))
        } 
        catch (error) {
          alert('1, pizzas fetching error')
          console.log('error', error);
        }
        finally {
          setIsLoaded(true);
        }
  }

  // USE EFFECT 3
  // Если был первый рендер, то тогда вшиваем параметры фильтрации в URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategory,
        sortProperty: activeSortItem.sortProperty,
        currentPage,
      });
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [activeSortItem, currentPage, activeCategory])


    // USE EFFECT 1
    // Если был первый рендер, то проверяем URL параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortItems.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        ...params,
        sort,
      }));
      isSearch.current = true;
    }
  }, [])


      // USE EFFECT 2
      // Если был первый рендер, то запрашиваем пиццы 
      React.useEffect(() => {
        window.scroll(0, 0);

        if (!isSearch.current) {
          fetchPizzas();
        }

        isSearch.current = false;
      }, [activeCategory, activeSortItem, searchValue, currentPage]);
  

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


export default Home;