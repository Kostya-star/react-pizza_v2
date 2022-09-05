import React from 'react';

const Categories = ({ activeCategory, setActiveCategory }) => {
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