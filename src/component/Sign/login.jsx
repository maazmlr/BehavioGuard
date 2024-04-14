import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';



const Form_Login = ({ signUp, navlink, heading }) => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log(values)
        navigate('/home')
    }
    const onFinishFailed = (errorInfo) => {

    };
    return (
        <div className='login'>
            <div className='container'>
                <div className='frame1'>
                    
                </div>
                <div className='frame'>
                    <h1 style={{ fontSize: "2.2rem", fontWeight: "600", marginLeft: "5px" }}>{signUp ? "Sign Up" : "Sign In"}</h1>
                    <p style={{ color: "#b7b7b7", fontWeight: "500", marginLeft: "5px", marginTop: "5px" }}>Please fill your information below</p>
                    <hr style={{ margin: "1rem 0rem" }} />
                    <Form
                        name="basic"
                        style={{
                            alignItems: "center",
                            textAlign: "center"
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="name"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                },

                            ]}
                        >
                            <Input style={{ width: "20rem" }} placeholder='Full Name' type='text' />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },

                            ]}
                        >
                            <Input style={{ width: "20rem" }} placeholder='Your Email' type='email' />
                        </Form.Item>

                       { signUp &&
                       <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    pattern: /(?=[A-Za-z0-9@#$%^&+.!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+.!=])(?=.{8,}).*$/,
                                    message: 'Password must contain eight digit',
                                },
                            ]}
                        >
                            <Input.Password style={{ width: "20rem" }} placeholder='Confirm your Password' />
                        </Form.Item>
                    }
                    { !signUp &&
                       <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your password',
                                },
                            ]}
                        >
                            <Input.Password style={{ width: "20rem" }} placeholder='Your Password' />
                        </Form.Item>
                    }
                        {signUp &&
                            <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password style={{ width: "20rem" }} placeholder='Confirm your Password' />
                        </Form.Item>
                    }
                    {
                        !signUp &&
                        <NavLink><p style={{ textAlign: 'end', color: "#046ce7", fontWeight: "500", marginLeft: "5px", marginTop: "-15px", marginBottom: "5px",paddingTop: "1px" }}>
                                Forgot password
                            </p></NavLink>
                    }
                        <Form.Item
                        >
                            <Button className='btn' htmlType="submit">
                                {signUp ? "Sign Up" : "Sign In"}
                            </Button>
                            <br />
                           {signUp &&  <NavLink to='/'><p style={{ textAlign: 'start', color: "black", fontWeight: "500", marginLeft: "5px", paddingTop: "10px" }}>
                                {signUp ? "Dont't have an account ?" : "Already have an account ?"} <i style={{ color: "#046ce7" }}>Sign In</i>
                            </p></NavLink>
                            }
                            {!signUp &&  <NavLink to='/signIn'><p style={{ textAlign: 'start', color: "black", fontWeight: "500", marginLeft: "5px", paddingTop: "10px" }}>
                                {!signUp ? "Dont't have an account ?" : "Already have an account ?"} <NavLink to='/signUp' style={{ color: "#046ce7" }}>Sign Up</NavLink>
                            </p></NavLink>
                            }
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
};
export default Form_Login;