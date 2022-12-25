import React, { Component } from "react";
import { requestApi } from "./api/api";
import "./App.css";
import Breadcrumb from "./components/Breadcrumb";
import ImageView from "./components/ImageView";
import Loading from "./components/Loading";
import Nodes from "./components/Nodes";

// function App() {
//   return <div className="App">Hello, world!</div>;
// }

const cache = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoot: true,
      isLoading: false,
      nodes: [],
      depth: [],
      selectedFilePath: null,
    };
    this.onClickBreadcrumbHandler = this.onClickBreadcrumbHandler.bind(this);
    this.onClickNodesHandler = this.onClickNodesHandler.bind(this);
    this.onBackClickNodesHandler = this.onBackClickNodesHandler(this);
  }

  async componentDidMount() {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });
      const rootNodes = await requestApi();
      this.setState({
        ...this.state,
        isLoading: false,
        isRoot: true,
        nodes: rootNodes,
      });

      cache.root = rootNodes;
    } catch (e) {
      throw new Error("init(): Error occurred!");
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }

  onClickBreadcrumbHandler(idx) {
    if (idx === null) {
      this.setState({
        ...this.state,
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
      ...this.state,
      depth: nextDepth,
      nodes: cache[nextDepth[nextDepth.length - 1].id],
    });
  }

  async onClickNodesHandler(node) {
    try {
      if (node.type === "DIRECTORY") {
        if (cache[node.id]) {
          this.setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: cache[node.id],
          });
        } else {
          const nextNodes = await requestApi(node.id);
          this.setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });

          cache[node.id] = nextNodes;
        }
      } else if (node.type === "FILE") {
        this.setState({
          ...this.state,
          selectedFilePath: node.filePath,
        });
      }
    } catch (e) {
      throw new Error("onClick(): Error occurred!");
    }
  }

  async onBackClickNodesHandler() {
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

  render() {
    return (
      <>
        <div className="Loading Modal">
          <Loading />
        </div>
        <nav className="Breadcrumb">
          <Breadcrumb onClickCallback={this.onClickBreadcrumbHandler} />
        </nav>
        <div className="ImageView Modal">
          <ImageView />
        </div>
        <section>
          <Nodes
            onClickCallback={this.onClickNodesHandler}
            onBackClickCallback={this.onBackClickNodesHandler}
          />
        </section>
      </>
    );
  }
}

export default App;
