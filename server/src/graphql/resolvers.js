
const contacts = [
    {
        id: '1',
        name: 'Harry Potterrrr',
        avatar: '',
    },
    {
        id: '2',
        name: 'Voldemort',
        avatar: '',
    },
];

export default {
    Query: {
        contacts: (root, args, context, info) => {
            new Promise(r => setTimeout(() => r(contacts), 2000))
        }
    },
};