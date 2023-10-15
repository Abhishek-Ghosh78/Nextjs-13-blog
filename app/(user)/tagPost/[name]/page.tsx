"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";

type Props = {
  params: {
    name: string;
  };
};

type Post = {
  title: string;
  content: string;
  tagName: string;
  slug: string;
  status: string;
  createdAt: string;
};

export default function TagPost({ params }: Props) {
  const [posts, setPosts] = useState<Post[] | null>();
  async function getPosts() {
    try {
      const { data } = await axios.get("/api/getPosts");
      setPosts(data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts?.map((post) => (
        <div>
          {post.tagName == params.name && (
            <div>
              <img src="" alt="" />
              <h1>{post.title}</h1>
              <p>{post.tagName}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
