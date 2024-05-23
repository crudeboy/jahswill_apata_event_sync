import Token from "../../../module02/models/entities/Token";
import Model from "../../../../shared/knex/objectionConnection";
import { Model as objModel } from "objection";


export default class Activity extends Model() {
    id!: string;
  
    contractAddress!: string;
    tokenIndex!: string;
    listingPrice!: number;
    maker!: string;
    listingFrom!: number;
    listingTo!: number;
    eventTimestamp!: string;

    createdAt!: string;
    updatedAt!: string;
  
    static tableName = 'activity';
  
    // $beforeInsert() {
    //   this.createdAt = new Date().toISOString();
    //   this.updatedAt = new Date().toISOString();
    // }
  
    // $beforeUpdate() {
    //   this.updatedAt = new Date().toISOString();
    // }
  
    static jsonSchema = {
      type: 'object',
      required: [
        'contractAddress',
        'tokenIndex',
        'listingPrice',
        'maker',
        'listingFrom',
        'listingTo',
        'eventTimestamp'
      ],
    };


    static relationMappings = () => ({
      token: {
        relation: objModel.BelongsToOneRelation,
        modelClass: Token,
        join: {
          from: 'activity.tokenIndex',
          to: 'token.index',
        },
      }
    })

}