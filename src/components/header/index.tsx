import { ChangeEvent, FormEvent, useState } from 'react'

import { useTaskStore } from '../../store/task-store'

import todoLogo from '../../assets/todo-logo.svg'
import styles from './header.module.css'

export function Header() {
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const { onAddTask } = useTaskStore()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!title) {
      setError("A tarefa não pode estar vazia")
      console.log("tarefa vazia")
      return
    }

    onAddTask(title)

    setTitle("")
    setError("")
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="logo todo" />

      <form className={styles.newTaskForm}>
        <input
          type='text'
          placeholder='Adicionar tarefa'
          value={title}
          onChange={onChangeTitle}
        />

        <button onClick={handleSubmit}>
          Criar
        </button>
      </form>

      <div className={styles.errorContainer}>
        {error ? <p>{error}</p> : <div />}
      </div>
    </header>
  )
}