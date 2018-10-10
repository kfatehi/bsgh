import React from 'react'
import { connect } from 'react-redux';
import { executeQuery } from '../actions';

const Search = ({ value, handleChange }) => {
  return <input className="Search" type="text" placeholder="Search repositories..." value={value} onChange={e=>handleChange(e)} />
}

const mapStateToProps = (state, ownProps) => ({
  value: state.query
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChange: (e)=>dispatch(executeQuery(e.target.value))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
