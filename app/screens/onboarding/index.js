import React from 'react';
import { OnboardingScreens } from '@components'
import PageFirst from './PageFirst';
import PageSecond from './PageSecond';
import PageThird from './PageThird';

export default class AppIntro extends React.Component {

  render() {
    return (
      <OnboardingScreens
        finish={() => this.props.navigation.navigate('MainStack')}
        ref={(board) => this.board = board}
      >
        <PageFirst swipe={(prev) => this.board.swipe(prev)}></PageFirst>
        <PageSecond />
        <PageThird />
      </OnboardingScreens>
    );
  }
}
