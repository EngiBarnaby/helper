import React from 'react'

class TodoItem extends React.Component{
    constructor(props){
        super(props)

        this.state={
            edit:false,
            newText: this.props.text,
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.editTask=this.editTask.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleUpdate(e){
        e.preventDefault()
        const csrftoken = this.props.getCookie('csrftoken');
        const url = `http://127.0.0.1:8000/api/task-update/${this.props.id}/`

        fetch(url, {
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrftoken,
                Authorization: `Token ${this.props.token}`,
            },
            body:JSON.stringify({
                id:this.props.id,
                text:this.state.newText,
                done: this.props.done,
            })
        }).then((response) => {
            this.props.fetchTasks()
            this.editTask(this.state.edit)
        }).catch(function(error){
            console.log("Error", error)
        })
    }

    deleteItem(task){
        var csrftoken = this.props.getCookie('csrftoken')
        fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
          method:'DELETE',
          headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
            Authorization: `Token ${this.props.token}`,
          },
        }).then((response) =>{
    
          this.props.fetchTasks()
        })
      }


    handleEdit(e){
        this.setState({newText: e.target.value})
    }

    editTask(){
        this.setState({edit: !this.state.edit})
    }

    render(){
       const {text, id, done, changeToggler, task}=this.props
       const edit = this.state.edit

       const classDone = []

       if(done){
            classDone.push('done')
        }
        return(
        <div className="todo-item">
            { !edit ?
                <div 
                    style={{flex : 1}} 
                    className={classDone}
                    onClick={()=> changeToggler(task)}
                    >{text}
                </div>
                : 
                <div style={{flex : 1}}>
                    <form onSubmit={this.handleUpdate}>
                        <input type='text'
                            className='form-control' 
                            value={this.state.newText} 
                            onChange={this.handleEdit}
                            />
                        <button type="submit">Ok</button>
                    </form>
                </div>
            }
            {!done ?
            <span>
                {/* <input 
                    className='check'
                    type="checkbox"
                    checked={done}
                    onChange={()=>changeToggler(task)}
                /> */}
                <i className="fas fa-pencil-alt fa-1x pencil" onClick={() => this.editTask(id)}></i>
            </span>
            :
            <i className="fas fa-check fa-1x check"></i>
            }
            <i className="fas fa-trash-alt fa-1x trash" onClick={() => this.deleteItem(task)}></i>
        </div>
        )
    }
}

export default TodoItem