import { createRoot } from "react-dom/client";

import "./index.scss";                                  // Import statement to indicate that you need to bundle `./index.scss`

const MyFlixApplication = () => {                       // Main component (will eventually use all the others)

    return (
        <div className="my-flix">
            <div>Hello World!!</div>    
        </div>
    );
};

const container = document.querySelector("#root");       // Finds the root of your app

const root = createRoot(container);

root.render(<MyFlixApplication/>);                        // Tells React to render your app in the root DOM element