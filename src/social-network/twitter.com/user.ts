import { LiveSelector } from '@holoflows/kit'
import { regexMatch } from '../../utils/utils'

/**
 * @naming
 * 御坂       (@Misaka_xxxx)
 * userName   screenName
 */

export const screenNameSelector = new LiveSelector()
    .querySelector<HTMLAnchorElement>('[aria-label="Primary"][role="navigation"] [aria-label="Profile"]')
    .map(x => regexMatch(x.href, /(twitter\.com\/)(.*)/, 2))

export const screenNameSelectorMobile = new LiveSelector()
    .querySelector<HTMLAnchorElement>('script')
    .map(x => regexMatch(x.innerText, /screen_name":"(.*?)"/, 0))

export const userNameSelector = new LiveSelector()
    .querySelector('[role="main"] [role="progressbar"]+* [aria-label]')
    .map(x => x.getAttribute("aria-label"))

export const userNameSelectorMobile = new LiveSelector()
    .querySelector('script')
    .map(x => regexMatch(x.innerText, /(screen_name).{0,128}name":"(.*?)"/, 1))
