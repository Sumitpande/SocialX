import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { Mic, MicOff, PhoneOff, Volume2, VolumeOff } from "lucide-react";
import { Card, CardDescription } from "../ui/card";
import { IOutgoingCallData, IUser } from "@/types";
import { useState } from "react";

export function OutgoingCall({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: IOutgoingCallData;
}) {
  const [speaker, setSpeaker] = useState(false);
  const [muted, setMuted] = useState(false);
  const { authUser } = useAuthContext();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-4 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)] animation-pulse-glow">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Calling...
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center my-4 flex flex-col items-center gap-3">
            <div className="flex">
              {data?.to?.map((user: IUser) => (
                <Card className="w-32 h-32 flex flex-col items-center justify-center mx-2">
                  <CardDescription>
                    <Avatar className="w-16 h-16 mx-auto ">
                      <AvatarImage src={user?.avatar} alt={user?.firstName} />
                      <AvatarFallback>{user?.firstName[2]}</AvatarFallback>
                    </Avatar>
                    <div className="font-bold text-md my-1">{`${user?.firstName} ${user?.lastName}`}</div>
                    <div className="text-xs">Ringing...</div>
                  </CardDescription>
                </Card>
              ))}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-full flex flex-row justify-center  gap-2">
            <Button
              variant="ghost"
              className=""
              onClick={() => setSpeaker(!speaker)}
            >
              {speaker ? <VolumeOff /> : <Volume2 />}
            </Button>
            <Button
              variant="ghost"
              className=""
              onClick={() => setMuted(!muted)}
            >
              {muted ? <MicOff /> : <Mic />}
            </Button>
            <Button
              variant="destructive"
              className=""
              onClick={() => setOpen(false)}
            >
              <PhoneOff />
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
