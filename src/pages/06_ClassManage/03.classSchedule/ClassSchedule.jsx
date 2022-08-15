import { Table } from 'antd';
import React from 'react';

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const sharedOnCell = (_, index) => {
  if (index === 7) {
    return {
       colSpan: 0,
    };
  }

  return {};
};

const columns = [
  {
    title: '',
    dataIndex: 'name',
    //  colSpan: 2,
    render: (text) => <a>{text}</a>,
    
    onCell: (_, index) => ({
      
     
     // colSpan: index < 4 ? 1 : 5,
    }),
  },
  {
    title: '',
    dataIndex: '',
  
  },
  {
    title: 'Age',
    dataIndex: 'age',
    onCell: sharedOnCell,
  },
  {
    title: 'Home phone',
    // colSpan: 2,
    dataIndex: 'tel',
    // onCell: (_, index) => {
    //   if (index === 2) {
    //     return {
    //       rowSpan: 2,
    //     };
    //   } // These two are merged into above cell
    //},
  },
  {
    title: 'Phone',
    // colSpan: 0,
    dataIndex: 'phone',
    onCell: sharedOnCell,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    onCell: sharedOnCell,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 1,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
    
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 2,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 3,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 4,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jim Red',
    age: 5,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '6',
    name: 'Jim Red',
    age: 5,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '7',
    name: 'Jim Red',
    age: 5,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '8',
    name: 'Jim Red',
    age: 5,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '9',
    name: 'Jim Red',
    age: 5,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
 
  
  
];

const App = () => <Table columns={columns} dataSource={data} bordered />;

export default App;