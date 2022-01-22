import React from 'react';
import css from './LogBlock.module.css';

type Props = {
  text?: string[];
}

const LogBlock = ({text}: Props): JSX.Element => {
  return (
    <div>
      <h4 className={css.caption}>Логи</h4>
      <textarea className={css.width} rows={10} defaultValue={text?.join('\n')} />
    </div>
  );
};

export default LogBlock;