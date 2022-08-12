import { Select } from 'antd';
import React, { useState } from 'react';
import { Button, message } from 'antd';
import { tableData } from '../../../api/classManage/taskschedule'
export default function TeacherSchedule() {
  const Option = Select.Option;
  //上面搜索框的点击事件
  const onChang = (value) => {
    console.log(value);
    settitle(value)
  };
  //下面搜索框的点击事件
  const [title, settitle] = useState('')
  //const [belowtitle, setbelowtitle] = useState('')
  const below = async (value) => {
   // console.log(value);
    if (!title) {
      message.info('请选择班级');
    } else {
      await tableData()
    }

  };
  const number = [{
    name: '肖璐',
    teacherID: '1361666154869174273',
    termId: '1360518975966326786',
  },
  {
    name: '郑霞',
    teacherID: '1361666288046714882',
    termId: '1360518975966326786',
  }]

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>学期</div>
        <Select
          showSearch
          placeholder="请选择班级"
          optionFilterProp="children"
          onChange={onChang}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          <Option value={'2020~2021学年度第二学期'}>2020~2021学年度第二学期</Option>
        </Select>
      </div>
      <div>教师</div>
      <Select
        showSearch
        placeholder="请选择老师"
        optionFilterProp="children"
        onChange={below}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      >
        {
          number.map((item, index) => {
            return <Select.Option value={item.name} key={index}>{item.name}</Select.Option>
          })
        }
        
      </Select>

      <table className='layui-table'>
        <colgroup>
          <col width="150" />
          <col width="200" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}></th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
            <th>星期六</th>
            <th>星期日</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={4} style={{ borderBottom: '30px solid #1111' }}>上午</td>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >3</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style={{ borderBottom: '30px solid #1111' }}>4</td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
          </tr>
          <tr>
            <td rowSpan={3} style={{ borderBottom: '30px solid #1111' }} >下午</td>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td >6</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style={{ borderBottom: '30px solid #1111' }}>7</td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}> </td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
            <td style={{ borderBottom: '30px solid #1111' }}></td>
          </tr>
          <tr>
            <td rowSpan={2}>晚上</td>
            <td>8</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


