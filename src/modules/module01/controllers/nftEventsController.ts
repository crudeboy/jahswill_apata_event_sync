import { Request, Response } from "express";
import { nftEventService } from "../services/NftEvents";


export const fetchEvents = (async (req: Request, res: Response) => {
    //2024-05-23T05:36:48.824Z
    const { limit, startTimestamp, endTimestamp, continuation } = req.query as any

    let result = await nftEventService.fetchLatestEvents(limit, startTimestamp, endTimestamp, continuation);
    console.log(result, "resulting data");
    return res.json({
        message: "data successfully fetched.",
        data: result
    })
})

export const syncWithToken = (async (req: Request, res: Response) => {
    //2024-05-23T05:36:48.824Z
    // const { limit, startTimestamp, endTimestamp, continuation } = req.query as any

    let result = await nftEventService.fetchEventsWithinTimeRange();
    console.log(result, "resulting data");
    return res.json({
        message: "data successfully fetched.",
        data: result
    })
})