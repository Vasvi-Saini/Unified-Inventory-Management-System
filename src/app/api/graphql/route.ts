import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";
import { getUserFromCookies } from "@/lib/helper";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  updateUserProfile,
  updateUserRole,
} from "./resolver/user";

import {
  addProduct,
  createSale,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct
} from "./resolver/products";


const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    logoutUser: Boolean
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    getProduct(id: String!): Product
  }

  type Sale {
    id: String
    productId: String
    quantity: Int
    createdAt: String
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      role: String!
    ): User
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(
      userId: String
      name: String
      email: String
      avatar: String
      username: String
    ): Boolean
    addProduct(
      title: String!
      description: String!
      category: String!
      price: Float!
      stock: Int!
      imageUrl: String!
    ): Product
    createSale(id: String!, quantity: Int!): Boolean
    deleteUser(id: String!): Boolean
    deleteProduct(id: String!) : Boolean
    updateProduct(id:String!,title:String!,description:String!,category:String!,price:Float!,stock:Int!,imgUrl:String!) : Boolean
  }

  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }

  type User {
    id: String
    name: String
    username: String
    email: String
    avatar: String
    role: String
  }
`;

const resolvers = {
  Query: {
    loginUser: loginUser,
    logoutUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    getProduct,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale,
    deleteUser,
    updateProduct,
    deleteProduct,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler(server);

export async function GET(request : NextRequest){
  return handler(request)
}

export async function POST(request:NextRequest) {
    return handler(request)
}

// kaam vhi hora h bus syntax change ho gya acha thik h

// ye ek or error h jo hamesha ata h graql k projects menubarjo 
// jo medium se humne copy kiya tha code vo old ho gya h kaam ni krta acha toh?
// krte h isko change ky hua???


