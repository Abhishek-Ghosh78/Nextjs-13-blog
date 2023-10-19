"use client";
import React from "react";
import { useSession } from "next-auth/react";
import LogoutBtn from "./LogoutBtn";
import Link from "next/link";

export default function AuthBtn() {
  const { status } = useSession();
  return (
    <>
      {status != "authenticated" ? (
        <Link href="/login" className="btn-ghost p-1 uppercase">
          Login
        </Link>
      ) : (
        <LogoutBtn />
      )}
      {status != "authenticated" ? (
        <Link href="/create" className="btn-ghost p-1 uppercase">
          SignUp
        </Link>
      ) : (
        <Link href="/dashboard" className="btn-ghost p-1 uppercase">
          Dashboard
        </Link>
      )}
    </>
  );
}
