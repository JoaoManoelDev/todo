import { useState } from "react"
import { Trash, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

import { useTaskStore } from "../../store/task-store"
import { ITask } from "../../App"

import styles from "./modal-delet-task.module.css"

interface ModalDeleteTaskProps {
  task: ITask
}

export function ModalDeleteTask({ task }: ModalDeleteTaskProps) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { onDeleteTask } = useTaskStore()

  return (
    <Dialog.Root open={isOpenModal} onOpenChange={setIsOpenModal} >
      <Dialog.Trigger asChild>
        <button className={styles.deleteButton}>
          <Trash size={20} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />

        <Dialog.Content className={styles.dialogContent}>
          <div className={styles.containerClose}>
            <Dialog.Close asChild>
              <button type="button">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Title className={styles.dialogTitle}>
            Deletar tarefa?
          </Dialog.Title>

          <Dialog.Description className={styles.dialogDescription}>
            Ao confirmar você deletara permanentemente a tarefa!
          </Dialog.Description>

          <div className={styles.containerButtons}>
            <button
              className={styles.buttonCancel}
              type="button"
              onClick={() => setIsOpenModal(false)}
            >
              Voltar
            </button>

            <Dialog.Close asChild>
              <button
                onClick={() => onDeleteTask(task.id)}
                className={styles.buttonDeleteConfirm}
                type="button">
                  Confirmar
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}