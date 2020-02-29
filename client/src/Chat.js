import React from 'react'
import io from 'socket.io-client'

class Chat extends React.Component {

    constructor() {
        super()
        this.state = {
            username: '',
            message: '',
            messages: []
        }

        this.socket = io('localhost:3010')
    }

    componentDidMount () {
        this.socket.on('RECEIVE_MESSAGE', data => {
            this.setState(prevState => {
                return {messages: [...prevState.messages, data]}
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        })
        this.setState({message: ''})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className="container" style={{display:"flex", flexDirection:"column", height:"90vh", width:"70%"}}>
                <div style={{textAlign:"center"}}>
                    <h1>Chat App</h1>
                </div>
                <div className="chatbody" style={{flexGrow:2, marginTop:10, borderRadius:12, padding:10, marginBottom:10, border:"1px solid royalblue"}}>
                    {this.state.messages.map(message => {
                        return (
                            <div>{message.author}: {message.message}</div>
                        )
                    })}
                </div>
                <form className="messagebody" style={{marginBottom:5, display:"flex", flexWrap:"wrap"}} onSubmit={this.handleSubmit}>
                    <input className="form-control" type="text" name="username" placeholder="username" style={{width:"20%"}} value={this.state.username} onChange={this.handleChange}/>
                    <input className="form-control" type="text" placeholder="message" name="message" value={this.state.message} onChange={this.handleChange} style={{width:"80%"}}/>
                    <button type="submit" className="btn btn-sm btn-outline-primary" style={{width:"100%", marginTop:10}}>Post</button>
                </form>
            </div>
        )
    }
}

export default Chat