import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "ToDoAppRealm",
  clientId: "todoapp-frontend",
});

export default keycloak;
