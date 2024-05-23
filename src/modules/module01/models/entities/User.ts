import Model from "../../../../shared/knex/objectionConnection";


export default class User extends Model() {
    id!: string;
  
    contractAddress!: string;
    tokenIndex!: string;
    listingPrice!: number;


    createdAt!: string;
    updatedAt!: string;
  
    static tableName = 'user';
  
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
        'listingPrice'
      ],
    };

}