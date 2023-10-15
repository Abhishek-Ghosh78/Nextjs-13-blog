"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Progress } from "antd";
import axios from "axios";
import { IoIosRemoveCircle } from "react-icons/io";

type FileProps = {
  id: string;
  imageUrl: string;
  imageName: string;
};

const options = {
  apiKey: "free", // Get API key: https://www.bytescale.com/get-started
  maxFileCount: 1,
};

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<FileProps[]>([]);
  const [percent, setPercent] = useState<number | null>(null);
  const [progress, setProgress] = useState<boolean>();

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files != null) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  }

  async function handleDelete(id: string, name: string) {
    const data = { name: name };
    await fetch(`/api/deleteImage/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    alert("Image deleted successfully");
  }

  useEffect(() => {
    const getImage = async () => {
      const response = await fetch("/api/getImage", {
        method: "GET",
      });
      const data = await response.json();
      setFileData(data); // getting all the images from the database
    };
    getImage();
  }, [fileData]);

  const handleUpload = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const formData = new FormData();
      formData.set("file", file);
      const { data } = await axios.post("/api/fileUpload", formData, {
        onUploadProgress(data) {
          console.log(Math.round((data.loaded / data.total!) * 100));
          setPercent(Math.round((data.loaded / data.total!) * 100));
          setProgress(true);
        },
      });
      setProgress(false);
      setFile(null);
      console.log(data);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };
  function truncateContent(content: any, maxLength: any) {
    if (content.length > maxLength) {
      // If content length exceeds maxLength, truncate it and add "..."
      return content.substring(0, maxLength) + "...";
    }
    return content;
  }
  return (
    <div className="mt-5 text-center">
      <form action="" onSubmit={handleUpload}>
        <input type="file" onChange={handleFile} />
        <button
          type="submit"
          className="p-1 border-gray-400 bg-sky-600 text-white ml-8 hover:bg-blue-400 rounded-md transition-all delay-100"
        >
          Upload
        </button>
      </form>
      <div>{progress && <Progress percent={percent!} />}</div>
      <div className="border border-dotted p-2 mt-10 bg-gray-50 rounded-md mx-auto w-4/5">
        <div>
          <h1 className="text-2xl font-bold text-gray-700 text-center">
            <u>Uploded Images</u>
          </h1>
        </div>
        <div className="flex flex-col items-center">
          {fileData.map((file) => (
            <div
              key={file.id}
              className="flex justify-evenly items-center m-5 p-2 "
            >
              <Image
                className="rounded-lg shadow-lg w-1/4"
                src={file.imageUrl}
                alt="image"
                width={100}
                height={100}
              />
              <p className="text-sm md:text-lg ml-2">
                {truncateContent(file.imageName, 15)}
              </p>
              <div className="items-center flex">
                <IoIosRemoveCircle className="ml-2" />
                <h3
                  className=" ml-4 text-sm md:text-lg text-red-500 hover:underline hover:text-red-400 cursor-pointer"
                  onClick={() => handleDelete(file.id, file.imageName)}
                >
                  Remove Image
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
