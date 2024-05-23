import pino from "pino";
import axios, { AxiosInstance } from 'axios';
import environment from "../../../config/environment";
import Activity from "../models/entities/Activity";
import User from "../models/entities/User";
import { onError, onSuccess } from "../../../shared/utils/logger";


export class NftEventsService {
    private logger = pino();
    private api: AxiosInstance = axios.create({
        baseURL: environment.reserviourApiUrl
      });
    
    constructor(){}


    public async fetchLatestEvents(limit: number, startTimestamp: number, endTimestamp: number, continuation?: string){
        let queryUrl = await this.buildUrl(limit, startTimestamp, endTimestamp, continuation);
        let latestEvents = await this.api.get(queryUrl);
        console.log(latestEvents.data.events.length, "number of events");
        let newOrders = latestEvents.data.events.filter((entry: any) => {
            return entry.event.kind == "new-order"
        })
        .map((entry: any) => {
            return {
                contractAddress: entry.order.contract,
                tokenIndex: entry.order.criteria.data.token.tokenId,
                listingPrice: entry.order.price.amount.native,
                maker: entry.order.maker ,
                listingFrom: entry.order.validFrom,
                listingTo: entry.order.validUntil,
                eventTimestamp: entry.event.createdAt
            }
        }); 
        return this.saveNewOrdersTOActivity(newOrders);
    }

    private async buildUrl(limit: number, startTimestamp: number, endTimestamp: number, continuation?: string){
        let queryParamters = "";
        if(limit != undefined) queryParamters += `limit=${limit}`
        if(endTimestamp != undefined) queryParamters += `endTimestamp=${endTimestamp}`
        if(startTimestamp != undefined) queryParamters += `endTimestamp=${startTimestamp}`
        if(continuation != undefined) queryParamters += `continuation=${continuation}`
        return queryParamters == "" ? `?${queryParamters}` : "";
         
    }

    private async saveNewOrdersTOActivity(newData: any){
        //paginate response
        return Activity.query().insertGraph(newData)
    }

    public async fetchEventsWithinTimeRange(){
        const timeRange = new Date(Date.now() - 30 * 1000);

        return Activity.query().where("activity.created_at", "<=" , timeRange.toISOString())
        .leftJoin('tokens', 'activity.token_index', 'tokens.index')
        .whereNull('tokens.id')
        .select('activity.token_index', 'activity.contract_address', 'activity.listing_price')

    }

    
}

export const nftEventService = new NftEventsService();