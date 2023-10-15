"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import axios from "axios";
import MarkdownForm from "@/components/MarkdownForm";

type Tag = {
  id: string;
  name: string;
};

export default function CreatePost() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [drop, setDrop] = useState<any | null>(null);

  useEffect(() => {
    const getTags = async () => {
      const { data } = await axios.get("/api/allTags");
      setTags(data);
    };
    getTags();
  }, []);

  const options = tags.map((tag) => tag.name); // getting tag dynamically from the database

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center">
        <h4 className="text-red-600 font-bold underline text-center">
          Add tags and images before creating the post
        </h4>
      </div>
      <div className=" w-9/12 mx-auto p-2 mt-2">
        <MarkdownForm />
      </div>
    </div>
  );
}
