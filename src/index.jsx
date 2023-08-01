
import { createRoot } from 'react-dom/client';
import "./index.scss";
import React from 'react';
import { store } from "./redux/store"
import { Provider } from 'react-redux';
import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';
import "./index.scss";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Provider store={store}>
      <Container >
        <MainView />
      </Container>
    </Provider>  
  );
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<App />);