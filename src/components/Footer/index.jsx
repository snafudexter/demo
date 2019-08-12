import React from 'react';

const Footer = props => (
  <footer id="page-footer">
    <div className="content py-20 font-size-xs clearfix">
      <div className="float-right">
        Crafted with <i className="fa fa-heart text-pulse"></i> by <a className="font-w600" href="http://hooptech.in" target="_blank">hooptech</a>
      </div>
      <div className="float-left">
        <a className="font-w600" href="http://www.waliaandco.com" target="_blank">Walia & Co.</a> © <span className="js-year-copy">2018</span>
      </div>
    </div>
  </footer>
);

export default Footer;