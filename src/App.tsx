import { useEffect } from "react"
import { Header } from "./components/header"
import { Tasks } from "./components/tasks"
import { useTaskStore } from "./store/task-store"

export interface ITask {
  id: string
  title: string
  isCompleted: boolean
}

function App() {
  const { loadSavedTasks } = useTaskStore()

  useEffect(() => {
    loadSavedTasks()
  }, [loadSavedTasks])

  return (
    <>
      <Header />
      <Tasks />
    </>
  )
}

export default App
