"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          redirectTo: "/login",
        })
      }
      className="border px-2 py-1"
    >
      Logout
    </button>
  );
}