import React from 'react';

type Props = {
  className: string;
  handleReset: () => void;
}

const ResetButton = ({className, handleReset}: Props): JSX.Element => {
  return (
    <div className={className}>
      <button onClick={handleReset}>Сбросить</button>
    </div>
  );
};

export default ResetButton;