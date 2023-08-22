import authService from "../graphql/services/auth.service"
import { store } from "../store"
import { changeRole } from "../store/slices/user.slice"

export const RouteAuthentication = async (router) => {
 
    const token = window.localStorage.getItem("token")

    if (!token) return router.push("/login")

    const result = await authService.verifyToken(token)
    if (!result.userId) return router.push("/login")
    console.log(token)

    store.dispatch(changeRole(result.userRole))
    router.push(`/${result.userRole}`)
}