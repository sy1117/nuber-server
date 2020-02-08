import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/resolverMiddleware";
import { ToggleDrivingModeResponse } from "../../../types/graph";
import User from "../../../entities/User";


export const resolvers : Resolvers = {
    Mutation : {
        ToggleDrivingMode : privateResolver(async(_, __, {req}):Promise<ToggleDrivingModeResponse>=>{
            const user : User = req.user;
            user.isDriving = !user.isDriving;
            user.save();
            return {
                ok:true,
                error:null
            }
        })
    }
}