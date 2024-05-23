import { CreateUserRequest } from "@modules/module01/dtos";
import User from "../models/entities/User"

export class UserRepository  {
    // public async findAll(props: IAccountFindProps) {
    //   const { page, pageSize, searchTerm, startTs, endTs, agentId, bvnStatus } =
    //     props;
    //   const tokens = searchTerm?.split(' ');
  
    //   return Account.query()
    //     .withGraphFetched('customer')
    //     .withGraphFetched('bank')
    //     .andWhere((builder) => {
    //       if (!agentId) return;
    //       builder.andWhere('createdByUserId', agentId);
    //     })
    //     .andWhere((builder) => {
    //       tokens?.forEach((value) => {
    //         builder.orWhere('firstname', 'ilike', value);
    //         builder.orWhere('lastname', 'ilike', value);
    //         builder.orWhere('middlename', 'ilike', value);
    //       });
    //     })
    //     .andWhere((builder) => {
    //       if (startTs) builder.andWhere('createdAt', '>=', startTs);
    //       if (endTs) builder.andWhere('createdAt', '<=', endTs);
    //     })
    //     .andWhere((builder) => {
    //       if (!bvnStatus) return;
    //       builder.andWhere('bvnVerificationStatus', bvnStatus);
    //     })
    //     .orderBy('createdAt', 'DESC')
    //     .page(page, pageSize);
    // }

    public async create(request: CreateUserRequest){
        return User.query().insert({
            firstname: request.firstname,
            lastname: request.lastname,
            phoneNumber: request.phoneNumber,
            role: request.role,
            email: request.email,
            middlename: request.middlename
        })
    }

}