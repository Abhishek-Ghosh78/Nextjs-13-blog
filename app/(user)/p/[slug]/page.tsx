"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Alert, Space } from "antd";
import LatestPosts from "@/components/LatestPosts";
import { Spin } from "antd";

type Props = {
  params: {
    slug: string;
  };
};

type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  status: string;
};

type Image = {
  id: number;
  imageName: string;
  imageUrl: string;
};

export default function SinglePost({ params }: Props) {
  const [post, setPost] = useState<Post>();
  const [postError, setPostError] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState<Image>();
  const [loading, setLoading] = useState(false);

  async function getImage(id: number) {
    setError(false);
    try {
      // setLoading(true);
      const { data } = await axios.get(`/api/getPostImage/${id}`);
      setImage(data.imageName[0]);
    } catch (error: any) {
      throw new Error(error);
      setError(true);
    }
  }

  async function getPost() {
    setError(false);
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/getPost/${params.slug}`);
      setPost(data.post);
      getImage(data.postId);
      setLoading(false);
    } catch (error: any) {
      setPostError(error.message);
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  if (!post || !image) return;
  if (loading) {
    console.log("Loading....");
  }

  return (
    <div>
      {post.status != "draft" && (
        <div
          key={post.id}
          className="flex flex-col lg:flex-row justify-center lg:mx-10 p-4 items-center"
        >
          <div className="w-full lg:w-3/5 p-4">
            <h1 className="md:text-2xl underline m-10 text-lg">{post.title}</h1>
            <img className="mb-20" src={image.imageUrl} alt="image" />
            <p
              className="mt-5 text-lg tracking-wide leading-loose"
              dangerouslySetInnerHTML={{ __html: post.content! }}
            />
          </div>
          <div className="w-full lg:w-1/3  ">
            <LatestPosts postSlug={post.slug} />
          </div>
        </div>
      )}

      {post.status == "draft" && (
        <Space
          direction="vertical"
          className="mt-5 flex justify-center items-center text-center space-x-2"
        >
          <Alert message="Page Not found" type="error" closable />
        </Space>
      )}
    </div>
  );
}
