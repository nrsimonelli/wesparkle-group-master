import React from 'react';
import BenefitsCopy from '../BenefitsCopy/BenefitsCopy';
import LinkSupportCopy from '../LinkSupportCopy/LinkSupportCopy';
import LinkToMain from '../LinkToMain/LinkToMain';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <BenefitsCopy />
    <LinkSupportCopy />
    <LinkToMain />
  </div>
);

export default AboutPage;
