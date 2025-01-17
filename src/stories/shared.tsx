import React from 'react'
import { storiesOf } from '@storybook/react'
import { NotSetupYetPrompt } from '../components/shared/NotSetupYetPrompt'
import { ChooseIdentity } from '../components/shared/ChooseIdentity'

storiesOf('Shared Components', module)
    .add('NotSetupYetPrompt', () => <NotSetupYetPrompt />)
    .add('ChooseIdentity', () => {
        return <ChooseIdentity />
    })
