import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './meun.module.less'
import ModalBox from './ModalBox'
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const showTotal = (total) => `Total ${total} items`;
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

export default function Menu() {
  return (
    <div>Menu</div>
  )
}
