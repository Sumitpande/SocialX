export function formatAmPm(date: string) {
  const dateObj = new Date(date);
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  const format = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? 0 + minutes : minutes;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${format}`;
}
export const userData = [
  {
    id: 1,
    avatar: "/User1.png",
    messages: [
      {
        id: 1,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "Hey, Jakob",
      },
      {
        id: 2,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "Hey!",
      },
      {
        id: 3,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "How are you?",
      },
      {
        id: 4,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "I am good, you?",
      },
      {
        id: 5,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "I am good too!",
      },
      {
        id: 6,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "That is good to hear!",
      },
      {
        id: 7,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "How has your day been so far?",
      },
      {
        id: 8,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message:
          "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
      },
      {
        id: 9,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "I had a relaxing day. Just catching up on some reading.",
      },
    ],
    name: "Jane Doe",
  },
  {
    id: 2,
    avatar: "/User2.png",
    name: "John Doe",
  },
  {
    id: 3,
    avatar: "/User3.png",
    name: "Elizabeth Smith",
  },
  {
    id: 4,
    avatar: "/User4.png",
    name: "John Smith",
  },
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
  id: 5,
  avatar: "/LoggedInUser.jpg",
  name: "Jakob Hoeg",
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}

interface IPost {
  name: string;
  image: string;
  media: string[];
}
export const posts: IPost[] = [
  {
    name: "aaaa",
    image:
      "https://images.pexels.com/photos/11113361/pexels-photo-11113361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    media: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.pexels.com/photos/21542762/pexels-photo-21542762/free-photo-of-man-riding-donkey-with-herd-of-goats-behind-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  {
    name: "bbb",
    image:
      "https://images.pexels.com/photos/11113361/pexels-photo-11113361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    media: [
      "https://images.pexels.com/photos/11113361/pexels-photo-11113361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/20175185/pexels-photo-20175185/free-photo-of-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/20175185/pexels-photo-20175185/free-photo-of-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/20175185/pexels-photo-20175185/free-photo-of-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
  },
  {
    name: "cc",
    image:
      "https://images.pexels.com/photos/11113361/pexels-photo-11113361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    media: [
      "https://images.pexels.com/photos/11113361/pexels-photo-11113361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/20175185/pexels-photo-20175185/free-photo-of-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
  },
  {
    name: "dd",
    image:
      "https://images.pexels.com/photos/11113361/pexels-photo-11113361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    media: [
      "https://images.pexels.com/photos/11113361/pexels-photo-11113361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/21542762/pexels-photo-21542762/free-photo-of-man-riding-donkey-with-herd-of-goats-behind-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/21542762/pexels-photo-21542762/free-photo-of-man-riding-donkey-with-herd-of-goats-behind-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  {
    name: "ee",
    image:
      "https://images.pexels.com/photos/11113361/pexels-photo-11113361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    media: [],
  },
];

export const isToday = (dateStr: string) => {
  const today = new Date();
  const date = new Date(dateStr);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const getDateString = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const ROOT_PATH = "";
const path = (root: string, endpoint: string) => {
  return `${root}/${endpoint}`;
};
export const APP_PATH = {
  root: ROOT_PATH,
  general: {
    home: "",
    messages: "messages",
  },
  login: path(ROOT_PATH, "login"),
  register: path(ROOT_PATH, "register"),
};
