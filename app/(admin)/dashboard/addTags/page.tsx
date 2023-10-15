"use client";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";

type Tag = {
  id: number;
  tagName: string;
};

export default function AddTags() {
  const [tag, setTag] = useState("");
  const [allTags, setAllTags] = useState<Tag[]>([]);
  useEffect(() => {
    async function getTags() {
      const res = await fetch("/api/allTags", {
        method: "GET",
      });
      const data = await res.json();
      setAllTags(data);
    }
    getTags();
  }, [allTags]);

  async function hanldeTag() {
    try {
      await axios.post("http://localhost:3000/api/createTags", { tag });
    } catch (error: any) {
      console.error(error.response.data);
    }
    setTag("");
  }

  async function handleDelete(id: number) {
    try {
      await axios.post(`http://localhost:3000/api/deleteTags/${id}`);
    } catch (error: any) {
      console.error(error.response.error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20 border border-gray-400 p-8 w-1/2 mx-auto">
      <div className="flex flex-col">
        <Input
          className="p-2 w-max"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter your tag.."
        />
        <button
          className="mt-2 p-2 border border-gray-200 bg-slate-500"
          onClick={hanldeTag}
        >
          Add Tag
        </button>
      </div>
      <div className="mt-10">
        <h1>
          Available Tags:{" "}
          <span className="text-red-500">Your tag should be unique</span>
        </h1>
        <div>
          {allTags.map((tag) => (
            <div key={tag.id} className="flex items-center">
              <h2>{tag.tagName}</h2>
              <CiCircleRemove
                className="cursor-pointer ml-2"
                onClick={() => handleDelete(tag.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
