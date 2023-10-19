"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <>
      {" "}
      <button onClick={() => signOut()} className="btn-error uppercase">
        LogOut
      </button>
    </>
  );
}
