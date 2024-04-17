export function getJwtCookie(cookies: string){
    return cookies.split(';').find(el => el.includes('qro_agendar_token='))?.trim()?.replace('qro_agendar_token=','')
}