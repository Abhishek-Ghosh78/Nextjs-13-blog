"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { GrFormSchedule } from "react-icons/gr";
import { MdPublish } from "react-icons/md";

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

export default function PostDraft() {
  const [posts, setPosts] = useState<Post[] | null>();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [error, setError] = useState(false);
  const [postStatus, setPostStatus] = useState("");

  useEffect(() => {
    async function getPosts() {
      const { data } = await axios.get("/api/getPosts");
      setPostStatus(data.map((ps: any) => setPostStatus(ps.status)));
      setPosts(data);
    }
    getPosts();
  }, [postStatus]);

  const handlePublish = async (id: string) => {
    setError(false);
    try {
      const res = await axios.post("/api/publishPost", {
        postId: id,
      });
      if (res) {
        alert("published successfully");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError(true);
    }
  };

  function postEdit(slug: string) {
    router.push("/dashboard/de/" + slug);
  }

  function showModal() {
    setOpen(true);
  }

  async function handleOk(id: string) {
    try {
      const res = await axios.post("/api/schedulePost", {
        scheduleDateTime: dateTime,
        id: id,
      });
      if (res) alert("scheduled post successfully");
      setOpen(false);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  function handleCancel() {
    setOpen(false);
  }

  function truncateContent(content: any, maxLength: any) {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  }

  return (
    <div>
      <h1 className="font-bold text-xl underline text-center mt-5">
        Your Saved Posts:{" "}
        <span className="text-gray-600 text-md">Here are your saved posts</span>
      </h1>
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
      <hr className="w-1/2 mx-auto" />
      {posts?.map((post, index) => (
        <div key={index}>
          {post.status == "draft" && (
            <div className="flex justify-evenly items-center m-5 ml-2 p-2 space-x-2">
              <h1 className="text-sm mr-2">{index + 1}</h1>
              <div>
                <h1 className="text-sm lg:text-lg">
                  {truncateContent(post.title, 15)}
                </h1>
              </div>
              <div>
                <h1 className="text-sm md:text-lg">
                  createdAt: {moment(post.createdAt).format("YYYY-MM-DD")}
                </h1>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handlePublish(post.id)}
                  className="rounded-sm p-1 text-lg"
                >
                  <MdPublish />
                </button>
                <button onClick={showModal} className="rounded-sm p-1 text-sm">
                  <GrFormSchedule />
                </button>
                <Modal
                  title="Enter Date and Time.."
                  open={open}
                  onOk={() => handleOk(post.id)}
                  onCancel={handleCancel}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Basic date time picker"
                        value={dateTime}
                        onChange={(e) => setDateTime(e)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Modal>
                <button
                  onClick={() => postEdit(post.slug)}
                  className="rounded-sm p-1 text-sm"
                >
                  <FiEdit2 />
                </button>
              </div>
            </div>
          )}
          {post.status == "publish" && (
            <h1 className="text-center mt-10">No saved Posts</h1>
          )}
        </div>
      ))}
    </div>
  );
}
