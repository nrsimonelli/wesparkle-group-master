import React, {Component} from 'react';


import {connect} from 'react-redux';


class LinkSupportCopy extends Component {

  render() {
    return (
      <div className='support container'>

        <div className='support image-box image-3'></div>
        <h2>Support Small Businesses + Communities With Your Link</h2>
        <div>&nbsp;</div>
        <div className='support description'>We Sparkle Co. supports small businesses with our software tools and we also believe in giving back to our communities. Every time you use our link shortener we will donate a nickel to the We Sparkle Community Fund, which gives to various charitable causes. This year, we donated $250 and helped raise $12,000 overall to the <a href="https://namimn.org/">National Alliance on Mental Illness Minnesota (NAMI MN)</a> so they can provide their much-needed mental health services online. If you have a suggestion for a charitable cause we should support, please email info@wesparkle.org. Thank you! </div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(LinkSupportCopy);