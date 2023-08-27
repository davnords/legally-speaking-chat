const ChatBubbleIcon = ({ onClick, isChatOpen }: any) => {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
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
        {isChatOpen ? (
          <>❌</>
        ): <>💬</>}
      </div>
    );
  };
  
  export default ChatBubbleIcon;