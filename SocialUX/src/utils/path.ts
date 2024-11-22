export const ROOT_PATH = ''
const path = (root: string, endpoint: string) => {
    return `${root}/${endpoint}`
}
export const APP_PATH = {
    root: ROOT_PATH,
    general: {
        home: '',
        messages: 'messages',
    },
    login: path(ROOT_PATH, 'login'),
    register: path(ROOT_PATH, 'register'),
}
