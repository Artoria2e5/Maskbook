import { LiveSelector } from '@holoflows/kit'
import { regexMatch } from '../../utils/utils'

const querySelector = (selector: string) => {
    return new LiveSelector().querySelector<HTMLAnchorElement>(selector)
}

/**
 * @naming
 * 御坂       (@Misaka_xxxx)
 * userName   screenName
 */

const name = /"session":{.*?"user":{.*?"screen_name":"(.*?)","name":"(.*?)"}}/
const bio = /"entities":{.*?"users":{.*?"entities":{.*?"[0-9]*":{.*?"description":"(.*?)"/
const base = querySelector('script')

const factory = (regex: RegExp, index?: number) => {
    return base.clone().map(x => regexMatch(x.innerText, regex, index))
}

export const screenNameSelector = factory(name, 0);
export const userNameSelector = factory(name, 1);
export const userBioSelector = factory(bio, 0);

/**
 * This selector will got an element if new post editor window has focus.
 */
export const newPostEditorSelector = querySelector(
    '[role="main"] [role="progressbar"] + div .DraftEditor-root .public-DraftEditorPlaceholder-hasFocus'
)
