import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../../redux/slices/cart/slice';
import { CartItem} from '../../redux/slices/cart/types';
import { Link } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { selectAddedCartCountById } from '../../redux/slices/cart/selectors';


const typeNames = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: string[];
  count: number;
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({id, title, imageUrl, price, sizes, types}) => {
    const dispatch = useDispatch();

    const addedCount = useSelector(selectAddedCartCountById(id));
    const addedCartCount = addedCount ? addedCount.count : 0;

    const [activeType, setActiveType] = React.useState(0);


    const [activeSize, setActiveSize] = React.useState(0)

    const onClickAdd = () => {
      const item: CartItem = {
        id,
        title,
        imageUrl,
        price,
        type:  typeNames[activeType],
        sizes: [activeSize],
        count: 0,
      }
      dispatch(addItem(item))
    }
    
    return (
      <div className='pizza-block-wrapper'>
        <div className="pizza-block">

            <Link to={`pizzas/${id}`}>                              
              <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
              />
              <h4 className="pizza-block__title">{title}</h4>
            </Link>

              <div className="pizza-block__selector">
                <ul>
                  {
                    types.map((typeId: string, index: number) => <li
                                                    className={activeType === index ? 'active' : ''} 
                                                    key={typeId}
                                                    onClick={() => setActiveType(index)}> {typeNames[index]} </li>)
                  }
                </ul>
                <ul>
                  
                  {
                    sizes.map((size: number, index: number) => <li 
                                                    className={activeSize === index ? 'active' : ''}
                                                    onClick={() => setActiveSize(index)}
                                                    key={index}
                                                    > {size} см.</li>)
                  }

                </ul>
              </div>
              <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
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
                  {/* {
                    addedCount > 0 && <i>{addedCount}</i>
                  }   */}
                  {
                    addedCount && <i>{addedCartCount}</i>
                  }
                </button>
              </div>
            </div>
      </div>
  )
}

export default PizzaBlock