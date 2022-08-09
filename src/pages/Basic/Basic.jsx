

import React, { useState } from 'react';
const { Option } = Select;
import appbasic from './Basic.module.css'
import { Switch, Radio, Input, Select, Space,Button } from 'antd';
export default function Basic() {
    //状态框的onclick
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };

    const [value, setValue] = useState(1);
    //单选框的onChange2
    const onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className={appbasic.form} >
            <Space direction="vertical">
                <Input addonBefore="账号" className={appbasic.inputUser}
                    disabled defaultValue="admin" />
                <Input addonBefore="真实姓名" defaultValue="爱汤包" />
                <Input addonBefore="手机号" defaultValue="134444444" />
                <Input addonBefore="邮箱" defaultValue="xxxx@qq.com" />
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <button disabled style={{ marginRight: '10px', width: '100px', height: '50px', background: '#fafafa', border: '1px solid #d9d9d9' }}>状态</button>
                    <Switch 
                   
                    checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <button disabled style={{ marginRight: '10px', width: '100px', height: '50px', background: '#fafafa', border: '1px solid #d9d9d9'  }}>单选框</button>
                    <Radio.Group onChange={onChange2} value={value}>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                    </Radio.Group>
                    
                </div>
                <Button type="primary" style={{ marginLeft: '100px', width:'200px',height:'50px' }}>保存</Button>


            </Space>

        </div>
    )
}
