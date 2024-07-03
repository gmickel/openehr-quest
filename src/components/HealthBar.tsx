import React from 'react';

interface HealthBarProps {
  health: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ health }) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-1000 ease-in-out"
        style={{ width: `${health}%` }}
      >
        <div className="w-full h-full animate-pulse bg-green-400 opacity-75"></div>
      </div>
    </div>
  );
};

export default HealthBar;
