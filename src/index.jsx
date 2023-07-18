
import { createRoot } from 'react-dom/client';
import "./index.scss";

import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';
import "./index.scss";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Container >
      <MainView />
    </Container>
  );
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<App />);