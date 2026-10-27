export default {
    name: 'clear',
    description: 'Clear the terminal',

    run(args, { terminal }) {
        terminal.clear();
        return null;
    },
};
