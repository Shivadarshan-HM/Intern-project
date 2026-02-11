import axios from 'axios'

const API_URL = '/api/tasks/'

// Get tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(API_URL, config)
  return res.data
}

// Create task
const createTask = async (title, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.post(API_URL, { title }, config)
  return res.data
}

// Delete task
const deleteTask = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  await axios.delete(API_URL + id, config)
}

export default {
  getTasks,
  createTask,
  deleteTask,
}
