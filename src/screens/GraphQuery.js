import gql from 'graphql-tag';
export const usersQuery = gql`
  {
    search(first: 40, type: USER, query: "language:javascript location:lagos") {
      nodes {
        ... on User {
          name
          url
          avatarUrl
          email
          repositories {
            totalCount
          }
          starredRepositories {
            totalCount
          }
          projectsUrl
          projectsResourcePath
          status {
            organization {
              name
            }
          }
          location
          isHireable
        }
      }
    }
  }
`;
