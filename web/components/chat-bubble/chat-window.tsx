import React, { ReactNode } from 'react';
import { useTheme } from 'next-themes'

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, children }) => {
  const { theme, setTheme } = useTheme()
  let backgroundColor = theme === 'light' ? '#f1f1f1' : '#222'; // Set the background color based on the theme
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        width: '400px',
        height: '500px',
        backgroundColor,
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        padding: '16px',
        display: isOpen ? 'block' : 'none',
        flexDirection: 'column',
        overflow: 'hidden', // Prevent content from overflowing
      }}
    >
      {/* Add a close button to the chat window */}
      <button
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          cursor: 'pointer',
        }}
        onClick={onClose}
      >
        ❌
      </button>

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

export default ChatWindow;
