import { Button, Form, Input,Switch,Tree,Radio  } from 'antd';
import style from './meun.module.less'
import React,{useState }from 'react';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: (
                <span
                  style={{
                    color: '#1890ff',
                  }}
                >
                  sss
                </span>
              ),
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];

export default function ModalBox() {
  return (
    <div>ModalBox</div>
  )
}
