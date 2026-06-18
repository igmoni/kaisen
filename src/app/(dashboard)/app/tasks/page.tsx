import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const tasks = await prisma.task.findMany({
    where: { userId },
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-2">

      {tasks.map((task) => (
        <div key={task.id} className="flex flex-col gap-2 border">
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.status}</p>
          <p>{task.priority}</p>
          {/* <p>{task.dueDate ? task.dueDate : null}</p> */}
        </div>
      ))}
      </div>
    </div>
  );
};

export default page;
