import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.css";

interface PaginationProps {
  onPageChange: (selectedItem: {selected: number}) => void,
  forcePage: number,
  totalPages: number, 
}


const Pagination = ({onPageChange, totalPages, forcePage}: PaginationProps) => {
  return (
    <p>
      <ReactPaginate 
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={onPageChange}
            forcePage={forcePage}
            className={styles.pagination}
            activeClassName={styles.active}
            nextLabel="→"
            previousLabel="←"
      />
    </p>
  )}

export default Pagination;