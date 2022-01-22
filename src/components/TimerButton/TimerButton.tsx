import React, {Dispatch, SetStateAction} from 'react';
import {Queue} from '../../hooks/useQueue';

type Props = {
  value: number;
  handleLog: Dispatch<SetStateAction<Queue[]>>;
}

const TimerButton = ({value, handleLog}: Props): JSX.Element => {
  const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();

    const promise = () => {
      let id: NodeJS.Timeout | null = null;

      const promise = new Promise<string>((resolve) => {
        return id = setTimeout(() => resolve(`${value} / ${time}`), 1000 * value)
      });

      return { id, promise }
    }

    handleLog((prev) => [
      ...prev,
      promise
    ])
  }

  return <button onClick={handleClick}>Таймер {value}</button>;
};

export default TimerButton;