// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import ChatLayout from "./ChatLayout";

export default function Message() {
  return (
    // <div className="grid grid-cols-4 gap-2 h-full">
    //   <div className="col-span-2">
    //     <Card className="h-full" x-chunk="dashboard-01-chunk-5 ">
    //       <CardHeader>
    //         <CardTitle>Recent Sales</CardTitle>
    //       </CardHeader>
    //       <CardContent className="grid gap-2">
    //         <div className="flex items-center gap-4 p-1.5 rounded hover:bg-muted">
    //           <Avatar className="hidden h-8 w-8 sm:flex">
    //             <AvatarImage src="/avatars/01.png" alt="Avatar" />
    //             <AvatarFallback>OM</AvatarFallback>
    //           </Avatar>
    //           <div className="grid gap-1 ">
    //             <p className="text-sm font-medium leading-none">
    //               Olivia Martin
    //             </p>
    //             <p className="text-sm text-muted-foreground">
    //               olivia.martin@email.com
    //             </p>
    //           </div>
    //           <div className="ml-auto grid grid-flow-row font-medium">
    //             <span className="text-xs">yesterday</span>
    //             <div>
    //               <Badge>3</Badge>
    //             </div>
    //           </div>
    //         </div>
    //         <Separator />
    //         <div className="flex items-center gap-4 p-1.5 rounded hover:bg-muted">
    //           <Avatar className="hidden h-8 w-8 sm:flex">
    //             <AvatarImage src="/avatars/01.png" alt="Avatar" />
    //             <AvatarFallback>OM</AvatarFallback>
    //           </Avatar>
    //           <div className="grid gap-1 ">
    //             <p className="text-sm font-medium leading-none">
    //               Olivia Martin
    //             </p>
    //             <p className="text-sm text-muted-foreground">
    //               olivia.martin@email.com
    //             </p>
    //           </div>
    //           <div className="ml-auto grid grid-flow-row font-medium">
    //             <span className="text-xs">yesterday</span>
    //             <div>
    //               <Badge>3</Badge>
    //             </div>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>
    //   <div className="col-span-2">Hello</div>
    // </div>
    <ChatLayout />
  );
}
