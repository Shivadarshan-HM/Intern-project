import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaPlus, FaTrash, FaTasks } from 'react-icons/fa'

function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth)

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userInfo) fetchTasks()
  }, [userInfo])

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const res = await axios.get('/api/tasks', config)

      setTasks(res.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load tasks')
      setLoading(false)
    }
  }

  // Add task
  const submitHandler = async (e) => {
    e.preventDefault()

    if (!title) return

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post('/api/tasks', { title }, config)

      setTitle('')
      fetchTasks()
    } catch (err) {
      setError('Failed to add task')
    }
  }

  // Delete task
  const deleteHandler = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.delete(`/api/tasks/${id}`, config)

      fetchTasks()
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  return (
    <div className="container-fluid px-3 px-md-5 py-4">


      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-0">
            Welcome, {userInfo?.name} 👋
          </p>
        </div>

        <div className="badge bg-primary fs-6 p-2">
          <FaTasks className="me-1" />
          {tasks.length} Tasks
        </div>
      </div>

      {/* Add Task Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <form
            onSubmit={submitHandler}
            className="d-flex gap-2"
          >
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="What do you want to work on?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary btn-lg"
            >
              <FaPlus />
            </button>
          </form>

        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" />
        </div>
      )}

      {/* Task List */}
      {!loading && tasks.length > 0 && (
        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">

            {tasks.map((task) => (
              <li
                key={task._id}
                className="list-group-item d-flex justify-content-between align-items-center py-3"
              >
                <span className="fw-medium">
                  {task.title}
                </span>

                <button
                  onClick={() => deleteHandler(task._id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  <FaTrash />
                </button>
              </li>
            ))}

          </ul>
        </div>
      )}

      {/* Empty State */}
      {!loading && tasks.length === 0 && (
        <div className="text-center py-5 text-muted">
          <FaTasks size={50} className="mb-3" />
          <h5>No tasks yet</h5>
          <p>Start by adding your first task 🚀</p>
        </div>
      )}

    </div>
  )
}

export default Dashboard
