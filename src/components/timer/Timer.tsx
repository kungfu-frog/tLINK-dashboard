import React from 'react';
import Timer from 'react-compound-timer';
import { getTimeLeft } from 'utils';
import Config from 'config';

interface Props {
  seconds: number;
  onEnd: () => void;
}

/*const CustomTimer: React.FC<Props> = ({ seconds, checkpoints }: Props) => {
  return (
    <Timer
      initialTime={seconds}
      direction='backward'
      checkpoints={checkpoints}
    >
      {() => (
        <div className="timer center-h">
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

export default CustomTimer;*/

const withTimer = (timerProps: any) => (WrappedComponent: any) => (wrappedComponentProps: Props) => (
  <Timer
    {...timerProps}
    initialTime={wrappedComponentProps.seconds}
  >
    {(timerRenderProps: any) =>
      <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
  </Timer>
);

class CustomTimer extends React.Component {
  componentDidMount() {
    const { setCheckpoints, setTime, start } = (this.props as any).timer;
    const { onEnd } = (this.props as any);

    setCheckpoints([{
      time: 1000,
      callback: () => {
        setTime(getTimeLeft(Config.Token.rebase.offset) * 1000);
        onEnd();
      }
    }]);
    setTime(getTimeLeft(Config.Token.rebase.offset) * 1000);
    start();
  }

  render() {
    return (
      <React.Fragment>
        <div className="timer center-h">
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
      </React.Fragment>
    );
  }
}

const TimerHOC = withTimer({
    direction: 'backward',
    startImmediately: false,
})(CustomTimer);


export default TimerHOC;
