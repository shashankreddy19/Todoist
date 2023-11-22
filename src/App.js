import React, { useState } from 'react'
import ShowTasks from './Display/showTasks'
import {Provider} from "react-redux"
import store from './Redux/Store'
import { add } from './Redux/ActionTypes'
import styled from 'styled-components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const MainContainer = styled.div`
  /* border: 2px solid black; */
  position:absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  /* height: 500px; */
  padding: 50px;
  transform: translate(-50%,-50%);
`
const Form = styled.form`
  position: relative;
  top: 50%;
  left: 50%;
  width: fit-content;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid brown;
  transform: translate(-50%,-50%);
`

const App = () => {
  const [task, setTask] = useState();
  const handleSubmit = (e) =>
  {
    e.preventDefault()
    store.dispatch({type : add ,data : {taskName : task,status : 'to-do'}})
    setTask("")
  }
  // console.log(store.getState())
  return (
    <DndProvider backend={HTML5Backend}>
      <MainContainer>
        <Form onSubmit={handleSubmit} >
          <input style={{ borderStyle: "none " , borderBottom: "1px solid black"}} type='text' value={task} onChange={(e) => {setTask(e.target.value) }} />
          <button style={{backgroundColor:"black",color : "azure", borderRadius: "5px", cursor: "pointer  "}} type='submit'>Submit</button>
        </Form>
        <Provider key={task} store={store}>
          <ShowTasks />
        </Provider>
        </MainContainer>
      </DndProvider>
  )
}

export default App