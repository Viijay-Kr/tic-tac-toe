import React from "react";
import "styles/index.css";
import { AppProps } from "next/app";
import {
  createClient,
  Provider,
  defaultExchanges,
  subscriptionExchange,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
const isServer = typeof window === "undefined";
let subscriptionClient: SubscriptionClient;
if (!isServer) {
  subscriptionClient = new SubscriptionClient("ws://localhost:8000/graphql/", {
    reconnect: true,
  });
}
const client = createClient({
  url: "http://localhost:8000/graphql/",
  exchanges:
    typeof window !== "undefined"
      ? [
          ...defaultExchanges,
          subscriptionExchange({
            forwardSubscription: (operation) =>
              subscriptionClient.request(operation),
          }),
        ]
      : [],
});
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
