import React, { useCallback, useRef } from 'react'

import './index.scss'

interface CategoryProps {
  categories: string[]
  category: any
  selectCategory: any
}

interface ListProps {
  title: string
  category: any
  selectCategory: any
}

export const Category: React.FC<CategoryProps> = ({ categories, category, selectCategory }) => {
  return (
    <nav className="category_wrapper">
      <span className="category_content pick">All</span>
      <span className="bar"/>
      <ul>
        {
          categories.map((title, idx) => <CategoryList key={idx} title={title} category={category}
                                                       selectCategory={selectCategory}/>)
        }
      </ul>
    </nav>
  )
}

const CategoryList: React.FC<ListProps> = ({ title, category, selectCategory }) => {
  const tabRef = useRef(null)

  const handleClick = useCallback(() => {
    // scrollToCenter(tabRef)
    selectCategory(title)
  }, [tabRef])

  // useEffect(() => {
  //   if (category === title) {
  //     scrollToCenter(tabRef)
  //   }
  // }, [category, tabRef])

  return <li className="category_content" onClick={handleClick}>{title}</li>
}
