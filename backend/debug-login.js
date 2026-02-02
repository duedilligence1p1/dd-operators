import bcrypt from 'bcryptjs';
import { query } from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();

async function debugLogin() {
    const email = 'duediligence1p1@yahoo.com';
    const password = 'DD1p1!@#';

    console.log('--- Debug Login ---');
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        const result = await query('SELECT * FROM operadores WHERE email = $1', [email.toLowerCase()]);
        console.log('User found:', result.rows.length > 0);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            console.log('User ID:', user.id);
            console.log('User Status:', user.status);
            console.log('User Admin:', user.is_admin);

            const validPassword = await bcrypt.compare(password, user.password_hash);
            console.log('Password Valid:', validPassword);

            if (!validPassword) {
                console.log('Hash in DB:', user.password_hash);
                const testHash = await bcrypt.hash(password, 10);
                console.log('New Hash for same password:', testHash);
                const secondValid = await bcrypt.compare(password, testHash);
                console.log('Second comparison with new hash:', secondValid);
            }
        } else {
            const allUsers = await query('SELECT email FROM operadores');
            console.log('All users in DB:', allUsers.rows.map(u => u.email));
        }
    } catch (error) {
        console.error('Error:', error);
    }
    process.exit(0);
}

debugLogin();
