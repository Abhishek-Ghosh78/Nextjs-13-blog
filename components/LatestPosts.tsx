"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  status: string;
  imageName: string;
};

type PostProps = {
  postSlug: string;
};

type Image = {
  id: string;
  imageName: string;
  postId: string;
};

export default function LatestPosts({ postSlug }: PostProps) {
  const [posts, setPosts] = useState<Post[] | null>();
  const [error, setError] = useState(false);
  const [images, setImages] = useState<Image[]>();
  const [id, setId] = useState();

  async function getLatestPost() {
    setError(false);
    try {
      const { data } = await axios.get(`/api/latestPosts/${postSlug}`);
      // console.log(data.map((ps: any) => console.log(ps.id)));
      setPosts(data);
    } catch (error) {
      setError(true);
    }
  }
  // console.log(id);
  const getImage = async () => {
    setError(false);
    try {
      const { data } = await axios.get(`/api/allPostImage`);
      // console.log(data);
      setImages(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getLatestPost();
    getImage();
  }, []);

  if (error) {
    <h1>Something went wrong!</h1>;
  }

  return (
    <div className=" w-full p-2 lg:ml-40 ml-5 space-y-4">
      <h1 className="text-xl md:text-md">Latest Posts</h1>
      <hr className="m-2 text-black mb-10 w-1/2" />
      {posts?.map((post) => (
        <div key={post.id} className="">
          {post.status == "published" && (
            <div>
              {images?.map((img) => (
                <div key={img.id}>
                  {post.id == img.postId && (
                    <Link
                      href={`/p/${post.slug}`}
                      className="cursor-pointer flex items-center space-x-2"
                    >
                      <img
                        className="hover:bg-gray-200 w-1/4 rounded-sm"
                        src={`https://ztech18.s3.amazonaws.com/images/${img?.imageName}`}
                        alt=""
                      />
                      <div className="w-4/5 lg:space-y-1">
                        <h1 className="text-gray-600 text-lg w-4/5">
                          {post.title}
                        </h1>
                        <p className="text-xs text-gray-500">
                          {moment(post.createdAt).format("YYYY-MM-DD")}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
