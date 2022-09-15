import React from 'react';
import qs from 'qs';

import Categories from '../Categories';
import Sort from '../Sort';
import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import { setActiveCategory, setCurrentPage, setFilters, selectFilter } from '../../redux/slices/filterSlice';
import Pagination from '../Pagination';
import { sortItems } from '../Sort';
import { fetchPizzas } from '../../redux/slices/pizzaSlice';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';


const Home = () => {
  const dispatch = useDispatch();
  
  const {pizzaItems, status} = useSelector(({pizzas}) => ({
    pizzaItems: pizzas.items,
    status: pizzas.status,
  }))

  const {activeCategory, activeSortItem, currentPage, searchValue} = useSelector(selectFilter)

  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const getPizzas = async() => {
    
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = activeSortItem.sortProperty.replace('-', '');
    const order = activeSortItem.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : ''; 

    dispatch(fetchPizzas({
      category,
      sortBy,
      order,
      search,
      currentPage,
    }))
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
          getPizzas();
        }

        isSearch.current = false;
      }, [activeCategory, activeSortItem, searchValue, currentPage]);
  

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = pizzaItems/*.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false)*/
                            .map(obj => 
                                <PizzaBlock key={obj.id} {...obj} />
                            )

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
          {status === 'error' ? (
              <div className="cart cart--empty">
                <h2>Произошла ошибка <i>😕</i></h2><br/>
                <p>
                  Наши сотрудники уже работают над проблемой!<br/>
                  В скором времени всё будет улажено. Благодарим за понимание!
                </p>
              </div>
            ) : (
              <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
            )
          }

          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>

    </div>
  )
}


export default Home;