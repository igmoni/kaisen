"use client";
import Login from "@/components/LoginBtn";
import { FormType } from "@/types/FormDataType";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormType>({
    identifier: "",
    password: "",
  });

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      identifier: form.identifier,
      password: form.password,
      redirect: false,
    });

    console.log(result);

    if (result?.ok) {
      router.push("/app/today");
    }
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      Login
      <form onSubmit={handleLogin} className="flex flex-col border">
        <input
          type="text"
          value={form.identifier}
          placeholder="Email or username"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, identifier: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default page;
