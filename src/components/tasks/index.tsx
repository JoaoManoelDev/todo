import { ClipboardList } from 'lucide-react'

import { Task } from "../task"
import { useTaskStore } from '../../store/task-store'

import styles from './tasks.module.css'

export function Tasks() {
  const { tasks } = useTaskStore()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.isCompleted).length

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tarefas criadas</p>
          <span>{totalTasks}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Concluídas</p>
          <span>
            {completedTasks} de {totalTasks}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
          />
        ))}

        {tasks.length <= 0 && (
          <section className={styles.empty}>
            <ClipboardList size={50} />
            <div>
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}