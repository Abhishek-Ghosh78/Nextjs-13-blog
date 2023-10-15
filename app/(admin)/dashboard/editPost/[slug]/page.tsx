"use client";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "antd";
import axios from "axios";

export default function page({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const getPostDetails = async () => {
      const { data } = await axios.get(`/api/getPost/${params.slug}`);
      // console.log(data);
      setTitle(data.title);
      setContent(data.content);
      setSlug(data.slug);
    };
    getPostDetails();
  }, []);

  async function handleUpdate() {
    try {
      await axios.post(`/api/editPost/${params.slug}`, {
        title,
        content,
        newSlug: slug,
      });
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

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

  return (
    <div className="">
      <h1 className="text-gray-600 text-2xl font-bold underline text-center mt-5">
        Edit your post here
      </h1>
      <div className="flex flex-col justify-center  mt-5 md:w-screen">
        <h1>Title</h1>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-2/3"
        />
        <h1>Content</h1>
        <Editor
          apiKey="vxlic3wfc8bfz5v1su3xivx9ohg4p8fl3yfex0gs9d3ac5g7"
          onInit={(_, editor) => (editorRef.current = editor)}
          init={{
            height: 400,
            width: 600,
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
        <h1 className="mt-5">Slug</h1>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-2/3"
        />
        <button
          className="p-2 bg-gray-700 hover:bg-gray-500 rounded-lg text-white mt-5"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
}
