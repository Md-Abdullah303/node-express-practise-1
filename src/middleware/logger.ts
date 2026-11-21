import type { NextFunction, Request, Response } from "express";
import fs from "fs"

const logger = async (req: Request, res: Response, next: NextFunction) => {
    //   console.log('Time:', Date.now());
    // console.log(`Method : ${req.method} | Url : ${req.url} | Time : ${Date.now()}`)
    const log = `\nMethod : ${req.method} | Url : ${req.url} | Time : ${Date.now()}\n`
    fs.appendFile("logger.txt", log, (err) => {
        if (err) console.log("logger have some thing error : " + err)

    })
    next();
}

export default logger