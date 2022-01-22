import React from 'react';

type Props = {
  value: number;
  handleLog: (string) => void;
}

const TimerButton = ({value, handleLog}: Props): JSX.Element => {
  const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();

    handleLog((prev) => [
      ...prev,
      () => new Promise((resolve) => {
        setTimeout(() => resolve(`${value} / ${time}`), 1000 * value)
      })
    ])
  }

  return <button onClick={handleClick}>Таймер {value}</button>;
};

export default TimerButton;