import { Transfer, Button} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { giveUsers,addUsers } from '../../../api/WorkersManage/staff'
const App = (props) => {
    console.log("11111111111111111111", props.sonVal);
    // 获取角色列表
    const [dataSource, setDataSource] = useState([])
    async function getRole() {
        let res = await giveUsers(props.sonVal.key)
        // console.log(res.data);
        let resRole = transformRoles(res.data.allRole);
        setDataSource(resRole);
    }
    console.log('@@@', dataSource);
    function transformRoles(data) {
        const res = data.map((item) => {
            const obj = {
                title: item.name,
                key: item.id,
            }
            return obj
        })
        return res
    }
    let initialTargetKeys = []

    dataSource.forEach(item => {
        props.sonVal.roleIds.forEach(it => {
            if (item.title === it) {
                initialTargetKeys.push(item.key)
            }
        })
    })
    console.log(initialTargetKeys);
    const [targetKeys, setTargetKeys] = useState([]);
    useEffect(()=>{
        setTargetKeys(initialTargetKeys)
    },[dataSource])
    // console.log(targetKeys);

    const onChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    //  确定和取消事件
    // 赋予角色事件
    async function addusers(){
        await addUsers(props.sonVal.key,targetKeys);
    }
    function CloseModal() {
        props.sethandleRoleModal(false);
        addusers();
        // location.reload()
    }
    function CannelModal() {
        props.sethandleRoleModal(false)
    }
    useEffect(() => {
        getRole();
    }, [])
    return (


        <div>
             <Transfer
                    dataSource={dataSource}
                    titles={['Source', 'Target']}
                    targetKeys={targetKeys}
                    onChange={onChange}
                    render={(item) => item.title}
                    style={{ position: 'relative', left: "50px" }}
                />


    
                <Button type="primary" htmlType="submit"
                    style={{ position: 'relative', left: "270px",top:'10px'}}
                    onClick={CloseModal}
                >
                    确定
                </Button>
                <Button style={{ postion: 'relative', left: '300px',top:'10px' }} onClick={CannelModal}>
                    取消
                </Button>
        </div>
               
 

    );
};

export default App;
