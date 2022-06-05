import { useQuery } from "@apollo/client";
import { useState } from "react";
import { SEARCH_REPOSITORIES } from "./graphql";

const PER_PAGE = 5;
const DEFAULT_STATE = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: "react",
};

const App = () => {
  const [variable, setVariable] = useState(DEFAULT_STATE);

  const GetRepositories = (props) => {
    const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
      variables: props,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const search = data.search;
    const edges = search.edges;
    const renderHTML = [];
    const unit =
      data.search.repositoryCount === 1 ? "Repository" : "Repositories";
    const repositoryCount = (
      <h2>
        GitHub Repositories Search Results - {data.search.repositoryCount}{" "}
        {unit}
      </h2>
    );

    renderHTML.push(repositoryCount);
    renderHTML.push(
      <>
        <ul>
          {edges.map(({ node }) => (
            <li key={node.id}>
              <a href={node.url} target="_blank" rel="noreferrer">
                {node.name}
              </a>
            </li>
          ))}
        </ul>
        {search.pageInfo.hasNextPage ? (
          <button onClick={() => goNext(search)}>Next</button>
        ) : null}
        {search.pageInfo.hasPreviousPage ? <button>Previous</button> : null}
      </>
    );

    return renderHTML;
  };

  const handleChange = (e) => {
    setVariable({
      ...DEFAULT_STATE,
      query: e.target.value,
    });
  };

  const goNext = (search) => {
    setVariable((prev) => ({
      first: PER_PAGE,
      after: search.pageInfo.endCursor,
      last: null,
      before: null,
      query: prev.query
    }));
  };

  // const goPrevious = (search) => {
  //   setVariable((prev) => ({
  //     first: PER_PAGE,
  //     after: search.pageInfo.endCursor,
  //     last: null,
  //     before: null,
  //     query: prev.query
  //   }));
  // };

  return (
    <div>
      <form>
        <input value={variable.query} onChange={handleChange} />
      </form>
      <GetRepositories
        first={variable.first}
        after={variable.after}
        last={variable.last}
        before={variable.before}
        query={variable.query}
      />
    </div>
  );
};

export default App;
