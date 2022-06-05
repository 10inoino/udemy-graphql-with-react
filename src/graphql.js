import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    user(login: "10inoino") {
      name
      avatarUrl
    }
  }
`