import * as signalR from '@microsoft/signalr'
import ChatList from './components/ChatList';
import ChatMessage from './components/ChatMessage';
import { useEffect, useState } from 'react';

const connectSignalRServer = () => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5002/chathub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return connection;
}

function App() {

  const [ connection ] = useState(connectSignalRServer());
  const [ online, setOnline ] = useState(false);
  const [ connectedUsers, setConnectedUsers ] = useState([]);
  const [ messages, setMessages ] = useState([]);
    
    useEffect(() => {
        fetch("https://localhost:5002/api/chat")
            .then((resp) => resp.json().then(messages => {
                setMessages(messages);
            }))
    }, [])
  
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
  
  useEffect(() => {
    connection.on("NuevoMensaje", () => {
      fetch("https://localhost:5002/api/chat")
            .then((resp) => resp.json().then(messages => {
                setMessages(messages);
            }))
    });
  
  }, [connection])
  
  useEffect(() => {
    connection.onclose(() => {
      setOnline(false);
    });
  
  }, [connection])
  
  useEffect(() => {
    if (connection.state === signalR.HubConnectionState.Disconnected) {
      connection.start().then(() => {
        setOnline(true);
      }).catch((err) => {
        setOnline(false);
        console.error(err.toString())
      });
    }
    
  }, [connection])

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status:
          {
            online ? 
              <span className='text-success'>Online</span> :
              <span className='text-danger'>Offline</span>
          }
        </p>
      </div>

      <h1>Chat</h1>
      <hr />

      <h2>Connected users:</h2>
      <ul>
        {
          connectedUsers.map(user => <li key={ user }>{user}</li>)
        }
      </ul>

      <div className='row'>
        <div className='col-8'>
          <ChatList 
            data={messages}
          />
        </div>
        
        <div className='col-4'>
          <ChatMessage />
        </div>
      </div>
      
    </div>
  );
}

export default App;
