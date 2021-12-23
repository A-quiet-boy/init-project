/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:38:06
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/pages/login/index.tsx
 */
import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import VerificationCodeInput from '~components/VerificationCodeInput';
import { SAVE_CODE_URL, SAVE_LOGIN_INFO } from '~reducers/common';
import { dispatchWithPromise } from '~utils/util';
import { Redirect } from 'react-router';
import api from '~/apis/index'
import Style from './index.less';
import { push } from 'connected-react-router';
import apiList from '~/apis/index';
interface LoginPageProps {
    loginInfo?: boolean
    img?: boolean
    imgKey: string
    title?: string
}
const LoginPage = ({ loginInfo, imgKey, title }: LoginPageProps) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch()
    function submitHandle() {
        form.validateFields().then(async (values: any) => {
            setSubmitting(true);
            values.imgKey = imgKey;
            try {
                let res = await api.getLoginInfo(values)
                dispatchWithPromise({ type: SAVE_LOGIN_INFO, data: res.data })
            } catch (e) {
                getCodeUrl()
            }
            setSubmitting(false)
        })
    }
    useEffect(() => {
        setSubmitting(submitting)
    }, [submitting])
    async function getCodeUrl() {
        try {
            let res = await apiList.getCodeUrl()
            console.log(res)
            dispatch({ type: SAVE_CODE_URL, data: res.data })
        } catch (e) {

        }
    }
    return (
        loginInfo ?
            <Redirect to="/projectManagement" />
            :
            <div className={Style["login_container"]}>
                <h1 className={Style["system_title"]}>{title}</h1>
                <div className={Style["system_title_underline"]}></div>
                <div className={Style["login_form"]}>
                    <Form layout="vertical" form={form}>
                        <Form.Item name="accountName" rules={[{ required: true, message: '请输入帐号' }]}>
                            <Input size="large" placeholder="请输入帐号" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password type="password" size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item name="imgCode" rules={[{ required: true, message: '请输入验证码' }]}>
                            <VerificationCodeInput size="large" placeholder="请输入验证码" />
                        </Form.Item>
                        <Button htmlType="submit" loading={submitting} type="primary" block size="large" onClick={submitHandle}>登录</Button>
                    </Form>
                </div>
            </div>
    )
}
export default connect((state: any) => {
    return {
        ...state.common
    }
})(LoginPage)