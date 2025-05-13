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
import { ICallData } from "@/types";
import { Phone, PhoneOff } from "lucide-react";

export function IncomingCallAlert({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: ICallData;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-4 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)] animation-pulse-glow">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Incoming Call
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center my-4 flex flex-col items-center gap-3">
            <Avatar className="w-16 h-16 mx-auto ">
              <AvatarImage
                src={data.isGroup ? data.avatar : data?.from?.avatar}
                alt="@shadcn"
              />
              <AvatarFallback>
                {data.isGroup ? data.name[0] : data?.from?.firstName[0]}
              </AvatarFallback>
            </Avatar>
            <span className="font-bold text-lg">
              {data.isGroup
                ? data.name
                : `${data?.from?.firstName} ${data?.from?.lastName}`}
            </span>
            {data.isGroup && (
              <div className="flex flex-col items-center">
                <div className="text-xs">Group voice Call</div>
                <div className="text-xs">
                  From {`${data?.from?.firstName} ${data?.from?.lastName}`}{" "}
                </div>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2 justify-center sm:justify-center">
          <Button
            variant="destructive"
            className="flex items-center justify-center gap-2"
            onClick={() => setOpen(false)}
          >
            <div className="font-bold">Decline</div>
            <PhoneOff className="ml-2 w-4" />
          </Button>
          <Button
            variant="green"
            className="flex items-center justify-center gap-2"
            onClick={() => setOpen(false)}
          >
            <div className="font-bold">Accept</div>
            <Phone className="ml-2 w-4" />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
