export function getAccessTokenFromUrl() {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'))
    return params.get('access_token')
}
