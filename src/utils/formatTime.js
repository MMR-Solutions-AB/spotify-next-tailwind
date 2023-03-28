export function formatTime(ms) {
    const sec = ms / 1000
    const res = (sec % 60).toFixed(0)
    const min = Math.floor(sec / 60)
    const resSec = res < 10 ? `0${res}` : res

    return `${min}:${resSec}`
}
