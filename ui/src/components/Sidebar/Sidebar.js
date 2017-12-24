import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <nav className="nav-group">
        <h5 className="nav-group-title">Nav</h5>
        <span className="nav-group-item"><span className="icon icon-home"></span>connors</span>
        <span className="nav-group-item"><span className="icon icon-download"></span>Downloads</span>
        <span className="nav-group-item"><span className="icon icon-folder"></span>Documents</span>
        <span className="nav-group-item"><span className="icon icon-signal"></span>AirPlay</span>
        <span className="nav-group-item"><span className="icon icon-print"></span>Applications</span>
        <span className="nav-group-item"><span className="icon icon-cloud"></span>Desktop</span>
      </nav>
      );
  }
}

export default Sidebar;