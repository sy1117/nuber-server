import { privateResolver } from "../../../utils/resolverMiddleware";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import Place from "../../../entities/Place";
import { cleanNullArg } from "../../../utils/cleanNullArg";

export const resolvers : Resolvers = {
    Mutation : {
        EditPlace: privateResolver(async(_, args:EditPlaceMutationArgs, {req}):Promise<EditPlaceResponse>=>{
            const user:User = req.user;

            try {
                const place = await Place.findOne({id: args.placeId})
                console.log(place, args)
                if(place){
                    if(place.userId === user.id){
                        const notNull:any = cleanNullArg(args);
                        delete notNull.placeId;
                        await Place.update({id:args.placeId}, {...notNull});
                        return {
                            ok:true,
                            error: null
                        }
                    }else{
                        return {
                            ok: false,
                            error: "Not Authorized"
                        }
                    }
                } else{
                    return {
                        ok:false,
                        error:"Place not found"
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}