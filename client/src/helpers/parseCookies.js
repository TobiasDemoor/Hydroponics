export default function parseCookies () {
    const cookies = document.cookie;
    let dict = {}

    cookies && cookies.split(';').forEach(
        function( cookie ) {
            var parts = cookie.split('=')
            dict[parts[0].trim()] = parts[1]
        }
    );

    return dict;
}