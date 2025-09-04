import React from "react";
import { Link } from "react-router-dom";
import styles from "./ComponentStyles/Breadcrumb.module.css";

interface BreadcrumbLink {
  label?: string;
  path: string;
}

interface BreadcrumbProps {
  links: BreadcrumbLink[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <div className={styles.breadcrumb}>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <Link to={link.path} className={styles.link}>
            {link.label}
          </Link>
          {index < links.length - 1 && (
            <span className={styles.separator}>›</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;