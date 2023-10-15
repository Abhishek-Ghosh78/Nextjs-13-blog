"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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

export default function filterPosts() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [posts, setPosts] = useState<Post[]>();
  const [images, setImages] = useState<Props[]>();
  const [error, setError] = useState(false);
  const router = useRouter();

  async function getPosts() {
    setError(false);
    try {
      const { data } = await axios.get(
        `/api/findPostByTag?search=${search}`,
        {}
      );
      setPosts(data);
      console.log(data);
    } catch (error) {
      setError(true);
    }
  }

  async function getImages() {
    setError(false);
    try {
      const { data } = await axios.get("/api/allPostImage");
      setImages(data);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    getPosts();
    getImages();
  }, [search]);

  function truncateContent(content: any, maxLength: any) {
    if (content.length > maxLength) {
      // If content length exceeds maxLength, truncate it and add "..."
      return content.substring(0, maxLength) + "...";
    }
    return content;
  }

  function handlePost(slug: string) {
    router.push("p/" + slug);
  }

  if (error) {
    return <h1>Something went wrong!</h1>;
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
