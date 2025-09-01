import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmileIcon } from "lucide-react";
import { lazy } from "react";
const LazyEmojiPicker = lazy(() => import("emoji-picker-react"));
interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <LazyEmojiPicker
          open={true}
          onEmojiClick={(emoji) => onChange(emoji.emoji)}
          searchDisabled={false}
          height={400}
          width={300}
        />
      </PopoverContent>
    </Popover>
  );
};
