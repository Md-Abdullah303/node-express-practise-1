import type { Request, Response } from "express";
import { authService } from "./auth.service";


const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUserIntoDB(req.body)

        const { refreshToken } = result

        res.cookie("refreshToken", refreshToken, {
            secure: false, // http -> false, https -> true //? In production -> true
            httpOnly: true, // prevent XXS attack
            sameSite: "lax", // "none", "strict" , "lax" -> CSRF attack prevent kore thake,
            // maxAge : Time set kore dey je koto time token ar meyad thakbe
            path: "/",
            domain: "localhost", // .example.com

        })

        res.status(200).json({
            success: true,
            message: "User login successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}




const generator = async (req: Request, res: Response) => {
    try {
        // console.log(req.cookies.refreshToken)
        const result = await authService.generatorAccessToken(req.cookies.refreshToken)


        res.status(200).json({
            success: true,
            message: "Access Token Generated!",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

export const authController = {
    login,
    generator
}