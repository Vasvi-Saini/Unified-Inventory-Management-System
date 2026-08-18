import { GraphQLClient } from "graphql-request";

export const getGqlClient = () => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_HOST_NAME || "http://localhost:3000";
  return new GraphQLClient(`${baseUrl}/api/graphql`);
};

const gqlClient = new Proxy({} as GraphQLClient, {
  get(_, prop) {
    const client = getGqlClient();
    const target = client[prop as keyof GraphQLClient];
    return typeof target === "function" ? target.bind(client) : target;
  },
});

export default gqlClient;