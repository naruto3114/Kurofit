import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 py-6">
      {/* Breadcrumb Links */}
      <Link to="/" className="hover:text-black transition-all">
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-400">/</span>
          {index === items.length - 1 ? (
            <span className="text-gray-700">{item.label}</span>
          ) : (
            <Link 
              to={item.link} 
              className="hover:text-black transition-all"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
