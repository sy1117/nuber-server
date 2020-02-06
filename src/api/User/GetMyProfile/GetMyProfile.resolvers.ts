import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/resolverMiddleware";

export const resolvers : Resolvers = {
    Query : {
        GetMyProfile : privateResolver(async(_, __, {req}) =>{
            const { user } = req
            return {
                ok: true,
                error:null,
                user
            }
        })
    }
}