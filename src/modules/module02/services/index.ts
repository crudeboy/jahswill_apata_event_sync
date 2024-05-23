import Activity from "../../module01/models/entities/Activity";
import { NftEventsService } from "../../../modules/module01/services/NftEvents";
import axios, { AxiosInstance } from "axios";
import pino from "pino";
import Token from "../models/entities/Token";
import environment from "../../../config/environment"
import { subMinutes } from 'date-fns';
import { ValidationError, ForeignKeyViolationError, UniqueViolationError } from "objection";
import knex from "knex";



export class TokenService {
    private logger = pino();
    private api: AxiosInstance = axios.create({
        baseURL: environment.reserviourApiUrl
      });
    private timeRange = new Date(Date.now() - 30 * 60 * 1000);
    
    constructor(){
        // this.api.interceptors.request.use(this.logger);
        // this.api.interceptors.response.use(onSuccess, onError);
    }

    public async syncNewTokens(tokenArr: any[]){
        let newSetOfTokens = tokenArr.map((token: any) => {
            return {
                index: token.tokenIndex,
                contractAddress: token.contractAddress,
                currentPrice: token.listingPrice.toString()
            }
        })
        return Token.query().insertGraph(newSetOfTokens)
    }

    public async setExpiredListingPriceToNull(){
        try {
            const timeRange = new Date(Date.now() - 30 * 60 * 1000);
            const unixTime = Date.now() / 1000;

            Token.query()
                .join('activity', 'activity.token_index', 'tokens.index')
                .where('tokens.created_at', '>=', timeRange)
                .where('activity.listing_to', '<', unixTime)
                .patch({ currentPrice: undefined })

            return "Successfully updated"
        } catch (error) {
            if (error instanceof ValidationError) {
              console.error('Validation Error:', error.message);
            } else if (error instanceof ForeignKeyViolationError) {
              console.error('Foreign Key Violation Error:', error.message);
            } else if (error instanceof UniqueViolationError) {
              console.error('Unique Violation Error:', error.message);
            } else {
              console.error('Error occurred while updating.');
            }
        }
    }


    public async setPriceToMiniminLatestListingPrice(){
        let result = await Token.knex().raw(`
        UPDATE tokens AS tk1
            JOIN (
                SELECT contract_address, \`index\` AS token_index, MIN(current_price) AS min_current_price
                FROM tokens
                WHERE created_at <= NOW() - INTERVAL 30 MINUTE
                GROUP BY contract_address, \`index\`
            ) AS tk2
            ON tk1.contract_address = tk2.contract_address AND tk1.\`index\` = tk2.token_index
            SET tk1.current_price = tk2.min_current_price;
        `);
        console.log(result, "update result");
    }


}

export const tokenService = new TokenService();