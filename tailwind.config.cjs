module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts,css}'],
    theme: {
        extend: {
            colors: {
                'dodger-blue': '#007bff'
            }
        }
    },
    plugins: [require('daisyui')]
};
