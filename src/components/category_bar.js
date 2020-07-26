import React from 'react';

const CategoryBar = (props) => {
  const buttons = props.categories.map((val, index) => {
    return (
      <button onClick={() => props.selectCategory(val)} type="button">{val}</button>
    );
  });

  return (
    <div className="category-bar">
      {buttons}
    </div>
  );
};

export default CategoryBar;
