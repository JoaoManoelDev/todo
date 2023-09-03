import { create } from 'zustand'

interface Task {
  id: string
  title: string
  isCompleted: boolean
}

interface TaskStore {
  tasks: Task[]
  onAddTask: (taskTitle: string) => void
  loadSavedTasks: () => void
  onDeleteTask: (taskId: string) => void
  onComplete: (taskId: string) => void
}

const LOCAL_STORAGE_KEY = 'todo:savedTasks'

export const useTaskStore = create<TaskStore>(set => {
  return {
    tasks: [],
    
    loadSavedTasks() {
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (savedTasks) {
        set({ tasks: JSON.parse(savedTasks) })
      }
    },

    onAddTask(taskTitle) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }

      set(state => {
        const newArrayTasks = [...state.tasks, newTask]
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArrayTasks))
        return { tasks: newArrayTasks }
      })
    },

    onDeleteTask(taskId) {
      set(state => {
        const newArrayTasks = state.tasks.filter(task => task.id !== taskId)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArrayTasks))
        return { tasks: newArrayTasks }
      })
    },
    
    onComplete(taskId) {
      set(state => {
        const newArrayTasks = state.tasks.map(task => {
          if(task.id === taskId) {
            return {
              ...task,
              isCompleted: !task.isCompleted
            }
          }          
          return task
        })

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArrayTasks))
        return { tasks: newArrayTasks }
        
      })
    }

  }
})