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
import { PhoneOff } from "lucide-react";
interface IData {
  name: string;
  avatar: string;
}
export function OutgoingCall({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: IData;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-4 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)] animation-pulse-glow">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Calling...
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center my-4 flex flex-col items-center gap-3">
            <Avatar className="w-16 h-16 mx-auto ">
              <AvatarImage src={data.avatar} alt={data?.name} />
              <AvatarFallback>{data?.name[2]}</AvatarFallback>
            </Avatar>
            <div className="font-bold text-lg">{`${data?.name}`}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setOpen(false)}
          >
            <div className="font-bold">End Call</div>
            <PhoneOff className="ml-2 w-4" />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
