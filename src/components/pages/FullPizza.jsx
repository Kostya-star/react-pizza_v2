import React from 'react';
import axios from 'axios';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectAddedCartCountById } from '../../redux/slices/cartSlice';


const typeNames = ['тонкое', 'традиционное'];


const FullPizza = () => {
  const [pizza, setPizzas] = React.useState()
  const {id} = useParams()
  const navigate = useNavigate()
  
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0)
  
  const addedCount = useSelector(selectAddedCartCountById(id));
  const dispatch = useDispatch()

  const addedCartCount = addedCount ? addedCount.count : 0;

  React.useEffect(() => {
    async function getPizzas() {
        try {
        const response = await axios.get(`https://631232c7f5cba498da8ea065.mockapi.io/pizzaItems/${id}` )
        setPizzas(response.data)
      }
     catch(error) {
      alert('Error');
      console.log('Error occured', error);
      navigate('/')
    }
  }
    getPizzas()
  }, [])  

  const onClickAdd = () => {
    const item = {
      id: pizza.id,
      title: pizza.title,
      imageUrl: pizza.imageUrl,
      price: pizza.price,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
    }
    dispatch(addItem(item))
  }


  if (!pizza) {
    return 'Loading...'
  }

return (<div>
  <div className='pizza-block-wrapper'>
    <div className="pizza-block">
          <img
            className="pizza-block__image"
            src={pizza.imageUrl}
            alt="Pizza"
            />
          <h4 className="pizza-block__title">{pizza.title}</h4>
          <div className="pizza-block__selector">
            <ul>
              {
                pizza.types.map((typeId, index) => <li
                                                className={activeType === index ? 'active' : ''} 
                                                key={typeId}
                                                onClick={() => setActiveType(index)}> {typeNames[index]} </li>)
              }
            </ul>
            <ul>
              
              {
                pizza.sizes.map((size, index) => <li 
                                                className={activeSize === index ? 'active' : ''}
                                                onClick={() => setActiveSize(index)}
                                                key={index}
                                                > {size} см.</li>)
              }

            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {pizza.price} ₽</div>
            <button onClick={onClickAdd} className="button button--outline button--add">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                  />
              </svg>
              <span>Добавить</span>
              {
                addedCount && <i>{addedCartCount}</i>
              }
            </button>
          </div>
        </div>
  </div>
            <div className="container cart__bottom-buttons">
                <Link to='/' href="/" className="button button--outline button--add go-back-btn">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13L1 6.93015L6.86175 1"
                      stroke="#D3D3D3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>
                  </svg>
                  <span>Вернуться назад</span>
                </Link>
            </div>
  </div>
)
}


export default FullPizza;