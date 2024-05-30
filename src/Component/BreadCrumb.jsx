import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import '../Component/Styles/Breadcrumb.css'; // Ensure this imports your CSS file

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <span style={{ color: 'black' }}>Application</span>
          {pathnames.length > 0 && <MdKeyboardDoubleArrowRight className="breadcrumb-icon" />}
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>
                <span style={{ color: index === 0 ? 'green' : 'green', fontFamily: 'Roboto', fontWeight: '200px', fontSize: '16px' }}>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </Link>
              {!isLast && <MdKeyboardDoubleArrowRight className="breadcrumb-icon" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;