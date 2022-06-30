import React, { useState } from 'react'

const ChatMessage = () => {

    const [ message, setMessage ] = useState({
        usuarioId: '',
        mensaje: ''
    });

    const handleInputChange = ({target}) => {
        setMessage({
            ...message,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        await fetch("https://localhost:5002/api/chat", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });
    }

  return (
    <>
        <h3>Enviar mensaje</h3>

        <form onSubmit={handleSubmit}>
            <input
                name="usuarioId"
                value={message.usuarioId}
                className='form-control'
                placeholder='Usuario'
                onChange={handleInputChange}
            />

            <input
                name="mensaje"
                value={message.mensaje}
                className='form-control'
                placeholder='Mensaje'
                onChange={handleInputChange}
            />

            <button>
                Enviar
            </button>
        </form>
    </>
  )
}

export default ChatMessage