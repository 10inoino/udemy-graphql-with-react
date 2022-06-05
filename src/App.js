import { useQuery } from "@apollo/client";
import { Component } from "react";
import { SEARCH_REPOSITORIES } from "./graphql";

const VARIABLES = {
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

  return edges.map(({ cursor, node }) => (
    <div key={cursor}>
      <h1>{node.id}</h1>
      <p>{node.name}</p>
      <p>{node.url}</p>
      <p>{node.viewerHasStarred ? "true" : "false"}</p>
    </div>
  ));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = VARIABLES;
  }

  render() {
    return (
      <div>
        <GetRepositories
          first={VARIABLES.first}
          after={VARIABLES.after}
          last={VARIABLES.last}
          before={VARIABLES.before}
          query={VARIABLES.query}
        />
      </div>
    );
  }
}

export default App;
