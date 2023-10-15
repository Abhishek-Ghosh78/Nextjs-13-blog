"use client";
import React, { useState, useEffect } from "react";
import handleUpload from "@/actions/uploadAction";

export const Form = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [slug, setSlug] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
      // console.log(e.target.files[0]);
    }
  }

  return (
    <div>
      <form
        action={handleUpload}
        className="flex flex-col space-y-2 justify-center items-center p-2"
      >
        <input name="file" type="file" onChange={handleFile} />
        <input
          name="title"
          type="text"
          placeholder="enter title"
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 w-1/2 border border-orange-400"
          value={title}
        />
        <input
          name="content"
          type="text"
          placeholder="enter title"
          onChange={(e) => setContent(e.target.value)}
          className="p-2 w-1/2 border border-blue-400"
          value={content}
        />
        <input
          name="slug"
          type="text"
          onChange={(e) => setSlug(e.target.value)}
          className="p-2 w-1/2 border border-blue-400"
          placeholder="enter slug"
          value={slug}
        />

        <button
          className="border border-orange-500 rounded-lg p-2 w-1/3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
