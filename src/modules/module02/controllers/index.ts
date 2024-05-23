import { Request, Response } from "express";
import { token_sync_jobs } from "../services/tokenCronTask";
import { tokenService } from "../services";


export const syncTokens = (async (req: Request, res: Response) => {

    let result = await token_sync_jobs()
    console.log(result, "resulting data");
    return res.json({
        message: "data successfully fetched.",
        data: result
    })
})

export const setExpiredTokenPriceToNull = (async (req: Request, res: Response) => {

    let result = await tokenService.setExpiredListingPriceToNull()
    console.log(result, "resulting data");
    return res.json({
        message: "data successfully fetched.",
        data: result
    })
})