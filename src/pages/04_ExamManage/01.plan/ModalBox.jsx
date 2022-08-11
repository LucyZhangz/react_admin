import { Steps } from 'antd';
import React from 'react';
import { useEffect } from 'react'
import { addExamlist } from '../../../api/examManage/plan'
const { Step } = Steps;

const ModalBox = () => {
  // 调用新增接口
  useEffect(() => {
    additem()
  }, [])
  async function additem() {
    let res = await addExamlist({
      "classIds": [],
      "classType": 0,
      "courseIds": [],
      "createId": "",
      "createIds": [],
      "createTime": "",
      "deleted": 0,
      "examDesc": "",
      "examType": 0,
      "gradeId": "",
      "id": "",
      "invigilatorNum": 0,
      "limit": 0,
      "name": "",
      "page": 0,
      "resultInputStatus": 0,
      "status": 0,
      "termId": "",
      "termName": "",
      "timeEnd": "",
      "timeStart": "",
      "updateId": "",
      "updateTime": ""
    })
    console.log(res);
  }
  return (
    <>
      <Steps size="small" current={1}>
        <Step title="基本信息设置" />
        <Step title="参考班级设置" />
        <Step title="参考课程设置" />
        <Step title="考场设置" />
        <Step title="监考老师设置" />
        <Step title="考场监考调整" />
        <Step title="完成" />
      </Steps>
      <br/>
      计划标题： <Input placeholder="Basic usage" /> 
    </>
  )
}


export default ModalBox;