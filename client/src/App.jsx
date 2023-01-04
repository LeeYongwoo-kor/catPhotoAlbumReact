import React, { Component } from "react";
import { requestApi } from "./api/api";
import "./App.css";
import Breadcrumb from "./components/Breadcrumb";
import ImageView from "./components/ImageView";
import Loading from "./components/Loading";
import Nodes from "./components/Nodes";
import { images } from "./util/assets";

// function App() {
//   return <div className="App">Hello, world!</div>;
// }

const cache = {};

class App extends Component {
  constructor(props) {
    console.count("App.constructor");
    super(props);
    this.state = {
      isRoot: true,
      isLoading: false,
      nodes: [],
      depth: [],
      selectedFilePath: null,
    };
    this.handleClickBreadcrumb = this.handleClickBreadcrumb.bind(this);
    this.handleClickNodes = this.handleClickNodes.bind(this);
    this.handleClickBackNodes = this.handleClickBackNodes.bind(this);
    this.handleClickImageView = this.handleClickImageView.bind(this);
  }

  async componentDidMount() {
    console.count("App.componentDidMount");
    this.setState({
      isLoading: true,
    });
    try {
      const rootNodes = await requestApi();
      this.setState({
        isRoot: true,
        nodes: rootNodes,
      });

      cache.root = rootNodes;
    } catch (e) {
      throw new Error("init(): Error occurred!");
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleClickBreadcrumb(idx) {
    console.log(idx);
    if (idx === null) {
      this.setState({
        isRoot: true,
        depth: [],
        nodes: cache.root,
      });
      return;
    }

    if (idx === this.state.depth.length - 1) {
      return;
    }

    const nextDepth = this.state.depth.slice(0, idx + 1);

    this.setState({
      depth: nextDepth,
      nodes: cache[nextDepth[nextDepth.length - 1].id],
    });
  }

  async handleClickNodes(node) {
    try {
      if (node.type === "DIRECTORY") {
        if (cache[node.id]) {
          this.setState({
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: cache[node.id],
          });
        } else {
          const nextNodes = await requestApi(node.id);
          this.setState({
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });

          cache[node.id] = nextNodes;
        }
      } else if (node.type === "FILE") {
        const filePath = images + node.filePath;
        this.setState({
          selectedFilePath: filePath,
        });
      }
    } catch (e) {
      throw new Error("onClick(): Error occurred!");
    }
  }

  async handleClickBackNodes() {
    try {
      const nextState = { ...this.state };
      nextState.depth.pop();

      const prevNodeId =
        nextState.depth.length === 0
          ? null
          : nextState.depth[nextState.depth.length - 1].id;

      if (prevNodeId === null) {
        this.setState({
          ...nextState,
          isRoot: true,
          nodes: cache.root,
        });
      } else {
        this.setState({
          ...nextState,
          isRoot: false,
          nodes: cache[prevNodeId],
        });
      }
    } catch (e) {
      throw new Error("onBackClick(): Error occurred!");
    }
  }

  handleClickImageView() {
    this.setState({ selectedFilePath: null });
  }

  render() {
    console.count("App.render");
    return (
      <>
        <Loading isLoading={this.state.isLoading} />
        <Breadcrumb
          depth={this.state.depth}
          onClickCallback={this.handleClickBreadcrumb}
        />
        <ImageView
          selectedFilePath={this.state.selectedFilePath}
          onClickCallback={this.handleClickImageView}
        />
        <Nodes
          isRoot={this.state.isRoot}
          nodes={this.state.nodes}
          onClickCallback={this.handleClickNodes}
          onBackClickCallback={this.handleClickBackNodes}
        />
      </>
    );
  }
}

export default App;
