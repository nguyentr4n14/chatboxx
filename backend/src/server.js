import express from "express"
import { ENV_VARS } from "./config/envVars.js"
import { connectDB } from "./config/db.js"
import { clerkMiddleware } from "@clerk/express"
import { functions, inngest } from "./config/inngest.js"
import { serve } from "inngest/express"

const app = express()

const PORT = ENV_VARS.PORT
const NODE_ENV = ENV_VARS.NODE_ENV

app.use(express.json())
app.use(clerkMiddleware()) // req.auth will be available in the request object
app.use("/api/inngest", serve({ client: inngest, functions }))

app.get("/", (req, res) => {
    res.send("Hello World 1234")
})

const startServer = async () => {
    try {
        await connectDB()
        if (NODE_ENV !== "production") {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`)
            })
        }
    } catch (error) {
        console.error("Error starting server:", error)
        process.exit(1) // Exit the process with a failure code
    }
}

startServer()

export default app