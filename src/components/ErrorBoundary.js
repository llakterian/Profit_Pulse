import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-cyber-dark text-cyber-pink min-h-screen flex items-center justify-center p-4">
                    <div className="cyber-border p-8 max-w-md text-center">
                        <h1 className="text-3xl mb-4">⚠️ TERMINAL ERROR</h1>
                        <p className="mb-6">The trading terminal has encountered a critical error</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="cyber-button px-6 py-2"
                        >
                            RELOAD TERMINAL
                        </button>
                        <div className="mt-6 text-xs text-cyber-blue">
                            <p>Error details:</p>
                            <code className="block overflow-x-auto mt-2 p-2 bg-black bg-opacity-30">
                                {this.state.error.toString()}
                            </code>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}