import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/resolverMiddleware";
import { RequestRideResponse } from "../../../types/graph";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";

export const resolvers : Resolvers = {
    Mutation :{
        RequestRide : privateResolver(
            async(_, args, { req }):Promise<RequestRideResponse>=>{
                const user : User = req.user;
                try {
                    const ride = await Ride.create({...args, passenger:user}).save();
                    return {
                        ok: true,
                        error: null,
                        ride
                    }
                } catch (error) {
                    return {
                        ok:false,
                        error: error.message,
                        ride: null
                    }
                }
            }
        )
    }
}
