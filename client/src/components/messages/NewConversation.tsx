import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useGetConnections from "@/hooks/useGetConnections";
import { IUser } from "@/types";
import useCreateConversation from "@/hooks/useCreateConversation";

export default function NewConversation({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { connections } = useGetConnections();
  const { createConversation } = useCreateConversation();
  const getUser = (id: string): IUser => {
    return connections.find((user) => user._id === id) as IUser;
  };

  const createNewConversation = async () => {
    createConversation(selectedUsers);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-0 p-0 outline-none">
        <DialogHeader className="px-4 pb-4 pt-5">
          <DialogTitle>New message</DialogTitle>
          <DialogDescription>
            Invite a user to this thread. This will create a new group message.
          </DialogDescription>
        </DialogHeader>
        <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup className="p-2">
              {connections.map((user) => (
                <CommandItem
                  key={user.email}
                  className="flex items-center px-2 cursor-pointer"
                  onSelect={() => {
                    if (selectedUsers.includes(user._id)) {
                      return setSelectedUsers(
                        selectedUsers.filter(
                          (selectedUserId) => selectedUserId !== user._id
                        )
                      );
                    }

                    return setSelectedUsers(
                      [...connections.map((c) => c._id)].filter((u) =>
                        [...selectedUsers, user._id].includes(u)
                      )
                    );
                  }}
                >
                  <Avatar>
                    <AvatarImage src={user.avatar} alt="Image" />
                    <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  {selectedUsers.includes(user._id) ? (
                    <Check className="ml-auto flex h-5 w-5 text-primary" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
          {selectedUsers.length > 0 ? (
            <div className="flex -space-x-2 overflow-hidden">
              {selectedUsers.map((id) => (
                <Avatar
                  key={getUser(id).email}
                  className="inline-block border-2 border-background"
                >
                  <AvatarImage src={getUser(id).avatar} />
                  <AvatarFallback>{getUser(id).firstName[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select users to add to this thread.
            </p>
          )}
          <Button
            disabled={selectedUsers.length < 1}
            onClick={createNewConversation}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
