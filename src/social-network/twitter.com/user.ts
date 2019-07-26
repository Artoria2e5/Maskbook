import { LiveSelector } from '@holoflows/kit'
import { regexMatch } from '../../utils/utils'

/**
 * @naming
 * 御坂       (@Misaka_xxxx)
 * userName   screenName
 */

const name = /"user":{"screen_name":"(.*?)","name":"(.*?)"}}/

export const screenNameSelector = new LiveSelector()
    .querySelector<HTMLAnchorElement>('script')
    .map(x => regexMatch(x.innerText, name, 0))

export const userNameSelector = new LiveSelector()
    .querySelector('script')
    .map(x => regexMatch(x.innerText, name, 1));
