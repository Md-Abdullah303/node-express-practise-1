import app from "./app";
import { initDB } from "./db";

const main = () => {

    initDB()
    app.listen(8000, () => {
        console.log(`Server was Running on port : ${8000}`)
    })
}

main()