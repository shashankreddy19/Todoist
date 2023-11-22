import React from 'react'
import { StatusTypes } from '../Redux/StatusTypes'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ShowList from './ShowList'

const Display = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  margin-top: 50px;
`

const ShowTasks = (props) => {
  // console.log("props.state",props.state)
  const statusTypes=StatusTypes()
  return (
    <Display>
      {statusTypes.map((st) => {
        return <ShowList header={st} dispatch={props.dispatch} />
      })}
    </Display>
  )
}

const mapState = (state) =>
{
  return {
    state : state
  }
}
const mapDispatch = (dispatch) =>
{
  return {
    dispatch : dispatch
  }
}

export default connect(mapState,mapDispatch)
(ShowTasks)
