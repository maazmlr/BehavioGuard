import React, { useEffect, useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';


const App = ({ email }) => {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);

    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);

    const onFinish = (values) => {
        console.log('Finish:', values);
    };

    return (
        <Form form={form} name="horizontal_login" onFinish={onFinish}>
            {
                !email &&
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <Form.Item
                        style={{ margin: "0px" }}
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: '',
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
                                message: '',
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

            }
            {
                email &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                    <Form.Item
                        style={{ margin: "0px" }}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            type="email"
                            placeholder="New email"
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate
                    style={{ margin: "0px" }}>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !clientReady ||
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                            >
                                Update Email
                            </Button>
                        )}
                    </Form.Item>
                </div>

            }
            {
                !email &&
                <Form.Item shouldUpdate style={{ marginTop: '10px' }}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !clientReady ||
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Update Password
                        </Button>
                    )}
                </Form.Item>
            }
        </Form>
    );
};

export default App;
