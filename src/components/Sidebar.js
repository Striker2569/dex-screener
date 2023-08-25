import React from 'react';

function Sidebar({ onOptionChange }) {
  return (
    <div className="sidebar">
      <div className="logo">Your Logo Here</div>
      <div>
        <button onClick={() => onOptionChange('token')}>Token Address</button>
        <button onClick={() => onOptionChange('pair')}>Pair Address</button>
      </div>
    </div>
  );
}

export default Sidebar;
