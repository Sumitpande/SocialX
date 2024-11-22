import { useState } from 'react'
import { toast } from "@/components/ui/use-toast"
import { useAuthContext } from '../context/AuthContext'
import axios from '../utils/axios'
import useAuthStore from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import { APP_PATH } from '@/utils/path'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    const { setIsLoggedIn, setToken } = useAuthStore()
    const navigate = useNavigate()

    const login = async (values: { email: string, password: string }) => {
        const success = handleInputErrors(values)
        if (!success) return
        setLoading(true)
        try {
            const res = await axios.post(
                'auth/login',
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )


            console.log("login res", res)
            if (res.data.error) {
                throw new Error(res.data.error)
            }

            const userResp = await axios.get(
                '/me',
                {
                    headers: {
                        Authorization: `Bearer ${res.data.token}`
                    },
                }
            )
            if (userResp.data.error) {
                throw new Error(res.data.error)
            }
            localStorage.setItem('jwt', res.data.token)
            setAuthUser(userResp.data)
            setIsLoggedIn(true)
            setToken(res.data.token)
            navigate("/" + APP_PATH.root)

        } catch (error) {
            console.error(error)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${error}`,

            })
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}
export default useLogin

function handleInputErrors(values: { email: string, password: string }) {
    if (!values.email || !values.password) {
        toast({
            variant: "destructive",
            title: "Please fill in all fields",

        })
        return false
    }

    return true
}
