import { APP_PATH } from "@/utils";
import { Bot, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: APP_PATH.general.home,
      icon: Home,
      isActive: true,
    },
    {
      title: "Messages",
      url: APP_PATH.general.messages,
      icon: Bot,
    },
  ],
};
export default function BottomNav() {
  const location = useLocation();
  const isActive = (url: string) => {
    return url === location.pathname;
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="flex justify-around py-2">
        {data.navMain.map((item, index) => (
          <Link key={index} to={item.url}>
            <Button
              className={`${
                isActive(item.url) ? "text-blue-500" : "text-gray-500"
              }`}
              variant="ghost"
            >
              <item.icon className="w-16 h-16" />
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
