import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faComment } from '@fortawesome/free-solid-svg-icons';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  color?: string;
  title?: string;
}

const EmbeddedChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, children, color, title }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '4vw',
        right: '4vw',
        width: 'calc(100% - 8vw)',
        height: '90%',
        backgroundColor: '#fcfcfc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        padding: '16px',
        paddingTop: '40px',
        display: isOpen ? 'block' : 'none',
        flexDirection: 'column',
        overflow: 'hidden', // Prevent content from overflowing
      }}
    >
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '60px', // Set the height of the blue section here
        backgroundColor: color || '#005d92', // Set the blue color here
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '20px',
        zIndex: '2',
      }}>
        <div className='text-white pl-5 text-lg'>
          <FontAwesomeIcon icon={faComment} />&nbsp;{title || 'Chatbot'}
        </div>
        <button
          style={{
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
            fontSize: '22.5px',
            color: '#ffffff',
            justifyContent: 'flex-end'
          }}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {/* Render the children JSX content inside a scrolling container */}
      <div
        style={{
          height: 'calc(100% - 98px)', // Reserve space for the close button
          overflowY: 'auto', // Allow vertical scrolling when content overflows
          overflowX: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default EmbeddedChatWindow;
