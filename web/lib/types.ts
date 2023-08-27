import { type Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export type TeamMember = {
  id: number;
  name: string;
  designation: string;
  image: string;
  education: string;
  experience: string[];
  linkedin: string;
};


export type Testimonial = {
  id: number;
  name: string;
  designation: string;
  content: string;
  image: string;
  star: number;
};


