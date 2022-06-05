import { useQuery } from "@apollo/client";
import { Component } from "react";
import { SEARCH_REPOSITORIES } from "./graphql";

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "react",
};

function GetRepositories(props) {
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: props,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const edges = data.search.edges;
  const renderHTML = [];
  const unit = data.search.repositoryCount === 1 ? "Repository" : "Repositories";
  const repositoryCount = (
    <h2>
      GitHub Repositories Search Results - {data.search.repositoryCount} {unit}
    </h2>
  );

  renderHTML.push(repositoryCount);
  renderHTML.push(
    edges.map(({ cursor, node }) => (
      <div key={cursor}>
        <h2>{node.id}</h2>
        <p>{node.name}</p>
        <p>{node.url}</p>
        <p>{node.viewerHasStarred ? "true" : "false"}</p>
      </div>
    ))
  );

  return renderHTML;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...DEFAULT_STATE,
      query: event.target.value,
    });
  }

  render() {
    console.log(this.state.query);

    return (
      <div>
        <form>
          <input value={this.state.query} onChange={this.handleChange} />
        </form>
        <GetRepositories
          first={this.state.first}
          after={this.state.after}
          last={this.state.last}
          before={this.state.before}
          query={this.state.query}
        />
      </div>
    );
  }
}

export default App;
