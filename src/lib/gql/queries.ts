import { gql } from "graphql-request";

export const LOGIN_USER = gql`
  query Query($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`;

export const GET_ALL_USERS = gql`
  query Query {
    getAllUsers {
      avatar
      email
      id
      name
      role
      username
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query Query {
    getAllProducts {
      category
      description
      imageUrl
      price
      stock
      title
      id
    }
  }
`;

export const GET_PRODUCT = gql`
  query Query($id: String!) {
    product: getProduct(id: $id) {
      title
      stock
      category
      description
      id
      imageUrl
      price
      sales {
        createdAt
        id
        productId
        quantity
      }
    }
  }
`;

export const LOGOUT = gql`
  query logout {
    logoutUser
  }
`;
