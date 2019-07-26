import { LiveSelector } from '@holoflows/kit'
import { regexMatch } from '../../utils/utils'

/**
 * @naming
 * 御坂       (@Misaka_xxxx)
 * userName   screenName
 */

const name = /"session":{.*?"user":{.*?"screen_name":"(.*?)","name":"(.*?)"}}/
const bio = /"entities":{.*?"users":{.*?"entities":{.*?"[0-9]*":{.*?"description":"(.*?)"/
const base = new LiveSelector().querySelector<HTMLAnchorElement>('script')

const factory = (regex: RegExp, index?: number) => {
    return base.clone().map(x => regexMatch(x.innerText, regex, index))
}

export const screenNameSelector = factory(name, 0);
export const userNameSelector = factory(name, 1);
export const userBioSelector = factory(bio, 0);
