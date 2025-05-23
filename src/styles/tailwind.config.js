module.exports = {
    purge: [],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                cyber: {
                    green: '#00ff5e',
                    blue: '#00ffff',
                    purple: '#fc00ff',
                    dark: '#0a0a12',
                    pink: '#ff00ff',
                    yellow: '#ffff00'
                }
            },
            fontFamily: {
                mono: ['"Share Tech Mono"', 'monospace'],
            },
            minHeight: {
                'panel': '300px',
            }
        },
    },
    variants: {
        extend: {},
    },
    corePlugins: {
        // Enable arbitrary value support
        float: false,
        clear: false,
    },
}