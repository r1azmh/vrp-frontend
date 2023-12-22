import './App.css';
import Dashboard from "./components/Dashboard";
import NavbarComponent from "./components/NavbarComponent";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 font-poppins">
            <NavbarComponent/>
            <div className="px-16 ">
                <div className="container mx-auto ">
                    <Dashboard/>
                </div>
            </div>
        </div>
    );
}

export default App;

