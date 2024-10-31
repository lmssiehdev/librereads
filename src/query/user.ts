import { gql } from "@apollo/client";

export const getUserQuery = gql`
  query getUser($userUri: ID) {
    getUser(userUri: $userUri) {
      name
    }
  }
`;
