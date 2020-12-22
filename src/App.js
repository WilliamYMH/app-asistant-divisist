import React, { Suspense } from "react";
import { Link, Route, Switch } from "wouter";
import Login from "./login/Login";
import SpeechRecognitionJ  from "./pages/SpeechRecognitionJ";

import "./App.css";

const HomePage = React.lazy(() => import("./pages/Home"));

export default function App() {
  return (
      <div className="App">
        <Suspense fallback={null}>
          <section className="App-content">
              <Switch>
                <Route component={HomePage} path="/" />
                <Route component={Login} path="/login" />
              </Switch>
          </section>
        </Suspense>
      </div>
  );
}