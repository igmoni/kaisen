"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { TaskStatus } from "@/generated/prisma/enums";
import { FormDataType } from "@/types/FormDataType";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTask = async ({
  title,
  description,
  priority,
  dueDate,
}: FormDataType) => {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized request");
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      dueDate: new Date(dueDate),
      userId,
      status: TaskStatus.TODO,
    },
  });

  if (!task) {
    throw new Error("Couldn't create the task");
  }

  revalidatePath("/app");

  redirect("/app/today");
};
