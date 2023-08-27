type Author = {
    name: string;
    image: string;
    designation: string;
  };

export type Blog = {
    id: number;
    title: string;
    paragraph: string;
    image: string;
    author: Author;
    tags: string[];
    publishDate: string;
    link: string;
  };
  
const blogData: Blog[] = [
  {
    id: 1,
    title: "Custom GPT: Finetune LLaMA 2 by PEFT",
    paragraph:
      "It is now simple to finetune LLMs on consumer hardware using PEFT methods such as LoRA, enabling training our own models tailored to your application.",
    image: "/images/blog/peft-image.png",
    author: {
      name: "David Nordström",
      image: "/images/blog/david-nordstrom.png",
      designation: "Founder & CEO",
    },
    tags: ["technology"],
    publishDate: "2023",
    link: "/news/blog-entries/custom-gpt",
  },
  {
    id: 2,
    title: "Join our team and build the next generation of chatbots",
    paragraph:
      "We are looking for motivated individuals to help build this product and scaling it inside and outside of Sweden. Applicants of all backgrounds are welcome.",
    image: "/images/blog/placeholder.png",
    author: {
      name: "David Nordström",
      image: "/images/blog/david-nordstrom.png",
      designation: "Founder & CEO",
    },
    tags: ["hiring"],
    publishDate: "2023",
    link: "/news/blog-entries/hiring",
  },
  {
    id: 3,
    title: "Introducing ChatterFlow: An AI chatbot company",
    paragraph:
      "ChatterFlow is a Swedish AI company that deploys chatbots custom made for your application and with access to your data through vector embeddings.",
    image: "/images/blog/launch.jpeg",
    author: {
      name: "David Nordström",
      image: "/images/blog/david-nordstrom.png",
      designation: "Founder & CEO",
    },
    tags: ["launch"],
    publishDate: "2023",
    link: "/news/blog-entries/launch",
  },
];
export default blogData;
