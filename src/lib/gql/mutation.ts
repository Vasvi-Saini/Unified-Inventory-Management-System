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
  mutation UpdateUserRole($userId: String!, $role: String!) {
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

export const updateprod=gql`
mutation Updateproduct($prodid: String!, $title: String, $stock: Int, $imgUrl: String, $price: Float, $category: String, $description: String) {
  updateproduct(prodid: $prodid, title: $title, stock: $stock, img_url: $imgUrl, price: $price, category: $category, description: $description)
}
`
export const removeProd=gql`
mutation Removeprod($removeprodId: String!) {
  removeprod(id: $removeprodId)
}
`