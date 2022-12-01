import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const incrementGoodCount = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

   const incremenentOkCount = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const incrementBadCount = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const resetCount = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={incrementGoodCount}>good</button>
      <button onClick={incremenentOkCount}>ok</button>
      <button onClick={incrementBadCount}>bad</button>
      <button onClick={resetCount}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
