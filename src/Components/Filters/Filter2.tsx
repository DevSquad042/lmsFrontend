import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import "./FolderStyles/Filter2.css"; // Make sure this file exists

interface Filter2Props {
  title: string; // Required now — so you must always pass it
  count?: string | number; // Optional
}

const Filter2: React.FC<Filter2Props> = ({ title, count }) => {
  return (
    <div className="filter-container">
      {/* Title */}
      <div className="filter-title">
        <h3>
          {title} {count !== undefined && <span>{count}</span>}
        </h3>
      </div>

      {/* Bottom section */}
      <div className="filter-bottom">
        {/* Search box */}
        <div className="filter-search">
          <FaSearch className="search-icon2" />
          <input type="text" placeholder="Search User" />
        </div>

        {/* Sort & Filter buttons */}
        <div className="filter-left">
          <div className="filter-sort">
            <span className="span1">Sort By</span>
            <button className="sort-btn">
              <span>Relevance</span> <SlArrowDown />
            </button>
          </div>
          <button className="filter-btn">
            <IoFilter /> Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter2;
