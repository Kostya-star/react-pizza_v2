import React from 'react';


type CategoriesProps = {
  activeCategory: number;
  setActiveCategory: any;    
}

const Categories: React.FC<CategoriesProps> = ({ activeCategory, setActiveCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

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
}


export default Categories