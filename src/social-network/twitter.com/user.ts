import { LiveSelector } from '@holoflows/kit'
import { isNull } from 'lodash-es'

export const usernameSelector = new LiveSelector()
    .querySelector<HTMLAnchorElement>('[aria-label="Primary"][role="navigation"] [aria-label="Profile"]')
    .map(x => {
        const r = x.href.match(/(twitter\.com\/)(.*)/)
        if (isNull(r)) throw new Error('Username not found')
        return r[2]
    })
