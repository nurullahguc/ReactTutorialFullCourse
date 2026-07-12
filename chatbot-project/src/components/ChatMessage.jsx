import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'
import dayjs from 'dayjs'


console.log(UserProfileImage);


export function ChatMessage({ message, sender, createdAt, isLoading }) {
  return (
    <div
      className={
        sender === 'user'
          ? 'chat-message-user'
          : 'chat-message-robot'
      }
    >
      {sender === 'robot' && (
        <img
          className="chat-message-profile"
          src={RobotProfileImage}
        />
      )}

      <div className="chat-message-text">
        <p>{message}</p>
        {isLoading ? '' : (
          <p className='messageCreatedAt'>{dayjs(createdAt).format('h:mma')}</p>
        )}
      </div>

      {sender === 'user' && (
        <img
          className="chat-message-profile"
          src={UserProfileImage}
        />
      )}
    </div>
  );
}