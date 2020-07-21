import React from 'react'

function TodoInput({handleChange, handleSubmit, inputValue}){
    // constructor(props){
    //     super(props)

    //     this.handleChange = this.handleChange.bind(this)
    // }

    // handleChange(e){
    //     let name = e.target.name
    //     let value = e.target.value
    //     console.log("Name", name)
    //     console.log("Value", value)
    // }

    return(
        <div className="todo-input">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                <input 
                    className="form-control"
                    type="text" 
                    placeholder="Задание на сегодня" 
                    id="title"
                    name="title"
                    value={inputValue}
                    onChange={handleChange}
                    />
                {/* <i class="fas fa-plus"></i> */}
                <button 
                    className="btn btn-primary" 
                    type="submit">
                    Добавить 
                </button>
                </div>
            </form>
        </div>
    )
}

export default TodoInput