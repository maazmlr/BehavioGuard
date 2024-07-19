import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useAppContext } from "../context";

const App = ({ email }) => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const { data } = useAppContext();
  console.log(data);
  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values) => {
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
                <MailOutlined className="mr-2"/> {data?.email}
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
    </Form>
  );
};

export default App;
