import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { ReactElement, useEffect } from 'react'
import { useStore } from '../hooks';
import { Todo } from '../stores/AuthStore';
import "../styles/FormAddNew.scss";
import { v4 as uuidv4 } from "uuid";
import { showMessageSuccess } from '../common/function';

interface Props {
    type: string,
    todo?: Todo,
    activeItem?: string
}

const FormAddNew = observer((props: Props): ReactElement => {
    const { type, todo, activeItem } = props;
    const [form] = Form.useForm();
    const AuthStore = useStore("AuthStore");

    useEffect(() => {
        if (type === "update") {
            form.setFieldsValue({
                ...todo,
                dueDate: moment(todo?.dueDate)
            })
        }
    }, [])

    const handleSubmit = () => {
        form.submit();
    }

    const onFinish = (values: Todo) => {
        const todoTmp = {
            ...values,
            id: uuidv4(),
            status: false
        }
        AuthStore.action_addNewTask(todoTmp);
        form.resetFields();
    }

    const onUpdate = (values: Todo) => {
        const todoTmp = {
            id: todo?.id as string,
            title: values.title,
            description: values.description,
            dueDate: values.dueDate,
            priority: values.priority,
            status: todo?.status as boolean
        }
        AuthStore.action_updateTask(todoTmp);
        showMessageSuccess("Cập nhật thành công")
    }

    return (
        <Form
            layout={"vertical"}
            form={form}
            className="form-add-new"
            onFinish={type === "add" ? onFinish : onUpdate}
            style={{ display: `${activeItem === todo?.id ? "block" : "none"}` }}
        >
            <Form.Item name="title" label="Title" rules={[
                {
                    required: true,
                    message: "Vui lòng nhập nội dung",
                },
            ]}>
                <Input placeholder="add new task" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[
                {
                    required: true,
                    message: "Vui lòng nhập nội dung",
                },
            ]}>
                <Input.TextArea rows={4} placeholder="" />
            </Form.Item>

            <Row>
                <Col md={12}>
                    <Form.Item name="dueDate" label="Due Date" rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn ngày",
                        },
                    ]}>
                        <DatePicker format={"DD/MM/YYYY"} placeholder='select date' />
                    </Form.Item>
                </Col>

                <div className='flex-content'>
                    <Form.Item name="priority" label="Priority" >
                        <Select defaultValue="low">
                            <Select.Option value="low">
                                Low
                            </Select.Option>
                            <Select.Option value="normal">
                                Normal
                            </Select.Option>
                            <Select.Option value="high">
                                High
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </div>
            </Row>
            <Form.Item>
                <Button style={{ border: "none" }} onClick={handleSubmit} type="primary">{type === "add" ? "Add" : "Update"}</Button>
            </Form.Item>
        </Form>
    )
})

export default FormAddNew
