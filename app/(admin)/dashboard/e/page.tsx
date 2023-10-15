"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
  imageName: string;
  tagName: string;
  status: string;
  createdAt: string;
};
export default function EditPost() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const route = useRouter();
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get("/api/getPosts");
        console.log(data);
        setPosts(data);
      } catch (error: any) {
        throw new Error(error);
      }
    }
    getPosts();
  }, []);

  function handlePostEdit(slug: string) {
    // console.log(slug)
    route.push("/dashboard/de/" + slug);
  }

  return (
    <div>
      <h1 className="text-center">Your Posts</h1>
      <div className="flex justify-evenly items-center mt-5">
        <div>
          <h1>Title</h1>
        </div>
        <div>
          <h1>Date</h1>
        </div>
        <div>
          <h1>Options</h1>
        </div>
      </div>
      <hr className="w-1/2 mx-auto mt-2" />
      {posts?.map((post, index) => (
        <div key={index}>
          {post.status == "published" && (
            <div className="flex justify-evenly items-center mt-5">
              <h1>{index + 1}</h1>
              <div>
                <h1 className="text-sm md:text-lg">{post.title}</h1>
              </div>
              <div className="text-sm md:text-lg">
                createdAt: {post.createdAt}
              </div>
              <div>
                <button
                  onClick={() => handlePostEdit(post.slug)}
                  className="bg-orange-600 text-white hover:bg-orange-400 rounded-sm p-1 text-xs md:text-md"
                >
                  Edit Post
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
