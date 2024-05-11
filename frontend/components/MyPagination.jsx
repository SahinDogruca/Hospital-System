import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const MyPagination = ({ filteredTimes, setCurrentTimes }) => {
  const timesPerPage = 10;
  const [pageOffset, setPageOffset] = useState(0);

  const endOffset = pageOffset + timesPerPage;

  setCurrentTimes(filteredTimes.slice(pageOffset, endOffset));

  const pageCount = Math.ceil(filteredTimes.length / timesPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * timesPerPage) % filteredTimes.length;
    setPageOffset(newOffset);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
};

export default MyPagination;
