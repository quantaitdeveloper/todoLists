import _ from "lodash";
import { observable, action } from "mobx";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
    id : string,
    title: string, 
    description :string,
    dueDate: any,
    priority: string,
    status : boolean
}

export class AuthStore {
    @observable todoLists: Todo[] = JSON.parse(localStorage?.getItem("todolists") as string)
    @observable selectedTodo: string[] = []
    @action 
     async action_getFormLocal() {
        this.todoLists = JSON.parse(localStorage?.getItem("todolists") as string)
    }  

    @action 
     async action_saveToLocal(todoLists: Todo[]) {
        await localStorage.setItem("todolists", JSON.stringify(todoLists));
    }   

    @action 
    async action_addNewTask(todo: Todo) {
        this.todoLists = [...this.todoLists, todo];
        await this.action_saveToLocal(this.todoLists)
    }

    @action
    async action_removeTask(id: string) {
         const targetTask = _.findIndex(this.todoLists, { id });
        this.todoLists.splice(targetTask, 1);
        await this.action_saveToLocal(this.todoLists)
    }

    @action 
    async action_searchTask(title: string) {
        if (title) {
            const listSearch = this.todoLists.filter((todo) => {
            return todo?.title?.toLowerCase().includes(title.toLowerCase())
        })

        this.todoLists = [...listSearch];
        }
        else {
            await this.action_getFormLocal();
        }
    }

    @action
    async action_updateTask(newTask: Todo) {
        const targetTask = _.findIndex(this.todoLists, { id: newTask.id });

        this.todoLists.splice(targetTask, 1, { ...newTask });
        

        await this.action_saveToLocal(this.todoLists)
    }

    @action
    async action_selectMultiTask(id: string) {
        this.selectedTodo = [...this.selectedTodo, id]
    }

    @action
    async action_unSelectMultiTask(id: string) {
        const selectedTmp = this.selectedTodo.filter((todo: string) => {
            return todo !== id
        });

        this.selectedTodo = [...selectedTmp]

    }

    @action
    async action_changeStatusMultiTask() {
        //thay đổi status task thông qua dánh sách id được chọn
        for (let index = 0; index < this.selectedTodo.length; index++) {
            const element = this.selectedTodo[index];

            this.todoLists.forEach((todo: Todo) => {
                if (todo.id === element) {
                    todo.status = true
                }
            })
        }

        await this.action_saveToLocal(this.todoLists)

    }

    @action
    async action_removeMultiTask() {
        let newTodoList: Todo[] = []
        //thay đổi status task thông qua dánh sách id được chọn
        for (let index = 0; index < this.selectedTodo.length; index++) {
            const element = this.selectedTodo[index];
            newTodoList = _.remove(this.todoLists, (todo:Todo) => {
                return todo.id === element
            })
        }
        await this.action_saveToLocal(this.todoLists)

    }

}
