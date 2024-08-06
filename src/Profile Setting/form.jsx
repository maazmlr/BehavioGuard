import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useAppContext } from "../context";
import { auth } from "../firebaseConfig";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const App = ({ email }) => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const { data } = useAppContext();
  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          values.oldPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, values.newPassword);
        toast.success(`Your Password updated successfully.`);
        form.resetFields();
      } catch (error) {
        toast.error("Error updating password: " + error.message);
      }
    } else {
      setError("No user is signed in.");
    }
    console.log("Finish:", values);
  };

  return (
    <Form form={form} name="horizontal_login" onFinish={onFinish}>
      {!email && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Form.Item
            style={{ margin: "0px" }}
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Current password"
            />
          </Form.Item>
          <Form.Item
            style={{ margin: "0px 20px" }}
            name="newPassword"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              placeholder="New password"
            />
          </Form.Item>
        </div>
      )}
      {email && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            style={{ margin: "0px", width: "auto" }}
            name="email"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <div>
              <p className="px-4 py-2 rounded bg-indigo-50">
                <MailOutlined className="mr-2" /> {data?.email}
              </p>
            </div>
          </Form.Item>
        </div>
      )}
      {!email && (
        <Form.Item shouldUpdate style={{ marginTop: "10px" }}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Update Password
            </Button>
          )}
        </Form.Item>
      )}
      <Toaster position="top-left" reverseOrder={false} />
    </Form>
  );
};

export default App;
