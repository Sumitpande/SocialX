import CreatePostForm from "@/components/feed/CreatePostForm";
import Post from "@/components/feed/Post";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import useGetPosts from "@/Hooks/useGetPosts";
// import { Badge } from "@/components/ui/badge";

import { posts as p } from "@/utils/util";

import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { loading, posts } = useGetPosts();
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);
  return (
    <div className="flex flex-row h-full">
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <CreatePostForm isMobile={isMobile} />

        <div className="overflow-y-auto px-2">
          {p.map((post) => (
            <Post key={post.name} post={post} />
          ))}
        </div>
      </div>
      <div className={"px-4 min-w-80 " + (isMobile ? "hidden" : "block")}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Follow Requests</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Suggestions</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
