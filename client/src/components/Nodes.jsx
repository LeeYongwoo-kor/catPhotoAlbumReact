import React, { Component } from "react";
import { file, directory, prev, notfound } from "../util/assets.js";
// function Nodes() {
//   return <div></div>;
// }

class Nodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoot: props.isRoot,
      nodes: props.nodes,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickBackHandler = this.onClickBackHandler.bind(this);
  }

  onClickHandler(nodeId) {
    const selectedNode = this.state.nodes.find((node) => node.id === +nodeId);
    this.onClickCallback(selectedNode);
  }

  onClickBackHandler() {
    this.props.onBackClickCallback();
  }

  render() {
    return (
      <>
        {!this.state.isRoot ? (
          <div className="Node" onClick={this.onClickBackHandler}>
            <img src={prev} alt="prev" onError={notfound} />
            <div>Back</div>
          </div>
        ) : null}
        {this.state.nodes.map((node) => (
          <div className="Node" onClick={this.onClickHandler(node.id)}>
            <img
              src={node.type === "FILE" ? file : directory}
              alt="icon"
              onError={notfound}
            />
            <div>{node.name}</div>
          </div>
        ))}
      </>
    );
  }
}

export default Nodes;
