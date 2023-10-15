import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

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

export default function CreateEditor() {
  const [content, setContent] = useState("");
  const editorRef = useRef<any>(null);
  return (
    <>
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
    </>
  );
}
