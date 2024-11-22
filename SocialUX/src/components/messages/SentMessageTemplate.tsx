import { useAuthContext } from "../../context/AuthContext";

import { IMessage } from "../../types";
import { formatAmPm } from "../../utils/util";

export default function SentMessageTemplate({
  message
}: {
  message: IMessage;
}) {
  const { authUser } = useAuthContext();
  return (
    <div
      key={message.createdAt}
      className="ml-auto w-fit flex flex-row gap-x-1 "
    >
      <div className="flex flex-col">
        <div className="from self-end py-2 my-1 px-3 max-w-prose w-fit bg-gray-400 rounded-lg rounded-tr-none">
          {message?.text}
        </div>
        <div className="self-end text-xs text-gray-400">
          {formatAmPm(message?.createdAt as string)}
        </div>
      </div>
      <img
        className="h-8 w-8 flex-none rounded-full bg-gray-50"
        src={authUser?.avatar}
        alt=""
      />
    </div>
  );
}
