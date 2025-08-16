import React, { useState, useRef, useEffect } from "react";
import styles from "./ComponentStyles/Pagination.module.css";

const Pagination: React.FC = () => {
  const [pages, setPages] = useState([1, 2, 3]);
  const [activePage, setActivePage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef<HTMLButtonElement>(null);

  const handlePageClick = (page: number) => {
    setActivePage(page);
  };

  const handleNext = () => {
    const nextPage = activePage + 1;
    setActivePage(nextPage);

    if (!pages.includes(nextPage)) {
      setPages((prev) => [...prev, nextPage]);
    }
  };

  const handlePrev = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  // Auto-scroll so active page is always visible
  useEffect(() => {
    if (activePageRef.current) {
      activePageRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [activePage]);

  return (
    <div className={styles.wrapper} ref={scrollContainerRef}>
      <button
        className={styles.arrow}
        disabled={activePage === 1}
        onClick={handlePrev}
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          ref={page === activePage ? activePageRef : null}
          className={`${styles.page} ${
            page === activePage ? styles.active : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button className={styles.arrow} onClick={handleNext}>
        ›
      </button>
    </div>
  );
};

export default Pagination;
