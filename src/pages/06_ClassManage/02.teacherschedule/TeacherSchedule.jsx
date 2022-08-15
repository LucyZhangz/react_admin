import { Select } from 'antd';
import React, { useState } from 'react';
import { Button, message, Divider, Radio, Table } from 'antd';
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
  const [teacherdata, setteacherdata] = useState('')
  // 课程表默认数据
  const initTableData = [
    // 上午的数据svg
    {
      key: '1',
      name: '上午',
      index: 1,
      one: "",
      two: "",
      three: "",
      thurs: "",
      fri: "",
      sat: "",
      sun: ""
    },
    {
      key: '2',
      name: '上午',
      index: 2,
    },
    {
      key: '3',
      name: '上午',
      index: 3,
    },
    {
      key: '4',
      name: '上午',
      index: 4,
    },
    // 中间的空行
    {
      key: '5',
      name: '',
      index: '',
    },
    // 下午的数据
    {
      key: '6',
      name: '下午',
      index: 5,
    },
    {
      key: '7',
      name: '下午',
      index: 6,
    },
    {
      key: '8',
      name: '下午',
      index: 7,
    },
    // 下午和晚上中间的空白行
    {
      key: '9',
      name: '',
      index: '',
    },
    // 晚上的数据
    {
      key: '10',
      name: '晚上',
      index: 8,
    },
    {
      key: '11',
      name: '晚上',
      index: 9,
    },
  ]
  // 星期几和col的对应关系
  const timeArr = [
    { key: "one", col: 1 },
    { key: "two", col: 2 },
    { key: "three", col: 3 },
    { key: "thurs", col: 4 },
    { key: "fri", col: 5 },
    { key: "sat", col: 6 },
    { key: "sun", col: 7 },
  ]

  const number = [{
    name: '肖璐',
    teacherID: '1366382171683348481',
    termId: '1346713330594394113',
  },
  {
    name: '陈蕾伊',
    teacherID: '1347029568935723009',
    termId: '1346713330594394113',
  }]
  const below = async (value) => {
    const teacherObj = number.find((item) => {
      return item.teacherID == value
    })
    console.log("$$$", teacherObj);
    if (!title) {
      message.info('请选择班级');
    } else {
      let { data: teacherdata } = await tableData({
        teacherID: teacherObj.teacherID,
        termId: teacherObj.termId
      })
      console.log(teacherdata);

      // 处理后的课程表数据
      const resData = teacherdata.map(item => ({
        col: item.col,
        row: item.row,
        title: item.className + item.courseName
      }))
      console.log('课程表数据：', resData);

      // 设置表格数据
      resData.forEach(item => {
        // 获取第几行数据
        const idx = initTableData.findIndex(it => it.index === item.row)
        // console.log('表格数据的索引：', idx);
        // 获取星期几
        const key = timeArr.find(it => it.col == item.col).key;
        // console.log('key：', key);
        // 将数据，填充到课程表中
        initTableData[idx][key] = item.title;
        console.log('有数据的课程表：', initTableData);
        // 设置表格数据
        setData(initTableData)
      })

      // setteacherdata(res)
    }
  };
  const columns = [
    {
      title: '',
      dataIndex: 'name',
      colSpan: 2,
      onCell: (record, rowIndex) => {
        if (rowIndex === 0) {
          // 上午合并4行
          return {
            rowSpan: 4,
          }
        } else if (rowIndex === 4) {
          // 上午和下午中间的一个空白行
          return {
            colSpan: 9
          }
        } else if (rowIndex === 5) {
          // 下午合并3行
          return {
            rowSpan: 3,
          }
        } else if (rowIndex === 8) {
          // 下午和晚上中间的一个空白行
          return {
            colSpan: 9
          }
        } else if (rowIndex === 9) {
          // 晚上合并2行
          return {
            rowSpan: 2,
          }
        } else {
          // 其余行不显示
          return {
            rowSpan: 0,
          }
        }
      }
    },
    {
      title: '',
      dataIndex: 'index',
      colSpan: 0,
      onCell: (record, rowIndex) => {
        // 中间的2个空白行不需要
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0
          }
        }
      }
    },
    {
      title: '星期一',
      dataIndex: 'one',
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0
          }
        }
      }
    },
    {
      title: '星期二',
      dataIndex: 'two',
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0
          }
        }
      }
    },
    {
      title: '星期三',
      dataIndex: 'three',
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0
          }
        }
      }
    },
    {
      title: '星期四',
      dataIndex: 'thurs',
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0
          }
        }
      }
    },
    {
      title: '星期五',
      dataIndex: 'fri',
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0
          }
        }
      }
    },
    {
      title: '星期六',
      dataIndex: 'sat',
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0
          }
        }
      }
    },
    {
      title: '星期日',
      dataIndex: 'sun',
      onCell: (record, rowIndex) => {
        if (rowIndex === 4 || rowIndex === 8) {
          return {
            colSpan: 0
          }
        }
      }
    },
  ];

  // 表格数据
  let [data, setData] = useState(initTableData);


  return (
    <div>
      <div style={{ display: 'flex',}}>
      <div style={{ display: 'flex',marginRight:"10px"}}>
        <div style={{ marginRight:"10px"}}>学期</div>
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
      <div style={{ marginRight:"10px"}}>教师</div>
      <Select
        showSearch
        placeholder="请选择老师"
        optionFilterProp="children"
        onChange={below}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      >
        {
          number.map((item, index) => {
            return <Select.Option key={item.teacherID} value={item.teacherID}>{item.name}</Select.Option>
          })
        }
      </Select>
      </div>
      <div style={{ padding: '20px' }}>
        <Table pagination={false} columns={columns} dataSource={data} bordered />
      </div>

    </div >
  )
}


