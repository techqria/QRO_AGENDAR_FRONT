import authService from "../graphql/services/auth.service"
import { store } from "../store"
import { changeRole, changeUserId } from "../store/slices/user.slice"

export const RouteAuthentication = async (router) => {
 
    const token = window.localStorage.getItem("token")

    if (!token) return router.push("/login")

    const result = await authService.verifyToken(token)
    // const result = await verifyTokenQuery({variables: {token}})
    if (!result.userId) return router.push("/login")

    store.dispatch(changeRole(result.userRole))
    store.dispatch(changeUserId(result.userId))

    router.push(`/${result.userRole}`)
}