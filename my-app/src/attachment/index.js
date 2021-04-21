import React from 'react';


class Attachment extends React.Component{
    constructor(props){
        super(props)
        this.fileInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        console.log(e);
        
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit} action="http://localhost:8888/attachment" method="post"  encType="multipart/form-data">
                    <input type="file" name="attachment" ref={this.fileInput} />
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

export default Attachment