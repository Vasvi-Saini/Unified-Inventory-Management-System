import { gql } from "graphql-request";

export const CREATE_USER = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
    $role: String!
  ) {
    createUser(
      name: $name
      email: $email
      username: $username
      password: $password
      role: $role
    ) {
      name
      username
      role
      id
      email
      avatar
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation Mutation(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imageUrl: String!
  ) {
    addProduct(
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    ) {
      category
      description
      imageUrl
      price
      stock
      title
    }
  }
`;

export const CREATE_SALE = gql`
  mutation Mutation($createSaleId: String!, $quantity: Int!) {
    createSale(id: $createSaleId, quantity: $quantity)
  }
`;

export const UPDATE_ROLE = gql`
  mutation Mutation($userId: String!, $role: String!) {
    updateUserRole(userId: $userId, role: $role)
  }
`;

export const DELETE_USER = gql`
  mutation UpdateUserRole($id: String!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserRole(
    $userId: String!
    $name: String!
    $email: String!
    $username: String!
    $avatar: String
  ) {
    updated: updateUserProfile(
      userId: $userId
      name: $name
      email: $email
      username: $username
      avatar: $avatar
    )
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation Mutation(
    $id: String!
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imgUrl: String!
  ) {
    updated: updateProduct(
      id: $id
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imgUrl: $imgUrl
    )
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
   deleted : deleteProduct(id: $id)
  }
`;
