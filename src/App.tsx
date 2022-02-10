import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { observer } from 'mobx-react-lite';
import { Button, Col, Input, Layout, Modal, Row } from 'antd';
import FormAddNew from './component/FormAddNew';
import TodoItem from './component/TodoItem';
import { useStore } from './hooks';
import _ from 'lodash';
interface Props {

}
const App = observer((props: Props) => {
    const AuthStore = useStore("AuthStore");

    const { selectedTodo } = AuthStore;

    const handleSearchTask = (value: string) => {
        AuthStore.action_searchTask(value);
    }

    const handleChangeStatus = () => {
        AuthStore.action_changeStatusMultiTask();
    }

    const handleRemoveMulti = () => {
        Modal.confirm({
            title: "Bạn có muốn xóa?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            async onOk() {
                AuthStore.action_removeMultiTask();
            },
        });

    }

    const renderBulkAction = () => {
        if (!_.isEmpty(selectedTodo)) {
            return (
                <>
                    <div className='bulk-action'>
                        <span>
                            Bulk Action:
                        </span>

                        <div className='action'>
                            <Button className='detail-btn' onClick={handleChangeStatus} type='primary'>Done</Button>
                            <Button className='remove-btn' onClick={handleRemoveMulti} type='primary'>Remove</Button>
                        </div>

                    </div>
                </>
            )
        }
        return null
    }
    return (
        <div className="main-container">
            <Row>
                <Col md={8} xs={24} className="add-new">
                    <h1 className='add-new-title'>Add New</h1>
                    <FormAddNew type="add" />
                </Col>

                <Col md={16} xs={24} className="view-detail">
                    <div className='list-todo'>
                        <h1 className='add-new-title'>To Do List</h1>
                        <Input.Search placeholder='search' onSearch={handleSearchTask} />

                        <TodoItem />

                    </div>
                    {
                        renderBulkAction()
                    }
                </Col>
            </Row>
        </div>
    );
})

export default App;
