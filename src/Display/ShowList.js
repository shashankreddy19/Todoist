import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { del, update } from '../Redux/ActionTypes'
import { useDrag, useDrop } from 'react-dnd'
import store from '../Redux/Store'

const SubList = styled.div`
    /* background-color: brown; */
    border: 1px solid brown;
    border-radius: 5px;
    padding: 10px;
    width: 100px;
    color: aliceblue;
`
const Header = styled.div`
    background-color: black;
    padding: 10px;
    border-radius: 5px;
`

const Body = styled.div`
    /* background-color: bisque; */
`
const ListElements = styled.p`
    display: flex;
    background-color: bisque;
    color: black;
    align-items: center;
    justify-content: space-between;
    border: 1px solid aliceblue;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid brown;
    opacity: ${props => props.isDragging ? "0" : '100'} ;
    cursor: grab;
    &:hover{
        box-shadow: 0px 1px 1px grey;
    }

`
const ShowList = ({ header, dispatch }) => {
    const [{ isOver },drop] = useDrop(()=>
    ({
        accept: "task",
        drop : (item) => addItemWhenDragged(item),
        collect: (monitor) => ({
            isOver : !!monitor.isOver(),
        }),
    }))
    const addItemWhenDragged = (item) =>
    {
        dispatch({ type: update, data: { task : item.id ,status : header}})
    }
    return (
        <SubList ref={drop} isOver={isOver}>
            <Head header={header} />
            <B header={header} dispatch={dispatch} />
        </SubList>
    );
}

const Head = ({header}) =>
{
    return (
        <Header>{header}</Header>
    )
}

const ShowTaskName = ({task,dispatch,status}) =>
{
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item : {id : task,status : status},
        collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
        })
    }))
    return <ListElements ref={drag} isDragging={isDragging}>{task}
            <button onClick={ ()=> dispatch({type : del , data :{task : task}})} style={{color: 'black' , borderRadius:"5px", backgroundColor: "azure" , boxShadow:"0px 0.1px 2px grey", cursor:"pointer"}}>del</button>    
    </ListElements>
}
    

const B = ({header,dispatch}) =>
{
    return (
        <Body>
            {   
                store.getState().map((st) =>
                {
                    if(st.status===header)
                    return <ShowTaskName task={st.task} dispatch={dispatch} status={header} />
                })
            }
        </Body>
    )    
}

export default ShowList
