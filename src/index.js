const app = require('./app');

const directorioRaiz = process.env.RAILWAY_STATIC_PATH;

console.log('Directorio raiz:', directorioRaiz);

app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`);
    }
);