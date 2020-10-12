import config from 'config'
import parseCookies from './parseCookies'

export default function authHeader() {
    // return authorization header with jwt token
    const token = parseCookies()[config.get("cookieToken")]
    if (token != null) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}
