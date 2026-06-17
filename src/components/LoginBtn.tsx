"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      identifier: "igmoni",
      password: "Mon@9019",
      redirect: false,
    });

    console.log(result);

    if (result?.ok) {
      router.push("/app/today");
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}