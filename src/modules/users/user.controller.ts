import type { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoApplication(req.body)

        res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUserFromApplication()

        if (result.rowCount === 0) {
            res.status(500).json({
                success: false,
                message: "There is no Data found.",
            })
        }

        res.status(200).json({
            success: true,
            message: "All Users Data",
            data: result.rows
        })



    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.getUserFromApplication(id as string)


        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found!",
            })

        }


        res.status(200).json({
            success: true,
            message: "Successfully Retrived User",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await userService.updateUserFromApplication(id as string, req.body)


        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found!",
            })
        }

        delete result.rows[0].password
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
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

const deleteUser = async(req: Request, res: Response)=> {
    try {
        const {id} = req.params;

        const result = await userService.deleteUserFromApplication(id as string)
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: result
        })
    } catch (error) {
        console.log(error)
    }
}

export const userController = {
    createUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
}