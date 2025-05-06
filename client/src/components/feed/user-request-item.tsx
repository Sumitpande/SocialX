import { IUserRequest } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useAcceptFollowRequest from "@/hooks/useAcceptFollowRequest";
import { useState } from "react";
import useSendFollowRequest from "@/hooks/useSendFollowRequest";

export default function UserRequestItem({
  request,
}: {
  request: IUserRequest;
}) {
  const person = request.sender;
  const [btnText, setBtnText] = useState("Confirm");
  const { acceptRequest, loadingA, errorA } = useAcceptFollowRequest();
  const { sendRequest, loading, error } = useSendFollowRequest();
  const confirmRequest = () => {
    if (btnText == "Confirm") {
      acceptRequest(request._id);
      if (!loadingA && !errorA) {
        setBtnText("Follow Back");
      }
    } else if (btnText == "Follow Back") {
      sendRequest(person._id);
      if (!loading && !error) {
        setBtnText("Requested");
      }
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
        disabled={loading || loadingA}
        onClick={confirmRequest}
      >
        {(loadingA || loading) && <Loader2 />}
        {btnText}
      </Button>
    </div>
  );
}
