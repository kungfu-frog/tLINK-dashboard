import React from 'react';
import Timer from 'react-compound-timer';

interface Props {}

const CustomTimer: React.FC<Props> = () => {
  return (
    <Timer
      initialTime={86400000}
      direction='backward'
    >
      {() => (
        <div>
          <div className="timer__section">
            <b><Timer.Days /></b>
            <span>days</span>
          </div>
          <div className="timer__section">
            <b><Timer.Hours /></b>
            <span>hours</span>
          </div>
          <div className="timer__section">
            <b><Timer.Minutes /></b>
            <span>minutes</span>
          </div>
          <div className="timer__section">
            <b><Timer.Seconds /></b>
            <span>seconds</span>
          </div>
        </div>
      )}
    </Timer>
  )
};

export default CustomTimer;
