import React,{useState} from 'react'
import ToDoForm from './ToDoForm'
import ToDo from './ToDo'

function ToDoList() {

    const [todos,setTodos] = useState([]);

    const addTodo = todo =>{
        if (!todo.text || /^\s*$/.test(todo.text)){
            return
        }
        const newTodos = [todo,...todos]

        setTodos(newTodos)
    };

    const updateTodo = (todoId, newValue)=>{
        if (!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }
        setTodos(prev=>prev.map(item=>(item.id === todoId ? newValue : item)))
    }

    const removeTodo = id =>{
        const removeArr = [...todos].filter(todo=> todo.id!== id)

        setTodos(removeArr)
    }


    const completeToDo = id =>{
        let updatedTodos = todos.map(todo=>{
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos);// Updates the page to show your to do list
    }

    return (
        <div>
            <h1>Any plans for today?</h1>
            <ToDoForm onSubmit={addTodo} />
            <ToDo  todos ={todos} completeToDo={completeToDo}
            removeTodo = {removeTodo}
            updateTodo = {updateTodo}
            />
        </div>
    )
}

export default ToDoList