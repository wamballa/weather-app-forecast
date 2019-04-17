import React, { Component } from 'react'
import Card from './Card'

export class ShowCards extends Component {

  handleCollapse = () => {
    console.log("handleCollapse()");
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }

  render() {

    const cardList = this.props.cards;
    // this.handleCollapse();

    return (
      <div className="container">
        <div className="" id="accordion">

          {cardList.map((city) => (
            <Card key={Math.random()} city={city} delCard={this.props.delCard} />
          ))}

        </div>
      </div>

    )
  }
}

export default ShowCards
