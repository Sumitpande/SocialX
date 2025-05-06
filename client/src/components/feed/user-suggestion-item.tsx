import { IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useSendFollowRequest from "@/hooks/useSendFollowRequest";
import { useState } from "react";

import { Loader2 } from "lucide-react";
import useDeleteUserRequest from "@/hooks/useDeleteUserRequest";
// import { useAuthContext } from "@/context/AuthContext";

export default function UserSuggestionItem({ person }: { person: IUser }) {
  const [btnText, setBtnText] = useState("Follow");
  const { deleteRequest, errorD, loadingD } = useDeleteUserRequest();
  const { sendRequest, loading, error } = useSendFollowRequest();

  const followUser = () => {
    if (btnText === "Requested") {
      deleteRequest(person._id);
      setTimeout(() => {
        if (!errorD && !loadingD) {
          setBtnText("Follow");
        }
      }, 300);
    }
    if (btnText === "Follow") {
      sendRequest(person._id);
      setTimeout(() => {
        if (!error && !loading) {
          setBtnText("Requested");
        }
      }, 300);
    }
  };
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={person.avatar} />
          <AvatarFallback>{person.firstName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {person.firstName + " " + person.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{person.username}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-8 px-2"
        onClick={followUser}
        disabled={loading || loadingD}
      >
        {(loading || loadingD) && <Loader2 />}
        {btnText}
      </Button>
    </div>
  );
}
