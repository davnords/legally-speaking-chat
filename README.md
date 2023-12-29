# LegallySpeaking AI 🤖⚖️

Welcome to the public repository of the chat service hosted on [LegallySpeaking.se](https://www.legallyspeaking.se/). This repository is built using Next.js and the model I use has +100,000 Swedish legal documents embedded in a vector database. 

## Overview ℹ️

The main steps of the pipeline is:

### Data engineering
- 📚 Embed legal documents: A web scraper (Selenium Python) is used to embed (OpenAI embeddings) +100,000 legal documents.
- 📑 Upload them to a database: A vector database such as Pinecone works splendid for this purpose.

### Question answering
- 🚀 Get a question: Using a react component, get a question through the frontend.
- 🚀 Retrieve relevant data: Take the question and use cosine similarity to retrieve the most similar documents from the vector database.
- 🚀 Feed the relevant data to GPT: Feed the relevant data, along with the question, into a prompt to GPT4 using the OpenAI api.
- 🚀 Stream response: Stream the response to the React frontend.
- 🚀 Display sources: Rank the most relevant sources and display links and cosine similarity scores to the frontend. 

## Contributing 🤝

Contributions are welcome! If you want to contribute to this project:

- Fork the repository.
- Create your branch: `git checkout -b feature/YourFeature`
- Commit your changes: `git commit -am 'Add YourFeature'`
- Push to the branch: `git push origin feature/YourFeature`
- Submit a pull request.

Please feel free to contact me at david.nordstromm@gmail.com for any inquiries or collaborations.

## License 📝

This project is licensed under the [MIT License](LICENSE), allowing you to use and modify the codebase freely.

---

Use this to build your own retrieval agent, perhaps a legal advisor in another country or in a completely other domain! Dont be afraid to ask questions; keep on coding! 🌍✨
