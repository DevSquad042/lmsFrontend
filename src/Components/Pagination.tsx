import React, { useRef, useEffect } from "react";
import styles from "./ComponentStyles/Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef<HTMLButtonElement>(null);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  useEffect(() => {
    if (activePageRef.current) {
      activePageRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [currentPage]);

  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper} ref={scrollContainerRef}>
      <button
        className={styles.arrow}
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        ‹
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          ref={page === currentPage ? activePageRef : null}
          className={`${styles.page} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrow}
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
