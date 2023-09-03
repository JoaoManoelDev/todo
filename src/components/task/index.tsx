import { CheckCircle2 } from 'lucide-react'

import { ModalDeleteTask } from '../modal.delete-task'
import { useTaskStore } from '../../store/task-store'

import { ITask } from '../../App'
import styles from './task.module.css'

interface TaskProps {
  task: ITask
}

export function Task({ task }: TaskProps) {
  const { onComplete } = useTaskStore()

  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task.id)}
      >
        {task.isCompleted ? <CheckCircle2 /> : <div />}
      </button>

      <p className={task.isCompleted ? styles.textCompleted : ""}>
        {task.title}
      </p>

      <ModalDeleteTask task={task} />
    </div>
  )
}