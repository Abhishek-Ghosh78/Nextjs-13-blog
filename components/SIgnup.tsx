"use client";
import { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onFinish = async () => {
    try {
      const { data } = await axios.post(
        "/api/signUp",
        { email, name, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      if (data) {
        router.push("/login");
      }
    } catch (error: any) {
      console.error(error.response.data);
    }
    setEmail("");
    setName("");
    setPassword("");
  };

  const onFinishFailed = (error: any) => {
    console.log("Failed", error);
  };

  type FieldType = {
    eamil: string;
    username: string;
    password: string;
  };

  return (
    <div className="flex justify-center items-center w-3/12 mx-auto mt-24 flex-col">
      <h1 className="mb-10 text-xl">Sign Up</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="eamil"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
