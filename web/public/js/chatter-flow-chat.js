window.addEventListener('message', (event) => {
    const receivedMessage = event.data;
    if (receivedMessage.includes('chatterFlowEvent')) {
        let newStyle = receivedMessage.split('resize:')[1]
        if (newStyle) {
            newStyle = JSON.parse(newStyle)
            const iframe = window.document.getElementById('chatterFlowChat')
            for (key of Object.keys(newStyle)) {
                if (key === 'width' || key === 'height') {
                    iframe[key] = newStyle[key]
                } else {
                    iframe.style[key] = newStyle[key]
                }
            }
        }
    }
});