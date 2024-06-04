import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import { EventBusService } from "./event-bus";
import { HTMLLayoutData } from "single-spa-layout/dist/types/isomorphic/constructRoutes";

const data: HTMLLayoutData = {
  loaders: {
  },
  props: {
    author: 'damski',
    eventBus: new EventBusService(),
  },
};

const routes = constructRoutes(microfrontendLayout, data);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
