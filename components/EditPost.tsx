import React, { useEffect, useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Input } from "antd";
import axios from "axios";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const getPostDetails = async () => {
      const { data } = await axios.get("");
    };
  }, []);

  return <div>EditPost</div>;
}
