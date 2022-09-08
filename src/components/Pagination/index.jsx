import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ( {onChangePage} ) => {

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );

  // const pagesNumbers = [, 1, 2, 3];
  
  // const onPageNext = () => {
  //   setCurrentPage(currentPage<3 ? currentPage+1 : currentPage)
  // }

  // const onPagePrevious = () => {
  //   setCurrentPage(currentPage>1 ? currentPage-1 : currentPage)
  // }

  // return (
  //   <ul className={styles.root}>
  // <li>
  //   <a onClick={onPagePrevious}>&lt;</a></li>
  
  //   {
  //     pagesNumbers.map((pageNum, index) => <li key={index}>
  //                                             <a className={currentPage === index ? `${styles.active}` : '' }
  //                                                 onClick={() => setCurrentPage(index)}>
  //                                               {pageNum}
  //                                             </a>
  //                                           </li>)
  //   }

  // <li>
  //   <a onClick={onPageNext}>&gt;</a></li>
  // </ul>
  // )

};

export default Pagination;

