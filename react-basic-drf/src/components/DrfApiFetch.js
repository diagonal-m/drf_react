import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState([])
  const [editedTask, setEditedTask] = useState({id: '', title: ''})
  const [id, setId] = useState(1)

  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks/', {
      headers: {
        'Authorization': 'Token b9be0cb85a1ab69fda8014aad6c1fa1e6a0f2962'
      }
    })
    .then(res => setTasks(res.data))
  }, [])

  const getTask = () => {
    axios.get(`http://localhost:8000/api/tasks/${id}/`, {
      headers: {
        'Authorization': 'Token b9be0cb85a1ab69fda8014aad6c1fa1e6a0f2962'
      }
    })
    .then(res => setSelectedTask(res.data))
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/api/tasks/${id}/`, {
      headers: {
        'Authorization': 'Token b9be0cb85a1ab69fda8014aad6c1fa1e6a0f2962'
      }
    })
    .then(res => {setTasks(tasks.filter(task => task.id !== id)); setSelectedTask([])})
  }

  const newTask = (task) => {
    const data = {
      title: task.title
    }
    axios.post(`http://localhost:8000/api/tasks/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token b9be0cb85a1ab69fda8014aad6c1fa1e6a0f2962'
      }
    })
    .then(res => setTasks([...tasks, res.data]))
  }

  const handleInputChange = () => evt => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({...editedTask, [name]:value})
  }

  return (
    <div>
      <ul>
        {
          tasks.map(task => <li key={task.id}> {task.title} {task.id} 
          <button onClick={()=>deleteTask(task.id)}>
            <i className="fas fa-trash-alt"></i>
          </button>

          </li>)
        }
      </ul>

      Set id <br/>
      <input type='text' value={id} onChange={evt=>{setId(evt.target.value)}}/>
      <br/>
      <button type='button' onClick={()=>getTask()}>Get task</button>
      {/* <button type='button' onClick={()=>deleteTask()}>Delete</button> */}
      <h3>{selectedTask.title} {selectedTask.id}</h3>

      <input type="text" name="title" value={editedTask.title} onChange={handleInputChange()} placeholder="New task?" required/>
      <button onClick={()=>newTask(editedTask)}>Create</button>
    </div>
  )
}

export default DrfApiFetch
