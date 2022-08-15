
import React, { useState } from 'react';
const { Option } = Select;
import appbasic from './Profile.module.css'
import { Switch, Radio, Input, Select, Space, Button, Tag } from 'antd';
import { user, home, save } from '../../api/classManage/taskschedule'
import { useEffect } from 'react';
export default function Basic() {
    //状态框的onclick
    useEffect(() => {
        fun()
    }, [])
    const [personal, setpersonal] = useState('')
    async function fun() {
        // let personal=await home()
        //获取个人的值
        let personaldata = await home()
        console.log(personaldata.data);
        // console.log(personaldata.data.nickName);
        setpersonal(personaldata.data)
        setreal(personaldata.data.realName)
        setphone(personaldata.data.phone)
        setemail(personaldata.data.email)
        setsex(personaldata.data.sex)
    }
    console.log(personal);
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    const [value, setValue] = useState(1);
    //单选框的onChange2
    const newsave = async (e) => {
        await save(
            {
                email: email,
                id: '1',
                phone: phone,
                status: visible ? '2' : '1',
                username: 'admin',
                sex: sex.toString(),
                realName: real
            }
        )
        let person = await home()
        setpersonal(person.data)
        setreal(person.data.realName)
        setphone(person.data.phone)
        setemail(person.data.email)
        setsex(person.data.sex)
        // console.log( {
        //     email : email,
        //     id : '1',
        //     phone : phone,
        //     status : visible?'2':'1',
        //     username : 'admin',
        //     sex:sex.toString(),
        //     realName:real
        // });


    };

    //input
    const [Evening, setEvening] = useState('');
    //真是姓名
    console.log(personal.nickName);
    const [real, setreal] = useState('')
    // 手机号
    const [phone, setphone] = useState('')
    //邮箱
    const [email, setemail] = useState('')
    //状态
    const [visible, setVisible] = useState(!!appbasic.status);
    //单选框
    const [sex, setsex] = useState('')
    return (
        <div className={appbasic.form} >
            <Space direction="vertical">
                <Input addonBefore="账号" className={appbasic.inputUser}
                    disabled value={personal.username}
                />

                <Input addonBefore="真实姓名" value={real}
                    onChange={event => setreal(event.target.value)}

                />
                <Input addonBefore="手机号" value={phone}
                    onChange={event => setphone(event.target.value)} />
                <Input addonBefore="邮箱" value={email}
                    onChange={event => setemail(event.target.value)} />
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <button disabled style={{ marginRight: '10px', width: '100px', height: '50px', background: '#fafafa', border: '1px solid #d9d9d9' }}>状态</button>
                    <Tag closable visible={visible} onClose={() => setVisible(false)}>
                        开启
                    </Tag>
                    <br />
                    <Button size="small" onClick={() => setVisible(!visible)}
                        onChange={event => setVisible(event.target.value)}

                    >
                        {visible ? '点击' : '点击开启'}
                    </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <button disabled style={{ marginRight: '10px', width: '100px', height: '50px', background: '#fafafa', border: '1px solid #d9d9d9' }}>单选框</button>
                    <Radio.Group value={sex}
                        onChange={event => setsex(event.target.value)}
                    >
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                    </Radio.Group>
                </div>
                <Button type="primary" style={{ marginLeft: '100px', width: '200px', height: '50px' }} onClick={newsave}>保存</Button>
            </Space>

        </div>
    )
}
