import React, { Component } from 'react'

export class Navbar extends Component {

  state = {
    menu: false
  };

  toggleMenu = ()=> {
    this.setState({ menu: !this.state.menu })
    // console.log("state = "+this.state.menu);
  }

  render() {

    const show = (this.state.menu) ? "show" : "" ;
    console.log ("show = "+show);

    return (

      < nav className="navbar navbar-expand-md bg-dark navbar-dark" >

        {/* Brand */}
        <a className="navbar-brand" href="_blank">WEATHER FORECAST</a>

        {/* Toggler/collapsibe Button */}
        <button className="navbar-toggler" type="button" onClick={this.toggleMenu} data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}

        <div className={"collapse navbar-collapse " + show }>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="_blank">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="_blank">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="_blank">Link</a>
            </li>
          </ul>
        </div>

      </nav >
    )
  }
}

export default Navbar

