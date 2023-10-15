"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoIosCreate } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { AiFillTags } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, Drawer, Radio, Space } from "antd";
import { BiSolidShow } from "react-icons/bi";
import type { DrawerProps } from "antd/es/drawer";
import type { RadioChangeEvent } from "antd/es/radio";
import { FaDraftingCompass } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="p-4 bg-gray-800 h-screen hidden md:flex md:flex-col">
        <h1 className="mt-8 p-2 text-center text-gray-100 uppercase underline tracking-wide font-bold text-2xl">
          Dashboard
        </h1>
        <div className="mt-10">
          <div className="p-4 text-gray-400 text-md uppercase w-full mb-2 flex items-center justify-center cursor-pointer rounded-md">
            <IoIosCreate className="mr-4" />
            <Link href="/dashboard/createPost">Create Post</Link>
          </div>
          <div className="p-4 text-gray-400 text-md uppercase w-full mb-2 flex items-center justify-center cursor-pointer rounded-md">
            <AiFillEdit className="mr-4" />
            <Link href="/dashboard/e">Edit</Link>
          </div>
          <div className="p-4 text-gray-400 text-md uppercase w-full mb-2 flex items-center justify-center cursor-pointer rounded-md">
            <AiFillTags className="mr-4" />
            <Link href="/dashboard/addTags">Tags</Link>
          </div>
          <div className="p-4 text-gray-400 text-md uppercase mb-2 w-full flex items-center justify-center cursor-pointer rounded-md">
            <IoIosImages className="mr-4" />
            <Link href="/dashboard/addImage">Add Images</Link>
          </div>
          <div className="p-4 text-gray-400 text-md uppercase mb-2 w-full flex items-center justify-center cursor-pointer rounded-md">
            <FaDraftingCompass className="mr-4" />
            <Link href="/dashboard/draft">Drafts</Link>
          </div>
          <div className="p-4 text-gray-400 text-md uppercase w-full flex items-center justify-center cursor-pointer rounded-md">
            <BiSolidShow className="mr-4" />
            <Link href="/dashboard/posts">Posts</Link>
          </div>
          <div className="absolute bottom-0 left-8 p-2 rounded-lg text-gray-600 text-sm tracking-wide bg-gray-100  mb-14 flex items-center cursor-pointer">
            <BiArrowBack className="mr-2" />
            <Link href="/">Back to blog</Link>
          </div>
        </div>
      </div>
      <button className="m-4" onClick={showDrawer}>
        <GiHamburgerMenu />
      </button>
      <Drawer
        title="Dashboard"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
      >
        <div className="mt-10">
          <div className="p-4  text-md uppercase w-full mb-2 flex items-center justify-center cursor-pointer rounded-md">
            <IoIosCreate className="mr-4" />
            <Link href="/dashboard/createPost">Create Post</Link>
          </div>
          <div className="p-4  text-md uppercase w-full mb-2 flex items-center justify-center cursor-pointer rounded-md">
            <AiFillEdit className="mr-4" />
            <Link href="/dashboard/e">Edit</Link>
          </div>
          <div className="p-4  text-md uppercase w-full mb-2 flex items-center justify-center cursor-pointer rounded-md">
            <AiFillTags className="mr-4" />
            <Link href="/dashboard/addTags">Tags</Link>
          </div>
          <div className="p-4  text-md uppercase mb-2 w-full flex items-center justify-center cursor-pointer rounded-md">
            <IoIosImages className="mr-4" />
            <Link href="/dashboard/addImage">Add Images</Link>
          </div>
          <div className="p-4  text-md uppercase mb-2 w-full flex items-center justify-center cursor-pointer rounded-md">
            <FaDraftingCompass className="mr-4" />
            <Link href="/dashboard/draft">Drafts</Link>
          </div>
          <div className="p-4  text-md uppercase w-full flex items-center justify-center cursor-pointer rounded-md">
            <BiSolidShow className="mr-4" />
            <Link href="/dashboard/posts">Posts</Link>
          </div>
          <div className="absolute bottom-0 left-8 p-2 rounded-lg text-gray-600 text-sm tracking-wide bg-gray-100  mb-5 flex items-center cursor-pointer">
            <BiArrowBack className="mr-2" />
            <Link href="/">Back to blog</Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
