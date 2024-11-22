import { IMessage, IUser } from "../../types";
import { formatAmPm } from "../../utils/util";

export default function ReplyMessageTemplate({
  user,
  message
}: {
  user: IUser;
  message: IMessage;
}) {
  return (
    <div
      key={message.createdAt}
      className="mr-auto w-fit flex flex-row gap-x-1 "
    >
      <img
        className="h-8 w-8 flex-none rounded-full bg-gray-50"
        src={user.avatar}
        alt=""
      />
      <div className="flex flex-col">
        <div className="from self-start py-2 my-1 px-3 max-w-prose w-fit bg-gray-100 rounded-lg rounded-tl-none">
          {message?.text}
        </div>
        <div className="text-xs self-start text-gray-400">
          {formatAmPm(message?.createdAt as string)}
        </div>
      </div>
    </div>
  );
}
