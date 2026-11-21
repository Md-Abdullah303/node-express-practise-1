import app from "./app";
import { config } from "./config";
import { initDB } from "./db";

const main = () => {

    initDB()
    app.listen(config.port, () => {
        console.log(`Server was Running on port : ${config.port}`)
    })
}

main()