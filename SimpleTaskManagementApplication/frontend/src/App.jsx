
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState("")
  const [description,setDescription] = useState("")
  const [editingId, setEditingId] = useState(null)

  const fetchTasks = async () => {
    const res= await fetch('/tasks')
    const data = await res.json()
    setTasks(data)
  }

  useEffect(()=>{
    fetchTasks()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(editingId !== null){
      await fetch(`/tasks/${editingId}`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({name,description})
      })
      setEditingId(null)
    }else{
      await fetch('/tasks',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({name,description})
      })
    }
    setName("")
    setDescription("")
    fetchTasks()
  }

  const handleEdit = (task) => {
    setName(task.name)
    setDescription(task.description)
    setEditingId(task.id)
  }
  const handleDelete =async (id) => {
    await fetch(`/tasks/${id}`, {method:'DELETE'})
    fetchTasks()
  }
  return (
    <>
      <div className="container">
        <h1>Add New Task</h1>
        <form onSubmit={handleSubmit} className='task-form'>
          <div className="top-row">
            <input 
            type='text'
            placeholder='TaskName'
            value={name}
            onChange={(e)=> setName(e.target.value)}
            
          />
          <button className='main-button' type='submit'>
            {editingId ? 'Update Task':'Add Task'}
          </button>

          </div>
            
          
          <input 
            type='text'
            placeholder='Description'
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            
          />
            
        </form>
        <h2>Task List</h2>
        {tasks.map((task)=>(
          <div className="task-item" key={task.id}>
          <div className="task-container">
            <strong>{task.name}</strong>
            <p>{task.description}</p>
          </div>
          <div className='task-btn'>
            <button className='edit-button' onClick={()=> handleEdit(task)}>Edit</button>
            <button className='delete-button' onClick={()=>handleDelete(task.id)}>Delete</button>
          </div>
          </div>
        ))}
        
        

      </div>
    </>
  )
}

export default App
