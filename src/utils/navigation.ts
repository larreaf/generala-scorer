import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const redirect = (path: string) => {
  history.push(path);
};
