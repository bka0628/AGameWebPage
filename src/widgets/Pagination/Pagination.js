import classes from './Pagination.module.css';

const Pagination = ({
  currentPage,
  totalItemsCount,
  itemsPerPage = 10,
  pageRangeDisplayed = 10,
  onChangePage,
}) => {
  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);
  const currentRangeStart =
    Math.floor((currentPage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1;
  let currentRangeEnd = currentRangeStart + pageRangeDisplayed - 1;
  if (currentRangeEnd > totalPages) {
    currentRangeEnd = totalPages;
  }
  const pageNumbers = [];
  for (let i = currentRangeStart; i <= currentRangeEnd; i++) {
    pageNumbers.push(i);
  }

  const allPreviousPage = () => {
    if (currentRangeStart === 1) {
      return;
    }
    onChangePage(currentRangeStart - 10);
  };

  const previousPage = () => {
    if (currentPage === 1) {
      return;
    }
    onChangePage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage === totalPages) {
      return;
    }
    onChangePage(currentPage + 1);
  };

  const allNextPage = () => {
    if (currentRangeEnd === totalPages) {
      return;
    }
    onChangePage(currentRangeStart + 10);
  };

  return (
    <div className={classes.pagination}>
      <button onClick={allPreviousPage}>&lt;&lt;</button>
      <button onClick={previousPage}>&lt;</button>
      <ul className={classes.pagination__numbers}>
        {pageNumbers.map((number) => (
          <li
            className={currentPage === number ? classes.active : undefined}
            key={number}
            onClick={() => onChangePage(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <button onClick={nextPage}>&gt;</button>
      <button onClick={allNextPage}>&gt;&gt;</button>
    </div>
  );
};

export default Pagination;
