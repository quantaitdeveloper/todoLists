import { Button, Checkbox, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { ReactElement, useEffect, useState } from 'react'
import { Todo } from '../stores/AuthStore'
import "../styles/TodoItem.scss"
import FormAddNew from './FormAddNew'
import _ from "lodash";
import { useStore } from '../hooks'

interface Props {

}
const TodoItem = observer((props: Props): ReactElement => {
    const AuthStore: any = useStore("AuthStore");
    const [activeItem, setActiveItem] = useState("");
    const { todoLists } = AuthStore;

    useEffect(() => {

    }, [])

    const handleShowDetail = (id: string) => {
        setActiveItem(id);
    }

    const handleRemoveTask = (id: string) => {
        Modal.confirm({
            title: "Bạn có muốn xóa?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            async onOk() {
                AuthStore.action_removeTask(id)
            },
        });
    }

    const handleSelect = (e: any, id: string) => {
        if (e.target.checked) {
            AuthStore.action_selectMultiTask(id);
        } else {
            AuthStore.action_unSelectMultiTask(id);
        }
    }

    if (!_.isEmpty(todoLists)) {
        return todoLists.map((todo: Todo) => {
            return (
                <>
                    <div className='todo-item' key={todo.id} style={{ backgroundColor: `${todo.status ? "#E3DCE5" : "none"}` }}>
                        <div className='title'>
                            <Checkbox onChange={(e) => handleSelect(e, todo.id)} />
                            <span className='todo-title'>{todo.title}</span>
                        </div>

                        <div className='action'>
                            <Button className='btn detail-btn' onClick={() => handleShowDetail(todo.id)} type='primary'>Detail</Button>
                            <Button className='btn remove-btn' onClick={() => handleRemoveTask(todo.id)} type='primary'>Remove</Button>
                        </div>
                    </div>

                    <div className='detail-todo'>
                        <FormAddNew type="update" todo={todo} activeItem={activeItem} />
                    </div>

                </>
            )
        })
    }
    return <div></div>
})

export default TodoItem
