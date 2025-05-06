import { createUserRequest, deleteUserRequestById, getUserRequestsById } from "../models/UserRequestActions";
import { IUserRequest } from "../models/UserRequest";
import { IUser } from "../models/User";
import { getUserById, updateUserById } from "../models/UserActions";
import { getConversationById } from "../models/ConversationActions";
const { Server } = require("socket.io");
const app = require("../app");
const { createServer } = require("node:http");

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: /^http:\/\/localhost:\d+$/,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", async (socket: any) => {
    console.log(socket.handshake.query);
    const userId = socket.handshake.query.user_id;
    // const userId = null;
    const socket_id = socket.id;
    console.log("a user connected", socket_id, userId, typeof userId);
    // console.log('a user connected userId', userId);
    if (userId != null && Boolean(userId) && userId != "undefined") {
        try {
            console.log("storing socketid", socket_id, userId);
            const d = await updateUserById(userId, {
                socket_id: socket_id,
                status: "Online",
            });
            console.log("d", d);
        } catch (e) {
            console.log(e);
        }
    }
    // socket events

    socket.on("user_request", async (data: any) => {
        console.log("User request came-> ", data);
        const to = await getUserById(data.to).select("socket_id");
        const from = await getUserById(data.from).select("socket_id");

        // create a friend request
        const req = await createUserRequest({
            sender: data.from,
            recipient: data.to,
        });
        console.log("req", req);
        // emit event request received to recipient
        io.to(to?.socket_id).emit("new_friend_request", {
            message: "New friend request received",
        });
        io.to(from?.socket_id).emit("request_sent", {
            message: "Request Sent successfully!",
        });
    });

    socket.on("accept_request", async (data: any) => {
        // accept friend request => add ref of each other in friends array
        console.log(data);
        const request_doc: IUserRequest | null = await getUserRequestsById(data.request_id);
        console.log(request_doc, request_doc);
        if (request_doc) {
            console.log(request_doc);

            const sender: IUser | null = await getUserById(request_doc.sender.toString());
            const receiver: IUser | null = await getUserById(request_doc.recipient.toString());

            sender?.followings.push(request_doc.recipient);

            receiver?.followers.push(request_doc.sender);

            await receiver?.save({ validateModifiedOnly: true });
            await sender?.save({ validateModifiedOnly: true });

            await deleteUserRequestById(data.request_id);

            // delete this request doc
            // emit event to both of them

            // emit event request accepted to both
            io.to(sender?.socket_id).emit("request_accepted", {
                message: "Friend Request Accepted",
            });
            io.to(receiver?.socket_id).emit("request_accepted", {
                message: "Friend Request Accepted",
            });
        }
    });

    // socket.on('get_direct_conversations', async ({ user_id }: { user_id: string }, callback: any) => {
    //     const existing_conversations = await getDirectMessages({
    //         participants: { $all: [user_id] },
    //     }).populate('participants', 'firstName lastName _id email status');

    //     console.log(existing_conversations);

    //     callback(existing_conversations);
    // });

    // socket.on('start_conversation', async (data: any) => {
    //     const { to, from } = data;

    //     // check if there is any existing conversation

    //     const existing_conversations = await getDirectMessages({
    //         participants: { $size: 2, $all: [to, from] },
    //     }).populate('participants', 'firstName lastName _id email status');

    //     console.log('Existing Conversation', existing_conversations[0]);

    //     // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
    //     if (existing_conversations.length === 0) {
    //         try {
    //             const new_chat: any = await createDirectMessage({
    //                 participants: [to, from],
    //             });

    //             const chat = await getDMById(new_chat._id.toString()).populate('participants', 'firstName lastName _id email status');

    //             console.log(chat);

    //             socket.emit('start_chat', chat);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     // if yes => just emit event "start_chat" & send conversation details as payload
    //     else {
    //         socket.emit('start_chat', existing_conversations[0]);
    //     }
    // });

    // socket.on('get_messages', async (data: any, callback: any) => {
    //     try {
    //         const dm: IDirectMessage = (await getDMById(data.conversation_id.toString()).select('messages')) as any;
    //         callback(dm.messages);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });

    // // Handle incoming text / link messages
    // socket.on('text_message', async (data: any) => {
    //     console.log('Received message:', data);

    //     // data: {to, from, text}

    //     const { message, conversation_id, from, to, type } = data;

    //     const to_user = await getUserById(to);
    //     const from_user = await getUserById(from);

    //     // message => {to, from, type, created_at, text, file}

    //     const new_message: IMessage = {
    //         to: to,
    //         from: from,
    //         type: type,
    //         text: message,
    //     } as IMessage;

    //     // fetch OneToOneMessage Doc & push a new message to existing conversation
    //     const chat = await getDMById(conversation_id);
    //     chat!.messages.push(new_message);
    //     // save to db`
    //     await chat!.save({ validateModifiedOnly: true });

    //     // emit incoming_message -> to user

    //     io.to(to_user?.socket_id).emit('new_message', {
    //         conversation_id,
    //         message: new_message,
    //     });
    // });

    // // handle Media / Document Message
    // socket.on('file_message', (data: any) => {
    //     console.log('Received message:', data);

    //     // data: {to, from, text, file}

    //     // Get the file extension
    //     const fileExtension = path.extname(data.file.name);

    //     // Generate a unique filename
    //     const filename = `${Date.now()}_${Math.floor(Math.random() * 10000)}${fileExtension}`;

    //     // upload file to AWS s3

    //     // create a new conversation if its doSent exists yet or add a new message to existing conversation

    //     // save to db

    //     // emit incoming_message -> to user

    //     // emit outgoing_message -> from user
    // });

    // socket.on("incoming_call", async (data: any) => {
    //     console.log("Incoming call", data);
    //     const toConversation = await getConversationById(data.conversationId).populate("participants", "socket_id email status");
    //     console.log("toConversation", toConversation);
    //     const to = toConversation?.participants.filter((p: any) => p._id.toString() !== data.from.toString()) || [];
    //     const from = await getUserById(data.from).select("socket_id");
    //     console.log("to", to);
    //     // // emit event request received to recipient
    //     to.forEach((recipient: any) => {
    //         io.to(recipient?.socket_id).emit("incoming_call", {
    //             message: "Incoming call",
    //             from: data.from,
    //         });
    //     });
    // });

    socket.on("disconnect", () => {
        console.log("user disconnected ", socket.id);
        io.emit("getOnlineUsers", []);
    });
});

export { io, server };
