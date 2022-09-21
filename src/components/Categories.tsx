import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';


type CategoriesProps = {
  activeCategory: number;
  setActiveCategory: (index: number) => void;  
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = React.memo(({ activeCategory, setActiveCategory }) => {

  return (
    <div className="categories">
              <ul>
                {categories.map((categoryName, index) => <li 
                                                      onClick={() => setActiveCategory(index)} 
                                                      className={activeCategory === index ? 'active' : ''}
                                                      key={index} > 
                                                      {categoryName} 
                                                  </li>
)}
              </ul>
            </div>
  )
})


export default Categories