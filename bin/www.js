var app = require('../app');

// Starting the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})