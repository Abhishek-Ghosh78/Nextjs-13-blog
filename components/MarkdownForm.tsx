import React, { useEffect, useRef, useState } from "react";
import MDEditor, { image } from "@uiw/react-md-editor";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Input } from "antd";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DatePicker from "./DatePicker";
import CreateEditor from "./Editor";
import { Editor } from "@tinymce/tinymce-react";

type Image = {
  id: number;
  imageUrl: string;
  imageName: string;
};

type Tag = {
  id: number;
  tagName: string;
};

export default function MarkdownForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState("");
  // const [postID, setPostID] = useState<number>();

  useEffect(() => {
    async function getImages() {
      const { data } = await axios.get("/api/getImage");
      setImages(data);
    }
    getImages();
    const getTags = async () => {
      const { data } = await axios.get("/api/allTags");
      setTags(data);
    };
    getTags();
  }, []);

  async function handlePost() {
    try {
      const { data } = await axios.post("/api/createPost", {
        title: title,
        content: content,
        slug: slug,
        imageName: image,
        tagName: tag,
      });

      console.log(data.postId);
      await axios.post("/api/imagePost", {
        postId: data.postId,
        imageName: image,
      });
      if (data) alert("post created successfully");
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  const options = images.map((image) => image.imageName);

  const opt = tags.map((tag) => tag.tagName);

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
    <>
      <div>
        <h2 className="font-bold text-gray-700 underline p-2">
          <u>Add Image</u>
        </h2>
        <Dropdown
          options={options}
          className="w-full mb-10"
          onChange={(e) => {
            setImage(e.value);
          }}
        />
        <h2>Title</h2>
        <Input
          className="mb-5"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter title"
        />
        <h2>Content</h2>
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
        />
        <h2 className="mt-5">Slug</h2>
        <Input
          placeholder="Enter slug"
          onChange={(e) => setSlug(e.target.value)}
          value={slug}
        />
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="font-bold text-gray-700 underline p-2">Add tag</h2>
          <Dropdown options={opt} onChange={(e) => setTag(e.value)} />
        </div>
        {/* to publish or post */}
        <div className="flex justify-around items-center mt-5 p-2 mb-20">
          <div>
            <button
              onClick={handlePost}
              className="bg-gray-700 hover:bg-gray-500 text-white p-2 border border-rounded"
            >
              Save
            </button>
          </div>
          {/* <div>
            <h1>Schedule</h1>
            <DatePicker />
            <button className="bg-gray-700 hover:bg-gray-500 text-white p-2 ml-4">
              Update
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
