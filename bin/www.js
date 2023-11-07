import app from '../app.js'

// Starting the server
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running at ${process.env.PORT || 8080}`)
})