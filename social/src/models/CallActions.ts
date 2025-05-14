import { Schema, model, Document } from "mongoose";
import Call from "./Call";

// Action functions
export const createCall = async (initiatedBy: string, conversationId: Schema.Types.ObjectId, callType: string) => {
    const call = new Call({
        initiatedBy,
        conversationId,
        startedAt: new Date(),
        status: "ongoing",
        callType,
    });
    return await call.save();
};

export const endCall = async (callId: string) => {
    return await Call.findByIdAndUpdate(callId, { endTime: new Date(), status: "completed" }, { new: true });
};

export const getCallById = async (callId: string) => {
    return await Call.findById(callId);
};

export const getCallsByUser = async (userId: string) => {
    return await Call.find({
        $or: [{ callerId: userId }, { receiverId: userId }],
    }).sort({ startTime: -1 });
};
