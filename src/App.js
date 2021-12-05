import { useRef, useState,useEffect } from 'react';
import Display from './Display'
import Animate from './Animate'
import './App.css';

function App() {

  const [filter,setFilter] = useState([])
  const [status,setStatus] = useState('all')
  const [input,setInput] = useState('')
  const [todos,setTodos] = useState(JSON.parse(localStorage.getItem('todosApp'))||[])
  const inputRef = useRef()
  function handleAdd()
  {
    if(input==='')return
    setTodos([{title:input,completed:false,id:Math.random().toString(36).substr(2,9)},...todos])
    setInput('')
    inputRef.current.focus()
  }
  function handleDelete(id)
  {
    setTodos(todos.filter((item)=>item.id!==id))
  }
  function handleToggle(id)
  {
    const arr = [...todos]
    arr.forEach((item)=>{
      if(item.id===id)
      {
        item.completed=!item.completed
      }
    })
    setTodos(arr)
  }
  function handleFilter()
  {
    switch(status)
    {
      case 'completed':
        setFilter(todos.filter((item)=>item.completed))
        break
      case 'uncompleted':
        setFilter(todos.filter((item)=>!item.completed))
        break
      default:
        setFilter(todos)
    }
  }
  useEffect(()=>{
    handleFilter()
    localStorage.setItem('todosApp',JSON.stringify(todos))
    console.log(todos)
  },[status,todos])
  return (
    <div className="App">
      <Animate/>
      <Display 
        ref={inputRef}
        input={input} 
        // todos={todos}
        filter={filter}
        setInput={setInput}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        setStatus={setStatus}
      />
    </div>
  )
}

export default App;
