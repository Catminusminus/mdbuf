import "@babel/polyfill";
import "github-markdown-css/github-markdown.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/default.css";

import React from "react";
import ReactDOM from "react-dom";
import Proxy from "./WorkerProxy";
import { App } from "./components/App";
import { AppState, WorkerAPI } from "../types";
import { Provider } from "./contexts/RootStateContext";
import { WorkerAPIContext } from "./contexts/WorkerAPIContext";

import { reducer } from "./reducers";

const main = async () => {
  console.time("mount");
  const proxy: WorkerAPI = await new (Proxy as any)();
  const firstState = await loadState(proxy);

  ReactDOM.render(
    <WorkerAPIContext.Provider value={proxy}>
      <Provider reducer={reducer} initialState={firstState}>
        <App
          proxy={proxy}
          onUpdateState={newState => {
            saveState(proxy, newState);
          }}
        />
      </Provider>
    </WorkerAPIContext.Provider>,

    document.querySelector("#root")
  );
  console.timeEnd("mount");
};

main();

// helpers
async function saveState(proxy: WorkerAPI, state: AppState): Promise<void> {
  proxy.saveCurrentState(state);
}

async function loadState(proxy: WorkerAPI): Promise<AppState> {
  return proxy.getLastState();
}
