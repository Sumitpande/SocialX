import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import useCreatePost from "@/Hooks/useCreatePost";
import { CornerDownLeft, Image, Mic, X } from "lucide-react";
import { useRef, useState } from "react";
import LoadingSpin from "../LoadingSpin";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel";

// import { Toggle } from "../ui/toggle";

export default function CreatePostForm({ isMobile }: { isMobile: boolean }) {
  const [content, setContent] = useState("");
  // const [hidden, setHidden] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const { loading, createPost } = useCreatePost();
  const create = () => {
    createPost(content);
    setContent("");
  };
  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesObj = e.target.files;
    if (!filesObj) return;

    const file = filesObj[0];
    setFiles([...files, ...Array.from(filesObj)]);
    // use the file
    console.log(file);
  };
  const onMediaClick = () => {
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  };
  const removeImage = (file: File) => {
    setFiles([...files.filter((f) => f.name !== file.name)]);
    console.log(inputRef);
  };
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      className={
        "relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring " +
        (isMobile ? "hidden" : "block")
      }
      x-chunk="dashboard-03-chunk-1"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div className="preview p-3">
        <Carousel
          opts={{
            align: "start"
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {files.map((file, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <Card className="rounded w-fit relative">
                  <CardContent>
                    <Button
                      className="absolute right-0 top-0 h-4 w-4"
                      type="button"
                      variant="outline"
                      size="icon"
                    >
                      <X
                        className="h-3 w-3"
                        onClick={() => removeImage(file)}
                      />
                    </Button>
                    <img
                      className="max-h-56"
                      src={URL.createObjectURL(file)}
                    ></img>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          {files.length > 2 && (
            <>
              <CarouselPrevious className="absolute left-0" />
              <CarouselNext className="absolute right-0" />
            </>
          )}
        </Carousel>
      </div>
      <div className="flex items-center p-3 pt-0">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFilesChange}
          className={"hidden"}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                onClick={() => onMediaClick()}
                variant="ghost"
                size="icon"
              >
                <Image className="size-4" />
                <span className="sr-only">Media</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          type="button"
          size="sm"
          className="ml-auto gap-1.5"
          disabled={loading}
          onClick={() => create()}
        >
          {loading ? (
            <LoadingSpin />
          ) : (
            <>
              Post
              <CornerDownLeft className="size-3.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
