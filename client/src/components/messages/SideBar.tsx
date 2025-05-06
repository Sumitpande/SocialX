import { Link } from "react-router-dom";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "../ui/badge";
import useConversationStore from "@/store/conversationStore";
import useGetConversations from "@/hooks/useGetConversations";
import { IConversation, IUser } from "@/types";
import { useAuthContext } from "@/context/AuthContext";

import { useState } from "react";
import NewConversation from "./NewConversation";
import { formatAmPm, getDateString, isToday } from "@/utils";
type size = "default" | "sm" | "lg" | "icon" | null | undefined;
type btnV =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;
interface SidebarProps {
  isCollapsed: boolean;

  onClick?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const { selectedConversation, setSelectedConversation, conversations } =
    useConversationStore();
  const { authUser } = useAuthContext();
  const { loading } = useGetConversations();
  // const { connections } = useGetConnections();
  console.log("conversations", conversations);
  const getVariant = (id: string): btnV => {
    return id == selectedConversation._id
      ? ("secondary" as btnV)
      : ("ghost" as btnV);
  };

  const getName = (conversation: IConversation) => {
    if (conversation.participants.length == 2) {
      const user = conversation.participants.find(
        (user) => user._id !== authUser?._id
      );
      return user?.firstName + " " + user?.lastName;
    } else {
      return conversation.name;
    }
  };

  const getAvatar = (conversation: IConversation) => {
    if (conversation.participants.length == 2) {
      const user: IUser | undefined = conversation.participants.find(
        (user) => user._id !== authUser?._id
      );
      return user?.avatar;
    }
    return conversation.avatar;
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({conversations.length})</span>
          </div>

          <div>
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <SquarePen onClick={() => setOpen(true)} size={20} />
              {/* <UserSuggestionsDialog /> */}
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {!loading &&
          conversations.map((link, index) =>
            isCollapsed ? (
              <TooltipProvider key={index}>
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => setSelectedConversation(link)}
                      className={cn(
                        buttonVariants({
                          variant: getVariant(link._id),
                          size: "icon",
                        }),
                        "h-11 w-11 md:h-16 md:w-16",
                        getVariant(link._id) === ("secondary" as btnV) &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <Avatar className="flex justify-center items-center">
                        <AvatarImage
                          src={getAvatar(link)}
                          alt={getAvatar(link)}
                          width={6}
                          height={6}
                          className="w-10 h-10 "
                        />
                        <AvatarFallback>{"G"}</AvatarFallback>
                      </Avatar>
                      <span className="sr-only">
                        {link.isGroup ? link.name : getName(link)}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.isGroup ? link.name : getName(link)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div
                key={index}
                onClick={() => setSelectedConversation(link)}
                className={cn(
                  buttonVariants({
                    variant: getVariant(link._id),
                    size: "xl" as size,
                  }),
                  getVariant(link._id) === ("secondary" as btnV) &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                  "justify-between p-4 gap-4"
                )}
              >
                <div className="flex flex-row gap-4">
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={getAvatar(link)}
                      alt={getAvatar(link)}
                      width={6}
                      height={6}
                      className="w-10 h-10 "
                    />
                    <AvatarFallback>{getName(link)?.[0] ?? "G"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col max-w-28">
                    <span> {getName(link)}</span>
                    {link.messages?.length > 0 && (
                      <span className="text-zinc-300 text-xs truncate ">
                        {
                          link?.messages[
                            link.messages?.length - 1
                          ]?.text?.split(" ")[0]
                        }
                        : {link.messages[link.messages?.length - 1].text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-end items-end">
                  <div className="text-xs">
                    {isToday(link?.updatedAt)
                      ? formatAmPm(link?.updatedAt)
                      : getDateString(link?.updatedAt)}
                  </div>
                  <Badge className="text-xs" variant="secondary">
                    5
                  </Badge>
                </div>
              </div>
            )
          )}
      </nav>
      <NewConversation open={open} setOpen={setOpen} />
    </div>
  );
}
