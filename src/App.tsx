import React from 'react'
import { hot } from 'react-hot-loader/root'
import TimerButton from './components/TimerButton/TimerButton';
import css from './App.module.css';
import ResetButton from './components/ResetButton/ResetButton';
import LogBlock from './components/LogBlock/LogBlock';
import { useQueue } from './hooks/useQueue';

export const App = hot(_App)
export function _App(): JSX.Element {
  const { log, addQueue, setReset } = useQueue();

  return (
    <div className={css.wrapper}>
      <div>
        <div className={css.buttons}>
          {[1, 2, 3, 4].map(item => <TimerButton key={item} value={item} handleLog={addQueue} />)}
        </div>
        <ResetButton className={css.buttons} handleReset={setReset} />
      </div>
      <LogBlock text={log}/>
    </div>
  )
}