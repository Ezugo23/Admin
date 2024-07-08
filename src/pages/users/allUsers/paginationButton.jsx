const PaginationButton = ({currentPage, setCurrentPage, filteredUsers, itemsPerPage, indexOfFirstItem, indexOfLastItem}) => {

const totalItems = filteredUsers.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showingFrom = totalItems === 0 ? 0 : indexOfFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, totalItems);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

    return (
        <div className='flex items-center justify-between p-3'>
        <p className='text-sm'>Showing <span className="font-semibold">{showingFrom}-{showingTo} </span> from <span className="font-semibold">{totalItems}</span> data </p>
        {totalPages > 1 && <div>
        <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 rounded hover:bg-gray-300 ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
        &lt; 
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
            <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={`text-sm px-3 py-1 mx-1 rounded border border-gray-200 hover:bg-gray-300 ${index + 1 === currentPage ? 'bg-[#4CAF50] text-[#fff]' : ''}`}
            disabled={index + 1 === currentPage}
            >
            {index + 1}
            </button>
        ))}
        <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 mx-1 rounded hover:bg-gray-300 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
        >
        &gt;
        </button>
        </div>}
    </div>
    )
}

export default PaginationButton;