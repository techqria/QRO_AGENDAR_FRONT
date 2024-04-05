export function getJwtCookie(cookies: string){
    return cookies.split(';').find(el => el.includes('token=')).replace('token=','')
}