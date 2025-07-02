import { IUser, UserModel } from "./User";

export const getUsers = (query: any = {}) => UserModel.find(query);

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByUsername = (username: string) => UserModel.findOne({ username });

export const getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({
        "authentication.sessionToken": sessionToken,
    });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user: IUser) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export const updateUserByEmail = (email: string, values: Record<string, any>) => UserModel.findOneAndUpdate({ email }, values);
