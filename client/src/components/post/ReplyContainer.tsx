import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Image } from "lucide-react";
import { useState } from "react";

export default function ReplyContainer() {
  const { authUser } = useAuthContext();
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-row gap-3 align-middle my-2">
      <Avatar className="h-10 w-10 rounded-full self-center">
        <AvatarImage
          src={authUser.avatar}
          alt={authUser.firstName + " " + authUser.lastName}
        />
        <AvatarFallback className="rounded-lg">
          {authUser.firstName[0]}
        </AvatarFallback>
      </Avatar>

      <div className="self-center flex flex-col w-full">
        <div className="ml-3">
          {show && <div>replying to @sumit</div>}
          <input
            onFocus={() => setShow(true)}
            className="w-full text-2xl focus:outline-none"
            placeholder="Post your reply"
            type="text"
          ></input>
        </div>
        {show && (
          <div className="flex">
            <Button
              className="hover:text-blue-500 hover:bg-blue-50 rounded-full"
              variant="ghost"
            >
              <Image />
            </Button>
            <Button className="ml-auto rounded-full">Reply</Button>
          </div>
        )}
      </div>
    </div>
  );
}
