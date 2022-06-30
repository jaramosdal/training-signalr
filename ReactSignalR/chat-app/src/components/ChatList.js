import React from 'react'

const ChatList = ({ data }) => {

    

  return (
    <>
        <h2>Mensajes:</h2>
        <ul>
            {
                data.map(m => <li key={m.mensaje}>{ `${m.usuarioId} dijo: ${m.mensaje}`}</li>)
            }
        </ul>
    </>
  )
}

export default ChatList