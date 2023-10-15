"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default function DraftEdit({ params }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  async function getPost() {
    const { data } = await axios.get(`/api/getPost/${params.slug}`);
    console.log(data.post.title);
    setTitle(data.post.title);
    setContent(data.post.content);
    setSlug(data.post.slug);
  }

  useEffect(() => {
    getPost();
  }, []);

  const plugins = [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
  ];

  const editorRef = useRef<any>(null);

  async function handleUpdatePost() {
    if (!title || !content || !slug) alert("Please make some changes");
    try {
      const res = await axios.post(`/api/editPostDraft/${params.slug}`, {
        title: title,
        content: content,
        postSlug: slug,
      });
      if (res) alert("post saved as draft");
      router.push("/dashboard/posts");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <div>
      <h1 className="text-center text-xl text-gray-700 font-bold underline mt-5 mb-2">
        Edit you post and save it
      </h1>
      <div className="flex flex-col mt-5 p-2 lg:mx-24">
        <h2>Title</h2>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full"
        />
        <h2 className="mt-5">Content</h2>
        <Editor
          apiKey="vxlic3wfc8bfz5v1su3xivx9ohg4p8fl3yfex0gs9d3ac5g7"
          onInit={(_, editor) => (editorRef.current = editor)}
          init={{
            height: 400,
            menubar: true,
            plugins: plugins,
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={setContent}
          value={content}
        />
        <h2 className="mt-5">Slug</h2>
        <Input
          onChange={(e) => setSlug(e.target.value)}
          value={slug}
          className="w-full"
        />
        <button
          onClick={handleUpdatePost}
          className="bg-gray-800 hover:bg-gray-500 text-white p-1 rounded-md mt-5 transition-all delay-75"
        >
          Save as draft
        </button>
      </div>
    </div>
  );
}
