import { GraphQLClient } from "graphql-request";

const hostName = process.env.NEXT_PUBLIC_HOST_NAME && !process.env.NEXT_PUBLIC_HOST_NAME.includes("localhost")
  ? process.env.NEXT_PUBLIC_HOST_NAME
  : "";

const gqlClient = new GraphQLClient(`${hostName}/api/graphql`);

export default gqlClient;