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

const base = querySelector('script')
const name = /"session":{.*?"user":{.*?"screen_name":"(.*?)","name":"(.*?)"}}/
const bio = /"entities":{.*?"users":{.*?"entities":{.*?"[0-9]*":{.*?"description":"(.*?)"/
const avatar = /"entities":{.*?"users":{.*?"entities":{.*?"[0-9]*":{.*?"profile_image_url_https":"(.*?)"/

const factory = (regex: RegExp, index?: number) => {
    return base.clone().map(x => regexMatch(x.innerText, regex, index))
}

export const screenNameSelector = factory(name, 0)
export const userNameSelector = factory(name, 1)
export const userBioSelector = factory(bio, 0)
export const userAvatarUrlSelector = factory(avatar, 0)

const newPostEditorSelectorString =
    '[role="main"] [role="progressbar"] + div .DraftEditor-root .public-DraftEditorPlaceholder-root'

export const newPostEditorSelector = querySelector(newPostEditorSelectorString)
export const newPostEditorOnFocusSelector = querySelector(
    '[role="main"] [role="progressbar"] + div .DraftEditor-root .public-DraftEditorPlaceholder-hasFocus'
)

/**
 *  Tested on main-timeline, trending-timeline
 *  TODO: Missing test for list
 */
export const timelineSelector = querySelector(
    '[role="main"] [data-testid="primaryColumn"] section > div > div > div > *'
)
