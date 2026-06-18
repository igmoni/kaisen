import { TaskPriority } from "@/generated/prisma/enums"

export type FormDataType = {
    title: string
    description: string
    dueDate: string
    priority: TaskPriority
}

export type FormType = {
    identifier: string,
    password: string
}