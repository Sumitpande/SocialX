import { UserRequestModel } from "./UserRequest";
export const getUserRequestsSent = (user_id: string) => UserRequestModel.find({ sender: user_id });

export const getUserRequests = (user_id: string) => UserRequestModel.find({ recipient: user_id });

export const getUserRequestsById = (id: string) => UserRequestModel.findById(id);

export const createUserRequest = (values: Record<string, any>) => new UserRequestModel(values).save().then((user) => user.toObject());

export const deleteUserRequestById = (id: string) => UserRequestModel.findOneAndDelete({ _id: id });
export const deleteUserRequest = (query: any) => UserRequestModel.deleteMany(query);
