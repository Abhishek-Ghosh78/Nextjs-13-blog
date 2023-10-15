"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

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

function Posts() {
  const [posts, setPosts] = useState<Post[] | null>([]);
  const router = useRouter();
  const [postStatus, setPostStatus] = useState("");

  useEffect(() => {
    async function getPosts() {
      const { data } = await axios.get("/api/getPosts");
      setPostStatus(data.map((ps: any) => setPostStatus(ps.status)));
      setPosts(data);
    }
    getPosts();
  }, [postStatus]);

  async function handlePostDelete(id: string) {
    try {
      const result = confirm("Are you sure");
      if (result == true) {
        const res = await axios.post(`/api/deletePost/${id}`);
        if (res) alert("Post deleted successfully");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  function handlePostEdit(slug: string) {
    router.push("/dashboard/de/" + slug);
  }

  function truncateContent(content: any, maxLength: any) {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  }

  return (
    <div className="">
      <h1 className="font-bold text-2xl underline text-center mt-5">
        Your Posts
        <span className="ml-4">: Here are all the published posts</span>
      </h1>
      <div className="flex justify-evenly items-center mt-5 font-bold  text-gray-600">
        <div className="text-xl">
          <h1>Title</h1>
        </div>
        <div>
          <h1 className="text-xl">Date</h1>
        </div>
        <div>
          <h1 className="text-xl">Options</h1>
        </div>
      </div>
      <hr className="w-1/2 mx-auto mt-2" />
      {posts?.map((post, index) => (
        <div key={post.id}>
          {post.status == "published" && (
            <div className="flex justify-evenly mt-5">
              <h1>{index + 1}</h1>
              <div>
                <h1 className="text-sm md:text-lg">
                  {truncateContent(post.title, 15)}
                </h1>
              </div>
              <div>
                <h1 className="text-sm md:text-lg">
                  createdAt: {post.createdAt}
                </h1>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handlePostDelete(post.id)}
                  className="p-1  rounded-sm text-xs md:text-md"
                >
                  <MdDeleteOutline className="text-xl" />
                </button>
                <button
                  onClick={() => handlePostEdit(post.slug)}
                  className="p-1  rounded-sm text-xs md:text-md"
                >
                  <FiEdit2 className="text-lg" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Posts;
