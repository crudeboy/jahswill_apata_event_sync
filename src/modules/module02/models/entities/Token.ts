import Activity from "../../../module01/models/entities/Activity";
import Model from "../../../../shared/knex/objectionConnection";
import { Model as objModel } from 'objection';


export default class Token extends Model() {
    id!: string;
  
    contractAddress!: string;
    index!: string;
    currentPrice?: number;

    createdAt!: string;
    updatedAt!: string;
  
    static tableName = 'tokens';
  
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
        'index'
      ],
      properties: {
        id: { type: 'integer' },
        currentPrice: { type: ['string', 'null'] }, // This field can be a string or null
        index: { type: 'string' },
        contractAddress: { type: 'string' },
      },
    };

    static relationMappings = () => ({
      activity: {
        relation: objModel.BelongsToOneRelation,
        modelClass: Activity,
        join: {
          from: 'token.index',
          to: 'activity.tokenIndex',
        },
      }
    })

}