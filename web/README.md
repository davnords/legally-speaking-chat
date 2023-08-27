# Front-end website hosting chatbot

Produced using [Next.js](https://nextjs.org) and hosted with [Vercel](https://sdk.vercel.ai/docs).

A live-demo of the website can be found at our [website](https://chat-connect-technologies.vercel.app/).

## Running locally

```bash
npm install
npm run dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).


## Embedded Chat

In the ```/app/embedded-chat``` directory you find the React component that can be integrated on your website. In order to integrate the component on a website in pure html, you simply append the following code in the html (where namespace is substituted for the desired namespace).

However, this currently looks really bad. I left it here because I probably need some input from William to improve it.

```
<iframe id="chatterFlowChat" src="http://localhost:3000/embedded-chat/76c4a761-0ab2-46ff-b69a-d7ec4c03886a"
    loading="lazy" width="0.1px" height="0.1px"></iframe>
<script src="http://localhost:3000/js/chatter-flow-chat.js"></script>
```

Problem remaining: Clickability of bubble to always remain but iframe element not hiding content behind it from clicks. 

## To Do:s
- [ ] Provide smooth transition when chat bubble is clicked
- [ ] Allow hover effects when chat-bubble is hovered
- [ ] Get iframe to be clickable but not hide clicks behind it
- [ ] Ensure that the chat bubble icon does not change size on mounting

