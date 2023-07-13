const server = require('./app');

console.log('Directorio raiz:', __dirname);

server.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`);
});