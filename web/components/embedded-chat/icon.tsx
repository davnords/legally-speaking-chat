import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ChatBubbleIconProps{
  onClick: () => void
  isChatOpen: () => boolean
  color?: string
}

const ChatBubbleIcon = ({ onClick, isChatOpen, color }: any) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: color ||'#005d92',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#fff',
        fontSize: '24px',
      }}
      onClick={onClick}
    >
      <div>
        {isChatOpen ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : <FontAwesomeIcon icon={faComments} />}
      </div>
    </div>
  );
};

export default ChatBubbleIcon;