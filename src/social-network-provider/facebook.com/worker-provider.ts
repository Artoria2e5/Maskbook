import { defineSocialNetworkWorker } from '../../social-network/worker'
import { sharedProvider } from './shared-provider'
import { fetchPostContentFacebook } from './Worker/fetchPostContent'
import { fetchProfileFacebook } from './Worker/fetchProfile'
import { autoVerifyBioFacebook } from './Worker/autoVerifyBio'
import { autoVerifyPostFacebook } from './Worker/autoVerifyPost'

defineSocialNetworkWorker({
    ...sharedProvider,
    injectedScript: {
        code: `
            {
                const script = document.createElement('script')
                script.src = "${browser.runtime.getURL('js/injectedscript.js')}"
                document.documentElement.appendChild(script)
            }
        `,
        url: [{ hostEquals: 'www.facebook.com' }, { hostEquals: 'm.facebook.com' }],
    },
    fetchPostContent: fetchPostContentFacebook,
    fetchProfile: fetchProfileFacebook,
    autoVerifyBio: autoVerifyBioFacebook,
    autoVerifyPost: autoVerifyPostFacebook,
})
