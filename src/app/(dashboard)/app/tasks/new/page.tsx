"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormDataType } from "@/types/FormDataType";
import { TaskPriority } from "@/generated/prisma/enums";
import { createTask } from "@/actions/task-actions";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const texts = ["Add a task", "Eg: Project Setup", "Eg: Debug the codebase"];

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
  });

  const [placeholderText, setPlaceholderText] = useState(texts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * texts.length);
      setPlaceholderText(texts[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const task = await createTask(formData);

      if (task) {
        toast.success("Task Created");

        setTimeout(() => {
          router.push("/app/today");
        }, 1500);
      }
    } catch {
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData?.title}
          onChange={(e) =>
            setFormData((p) => ({ ...p, title: e.target.value }))
          }
          placeholder={placeholderText}
        />
        <input
          type="text"
          onChange={(e) =>
            setFormData((p) => ({ ...p, description: e.target.value }))
          }
          value={formData?.description}
          placeholder="Add a description about task"
        />

        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              priority: e.target.value as TaskPriority,
            }))
          }
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          type="date"
          value={formData?.dueDate}
          onChange={(e) =>
            setFormData((p) => ({ ...p, dueDate: e.target.value }))
          }
          placeholder="Due Date"
        />

        <button type="submit">Add a task</button>
      </form>
    </div>
  );
};

export default page;
