import axios from 'axios';

async function testLogin() {
    try {
        console.log('Testing login...');
        const response = await axios.post('http://localhost:3001/api/auth/login', {
            email: 'duediligence1p1@yahoo.com',
            password: 'DD1p1!@#'
        }, { timeout: 5000 });
        console.log('SUCCESS: Login worked.');
        console.log('Token received:', !!response.data.token);
    } catch (error) {
        console.log('FAILED: Login failed.');
        if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Data:', JSON.stringify(error.response.data));
        } else if (error.request) {
            console.log('No response received (Network Error).');
            console.log(error.message);
        } else {
            console.log('Error setup:', error.message);
        }
    }
}

testLogin();
