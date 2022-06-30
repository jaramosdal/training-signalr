import React, { useContext, useEffect, useState } from 'react'
import { SignalRContext } from '../contexts/SignalRContext';

const UsersList = () => {
  const [ connectedUsers, setConnectedUsers ] = useState([]);
  const {connection} = useContext(SignalRContext);

  useEffect(() => {
    connection.on("ConnectedUser", (user) => {
      setConnectedUsers((prevConnectedUsers) => prevConnectedUsers.includes(user) ? prevConnectedUsers : [...prevConnectedUsers, user]);
    });
  
  }, [connection])

  useEffect(() => {
    connection.on("DisconnectedUser", (user) => {
      setConnectedUsers((prevConnectedUsers) => prevConnectedUsers.filter(u => u !== user));
    });
  
  }, [connection])
  
  return (
    <>
        <h2>Connected users:</h2>
        <ul>
            {
                connectedUsers.map(user => <li key={ user }>{user}</li>)
            }
        </ul>
    </>
  )
}

export default UsersList