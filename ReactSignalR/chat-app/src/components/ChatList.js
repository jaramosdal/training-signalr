import React, { useContext, useEffect, useState } from 'react'
import { SignalRContext } from '../contexts/SignalRContext';

const ChatList = () => {
  const [ messages, setMessages ] = useState([]);
  const {connection} = useContext(SignalRContext);

  useEffect(() => {
    fetch("https://localhost:5002/api/chat")
        .then((resp) => resp.json().then(messages => {
            setMessages(messages);
        }))
  }, [])

  useEffect(() => {
    connection.on("NuevoMensaje", () => {
      fetch("https://localhost:5002/api/chat")
            .then((resp) => resp.json().then(messages => {
                setMessages(messages);
            }))
    });
  
  }, [connection])

  return (
    <>
        <h2>Mensajes:</h2>
        <ul>
            {
                messages.map(m => <li key={m.mensaje}>{ `${m.usuarioId} dijo: ${m.mensaje}`}</li>)
            }
        </ul>
    </>
  )
}

export default ChatList