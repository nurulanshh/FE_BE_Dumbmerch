import React, { useEffect, useState, useContext } from 'react'
import NavBar from '../../Component/Navbar/Navbar';

import {Container, Row, Col} from 'react-bootstrap'
import { UserContext } from '../../context/userContex'

// import package here
import { io } from 'socket.io-client'
import Contact from '../../Component/Complain/Contact';
import Chat from '../../Component/Complain/Chat';

// init variable here
let socket;

export default function ComplainUser() {

 // code here
 const [contact, setContact] = useState(null)
 const [contacts, setContacts] = useState([])

 // code here
 const [messages, setMessages] = useState([])   

 // code here
 const [state] = useContext(UserContext)

 useEffect(() =>{
    socket = io('http://localhost:5000', {
        auth: {
            token: localStorage.token
        }
    })

    // code here
    socket.on("new message", () => {
        socket.emit('load messages', contact?.id)
    })

    socket.on('connect_error', (err)=>{
        console.error(err)
    })

    loadContact()
    loadMessages()

    return () => {
        socket.disconnect()
    }
    }, [messages])

 const loadContact = () => {
     // emit event to load admin contact
     socket.emit("load admin contact")
 
     // listen event to get admin contact
     socket.on("admin contact", (data) => {
        // manipulate data to add message property with the newest message
        // code here

        const dataContact = {
            ...data,
            message: messages.length > 0 ? messages[messages.length - 1].message : 'Click here to start message'
        }
        setContacts([dataContact])
     })
   }

   // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // code here
        socket.emit('load messages', data.id)
    }

   // code here
   const loadMessages = () => {
    socket.on('messages', async (data) => {
        if(data.length > 0){
            const dataMessages = data.map((item) => ({
                idSender: item.sender.id,
                message: item.message
            }))
            setMessages(dataMessages)
        }else{
            setMessages([])
            loadContact()
            }
        })
    }

    const onSendMessage = (e) => {
        if(e.key === "Enter"){
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit('send message', data)
            e.target.value = ''
            }
        }

    return (
      <>
      <NavBar />
      <Container fluid style={{height: '90vh'}} className='bg-black'>
          <Row>
            <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                <Contact dataContact={contacts}  clickContact={onClickContact} contact={contact} />
            </Col>
            <Col md={9} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}  />
            </Col>
          </Row>
      </Container>
  </>
)
};
