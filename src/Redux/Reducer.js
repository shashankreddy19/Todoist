
const newTask = ({taskName,status}) =>
{
    return {task : taskName,status : status}
}

const Reducer = (state,action) => {
    switch (action.type)
    {
        case "ADD":
            return[...state,newTask(action.data)]
        case "DELETE":
            // console.log(action.data.task)
            return state.filter((st) => st.task !== action.data.task)
        case "UPDATE":
            // console.log(action.data.task)
            return state.map((st) =>
                {
                    if (st.task === action.data.task) {
                        return { ...st, status : action.data.status }
                    }
                    else return st;
                })
        default:
            return state
    }
}

export default Reducer
