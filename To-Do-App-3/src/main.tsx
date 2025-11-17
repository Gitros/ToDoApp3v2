import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import keycloak from "./keycloak.ts";

const client = new QueryClient();
keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    if (!authenticated) {
      keycloak.login();
      console.log(keycloak.token);
      return;
    }
    createRoot(document.getElementById("root")!).render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    );

    setInterval(() => {
      keycloak.updateToken(60).catch(() => keycloak.login());
    }, 60_000);
  })
  .catch((err) => {
    console.error("Keycloak init error", err);
  });
