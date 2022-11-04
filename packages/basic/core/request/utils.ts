import dayjs from 'dayjs'
//解析url中的参数
export function urlParse() {
    const hash = window.location.hash
    const url = window.location.search || hash.slice(hash.indexOf('?'))
    const obj = {}
    const reg = /[?&][^?&]+=[^?&]+/g
    const arr = url.match(reg)
    if (arr) {
        arr.forEach(function (item) {
            const tempArr = item.substring(1).split('=')
            const key = decodeURIComponent(tempArr[0])
            const val = decodeURIComponent(tempArr[1])
            obj[key] = val
        })
    }
    return obj
}

export function formatDate(time) {
    return dayjs(time).format('YYYY-MM-DD')
}
export function format_number(n) {
    var b = parseInt(n).toString()
    var len = b.length
    if (len <= 3) {
        return b
    }
    var r = len % 3
    return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
}

export function getUrlParams(...args) {
    /* 这个函数的作用是将uerid和token分离出来 */
    function getByName(name) {
        const reg = new RegExp(`(^|&|\\?)${name}=([^&|#]*)`, 'i')
        const param = window.location.href.substring(0).match(reg)
        if (param !== null) {
            return param[2]
        }
        return undefined
    }

    if (arguments.length === 1) {
        return getByName(args[0]) || {}
    }
    const result = {}
    ;[...args].forEach((name) => {
        result[name] = getByName(name)
    })
    return result
}
//跳转app下载
export function openAppStore() {
    var ua = navigator.userAgent || navigator.platform
    if (/ipad|iphone|ipod/gi.test(ua)) {
        location.href = 'https://itunes.apple.com/is/app/loops/id1085411495?mt=8'
    } else if (ua.match(/Android/gi)) {
        location.href = 'https://play.google.com/store/apps/details?id=mozat.rings.loops'
    } else {
        location.href = 'https://play.google.com/store/apps/details?id=mozat.rings.loops'
    }
}
