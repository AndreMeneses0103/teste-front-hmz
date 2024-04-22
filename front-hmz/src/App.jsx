import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from "@/pages/Home";
import { Users } from "./pages/Users";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/users" element={<Users/>} />
            </Routes>
        </Router>
    );
}

export default App;
