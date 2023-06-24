const app = require('./app');

console.log('Directorio raiz:', __dirname);

app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`);
    }
);