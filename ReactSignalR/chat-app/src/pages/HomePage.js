import ChatList from '../components/ChatList';
import ChatMessage from '../components/ChatMessage';
import { useContext } from 'react';
import { SignalRContext } from '../contexts/SignalRContext';
import UsersList from '../components/UsersList';

function HomePage() {

  const {online} = useContext(SignalRContext);

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

      <UsersList />

      <div className='row'>
        <div className='col-8'>
          <ChatList />
        </div>
        
        <div className='col-4'>
          <ChatMessage />
        </div>
      </div>
      
    </div>
  );
}

export default HomePage;
