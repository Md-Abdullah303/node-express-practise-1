import express, { type Request, type Response } from "express"
import { userRouter } from "./modules/users/user.route";
import { authRouter } from "./modules/auth/auth.route";
import logger from "./middleware/logger";


const app = express()
const port = 8000

app.use(express.json())
app.use(logger);




//ROUTE
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)




app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is Running.",
    })
})

export default app;