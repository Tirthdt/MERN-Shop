import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('1234', 10),
    },
    {
        name: 'Jane Doe',
        email: 'Jane@example.com',
        password: bcrypt.hashSync('1234', 10),
    }
];

export default users;