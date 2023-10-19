"use client";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { Alert } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const onFinish = async () => {
    try {
      setError(false);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(true);
        return;
      }
      setSuccess(true);
    } catch (error: any) {
      setError(true);
    }
    router.replace("/");
  };

  const onFinishFailed = () => {};

  type FieldType = {
    email: string;
    password: string;
  };

  return (
    <div className="flex justify-center items-center w-3/12 mx-auto mt-24 flex-col">
      {error && (
        <Alert
          className="mx-auto mb-10"
          type="error"
          message="Invalid Credentials"
        />
      )}
      {success && (
        <Alert
          className="mx-auto mb-10"
          message="Login Successfully"
          type="success"
        />
      )}
      <h1 className="mb-10 text-xl">Login</h1>
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
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
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

export default Login;
