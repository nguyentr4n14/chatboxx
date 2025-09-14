import express from "express"
import { ENV_VARS } from "./config/envVars.js"

const app = express()

const PORT = ENV_VARS.PORT

app.get("/", (req, res) => {
    res.send("Hello World 1234")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})