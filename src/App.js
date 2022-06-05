import {
  useQuery,
  gql
} from "@apollo/client";

const ME = gql`
  query me {
    user(login: "10inoino") {
      name
      avatarUrl
    }
  }
`

function GetAccountData() {
  const { loading, error, data } = useQuery(ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const user = data.user;

  return (
    <div>
      {user.name}: {user.avatarUrl}
    </div>
  );
}

function App() {
  return (
    <div>
      Hello, GraphQL
      <GetAccountData />
    </div>
  );
}

export default App;
