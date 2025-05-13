import { Avatar, AvatarImage } from "../ui/avatar";

import { Info, Phone, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { IConversation, IUser } from "@/types";
import { useAuthContext } from "@/context/AuthContext";
import useMakeCall from "@/hooks/useMakeCall";
import { OutgoingCall } from "../calls/OutgoingCall";

interface ChatTopbarProps {
  selectedConversation?: IConversation;
}

const TopBarIcons = [
  { icon: Phone, action: "makeCall" },
  { icon: Video, action: "startVideoCall" },
  { icon: Info, action: "showInfo" },
];

export default function ChatTopbar({ selectedConversation }: ChatTopbarProps) {
  const { authUser } = useAuthContext();
  const { makeCall, open, setOpen } = useMakeCall();

  const getOutgoingCallData = () => {
    return { name: getLabel() || "", avatar: getAvatar() || "" };
  };

  const getLabel = () => {
    if (selectedConversation?.isGroup) {
      return selectedConversation?.name;
    } else {
      const user = selectedConversation?.participants.find(
        (user: IUser) => user._id !== authUser?._id
      );
      return user?.firstName + " " + user?.lastName;
    }
  };
  const getAvatar = () => {
    if (selectedConversation?.isGroup) {
      return selectedConversation?.avatar || "G";
    } else {
      const user = selectedConversation?.participants.find(
        (user: IUser) => user._id !== authUser?._id
      );
      return user?.avatar;
    }
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case "makeCall":
        makeCall({
          callType: "audio",
          conversation: selectedConversation,
          from: authUser,
        });
        break;
      case "startVideoCall":
        // Handle start video call action
        break;
      case "showInfo":
        // Handle show info action
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={getAvatar()}
            alt={getLabel()}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{getLabel()}</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>

      <div>
        {TopBarIcons.map((icon, index) => (
          <Link
            key={index}
            to="#"
            onClick={() => handleActionClick(icon.action)}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
