import React from 'react';

const Footer = props => (
  <footer id="page-footer">
    <div className="content py-20 font-size-xs clearfix">
      <div className="float-right">
        Crafted with <i className="fa fa-heart text-pulse"></i> by <a className="font-w600" href="http://.in" target="_blank">Tape LLP</a>
      </div>
      <div className="float-left">
        <a className="font-w600" href="http://www.tape.cc" target="_blank">Tape</a> © <span className="js-year-copy">2019</span>
      </div>
    </div>
  </footer>
);

export default Footer;