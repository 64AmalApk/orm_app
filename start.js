const figlet = require('figlet');
const { execSync } = require('child_process');

figlet('Ayush', (err, data) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log(data);

    try {
        execSync('nodemon ./app.js', { stdio: 'inherit' });
    } catch (error) {
        console.error('Error starting server:', error);
    }
});
