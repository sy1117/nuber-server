import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/resolverMiddleware";
import { UpdateMyProfileResponse, UpdateMyProfileMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import { cleanNullArg } from "../../../utils/cleanNullArg";

export const resolvers : Resolvers = {
    Mutation : {
        UpdateMyProfile : privateResolver(async(_, args: UpdateMyProfileMutationArgs, {req}):Promise<UpdateMyProfileResponse>=>{

            const user : User = req.user;
            const notNull = cleanNullArg(args)
            try {
                if(args.password){
                    user.password = args.password
                    // trigger @beforeupdate 
                    user.save();
                }
                await User.update({id: user.id}, {...notNull})
                return {
                    ok: true,
                    error: null,
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
                
            }

            return {
                ok: false,
                error: "can't update profile"
            }
        })
    }
}