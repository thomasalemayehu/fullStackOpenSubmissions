import React, { useRef } from 'react'
import { addFilterPhrase } from '../slices/filter.slice'
import { connect } from 'react-redux'

function Filter(props) {
  const formRef = useRef()

  const changeQueryFilter = () => {
    props.addFilterPhrase(formRef.current.value)
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

const mapDispatchToProps = {
  addFilterPhrase,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
