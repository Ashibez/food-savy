import React from 'react';

const Pagination = ({
    currentPage,
    totalRecipes,
    recipesPerPage,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);

    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber);
        // Scroll to top smoothly on all devices
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Generate page numbers array
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Don't render pagination if there's only one page
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Previous
            </button>

            <div className="page-numbers">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`pagination-button ${
                            currentPage === number ? 'active' : ''
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
