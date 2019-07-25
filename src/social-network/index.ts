export const currentNetwork = (() => {
    const h = window.location.hostname
    switch (h) {
        case 'facebook.com':
            return 'facebook'
        case 'twitter.com':
            return 'twitter'
        default:
            return;
    }
})()
