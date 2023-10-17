"use client";

import axios, { Axios } from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import moment from "moment";

type Post = {
  id: string;
  title: string;
  content: string | "";
  slug: string;
  createdAt: string;
  status: string;
  imageName: string;
};

type Props = {
  postId: string;
  imageName: string;
  imageUrl: string;
};

export default function AllPosts() {
  const [posts, setPosts] = useState<Post[] | null>();
  const [post, setPost] = useState<Post | null>();

  const [images, setImages] = useState<Props[]>();
  const [image, setImage] = useState<Props>();
  const router = useRouter();
  async function getPosts() {
    try {
      const { data } = await axios.get("/api/getPosts");
      // console.log(data);
      setPosts(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function getImages() {
    const { data } = await axios.get("/api/allPostImage");
    // console.log(data);
    setImages(data);
  }

  useEffect(() => {
    getPosts();
    getImages();
  }, []);

  function handlePost(slug: string) {
    router.push("p/" + slug);
  }

  function truncateContent(content: any, maxLength: any) {
    if (content.length > maxLength) {
      // If content length exceeds maxLength, truncate it and add "..."
      return content.substring(0, maxLength) + "...";
    }
    return content;
  }

  return (
    <div className="flex md:flex-row flex-col justify-center items-center mx-auto p-2">
      {posts?.map((post) => (
        <div key={post.id} className="lg:w-1/4 md:w-1/2 mx-5">
          {images?.map((img) => (
            <div key={img.postId}>
              {post.id == img.postId && post.status == "published" && (
                <div className="mt-10">
                  <div className="">
                    <Image
                      src={`https://ztech18.s3.amazonaws.com/images/${img?.imageName}`}
                      alt=""
                      className="rounded-md shadow-lg shadow-slate-200"
                      width={500}
                      height={500}
                      priority
                    />
                    <h1 className="text-xl md:text-md">
                      {truncateContent(post.title, 40)}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {moment(post.createdAt).format("YYYY-MM-DD")}
                    </p>
                    <button
                      onClick={() => handlePost(post.slug)}
                      className="btn-ghost btn-sm"
                    >
                      Read More..
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
