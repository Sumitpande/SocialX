const bcrypt = require("bcrypt");

export const isUserAuthenticated = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const genSalt = () => {
    const saltRounds = 10;
    return bcrypt.genSalt(saltRounds);
};

export const authentication = (password: string, salt: string) => {
    return bcrypt.hash(password, salt);
};
