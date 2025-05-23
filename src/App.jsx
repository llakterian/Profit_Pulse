import { EthersProvider } from './contexts/EthersContext';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <EthersProvider>
            <div className="min-h-screen bg-gray-100">
                <Dashboard />
            </div>
        </EthersProvider>
    );
}

export default App;