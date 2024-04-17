import cookie from "js-cookie"

export function AuthHeader() {
    return {
        context: {
            headers: {
                Authorization: `Bearer ${cookie.get("token")}`
            }
        }
    }
}

export function AuthHeaderRefetch() {
    return {
        headers: {
            Authorization: `Bearer ${cookie.get("token")}`
        }
    }
}

