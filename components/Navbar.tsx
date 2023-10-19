"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { Button, Drawer, Radio, Space } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import AuthBtn from "./AuthBtn";

type Tag = {
  id: Number;
  tagName: String;
};

export default function Navbar() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  useEffect(() => {
    const getTags = async () => {
      const { data } = await axios.get("/api/allTags");
      setTags(data);
    };
    getTags();
  }, [tags]);
  // console.log(tags);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <div>
        <div className="hidden md:flex justify-around bg-gray-200 p-2">
          <ul>
            <li className="flex space-x-6 cursor-pointer ">
              {tags.map((tag) => (
                <div key={Number(tag.id)}>
                  <Link
                    className="p-2 hover:underline hover:text-gray-700 font-bold text-lg uppercase transition-all delay-1000"
                    href={`/r?search=${tag.tagName}`}
                  >
                    {tag.tagName}
                  </Link>
                </div>
              ))}
            </li>
          </ul>
          <div className="space-x-2">
            <AuthBtn />
          </div>
        </div>

        <button className="m-5 md:hidden" onClick={showDrawer}>
          <RxHamburgerMenu />
        </button>
        <Drawer
          placement={placement}
          closable={true}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <ul>
            <li className="flex flex-col cursor-pointer space-y-2">
              {tags.map((tag) => (
                <div key={Number(tag.id)}>
                  <Link
                    className="p-2 hover:underline m-5 hover:text-gray-700 font-bold text-lg uppercase transition-all delay-1000"
                    href={`/r?search=${tag.tagName}`}
                  >
                    {tag.tagName}
                  </Link>
                </div>
              ))}
            </li>
          </ul>
        </Drawer>
      </div>
    </div>
  );
}
