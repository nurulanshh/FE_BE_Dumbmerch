// import hook
import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Contact from '../../Component/Complain/Contact'

// import here
import Chat from '../../Component/Complain/Chat'
import { UserContext } from '../../context/userContex'

// import socket.io-client 
import {io} from 'socket.io-client'
import NavBarAdmin from '../../Component/Navbar/NavbarAdmin'

// initial variable outside socket
let socket

export default function ComplainAdmin() {
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

        loadContacts()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) // code here

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers which have sent a message
            console.log('kontak', data)
            const  dataContacts = data.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : 'Click here to start message'
            }))
            console.log('user', data)
            // manipulate customers to add message property with the newest message
            // code here
            setContacts(dataContacts)
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
                loadContacts()
            }else{
                setMessages([])
                loadContacts()
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
        <NavBarAdmin/>
            <Container fluid style={{height: '89.5vh', backgroundColor:'black' }}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Chat contact={contact} messages={messages} user={state?.user} sendMessage={onSendMessage}  />
                    </Col>
                </Row>
            </Container>
        </>
    )
}