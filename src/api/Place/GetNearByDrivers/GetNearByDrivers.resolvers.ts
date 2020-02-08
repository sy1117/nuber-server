import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { GetNearByDriversResponse } from "../../../types/graph";
import { Between, getRepository } from "typeorm";

export const resolver : Resolvers = {
    Query : {
        GetNearByDrivers  : privateResolver(
            async(_, __, {req}) : Promise<GetNearByDriversResponse>=>{
                const user:User = req.user;
                const {lastLat, lastLng} = user;
                const drivers:User[] = await getRepository(User).find({
                    isDriving : true,
                    lastLat : Between(lastLat - 0.05, lastLat + 0.05),
                    lastLng : Between(lastLng - 0.05, lastLng - 0.05)
                })

                try {
                    return {
                        ok: true,
                        error: null,
                        drivers
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error:error.message,
                        drivers:null
                    }
                }
            }
        )
    }
}