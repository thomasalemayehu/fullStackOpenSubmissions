import React,{ useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addFilterPhrase } from '../slices/filter.slice'

function Filter() {
  const dispatch = useDispatch()

  const formRef = useRef()

  const changeQueryFilter = () => {
    dispatch(addFilterPhrase(formRef.current.value))
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <input
      type="text"
      ref={formRef}
      onChange={changeQueryFilter}
      style={style}
    />
  )
}

export default Filter