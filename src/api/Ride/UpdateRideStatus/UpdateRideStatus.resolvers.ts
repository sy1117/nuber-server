import { privateResolver } from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { UpdateRideStatusResponse, UpdateRideStatusMutationArgs } from "../../../types/graph";
import Ride from "../../../entities/Ride";

export const resolvers : Resolvers = {
    Mutation :{
        UpdateRideStatus : privateResolver(
            async(_, args:UpdateRideStatusMutationArgs, { req }) : Promise<UpdateRideStatusResponse>=>{
                const user : User = req.user;

                if (user.isDriving) {
                    try {
                        let ride : Ride | undefined;
                        // REQUESTING => ACCEPTED 
                        if (args.status ==="ACCEPTED") {
                            ride = await Ride.findOne({
                                id:args.rideId, 
                                status:"REQUESTING",
                            });
                            if(ride){
                                ride.driver = user;
                                user.isTaken = true;
                                user.save();
                            }
                        // only Driver, can update status(except REQUESTING)
                        } else {
                            ride = await Ride.findOne({
                                id: args.rideId,
                                driver: user
                            })
                        }
                        if (ride) {
                            ride.status = args.status;
                            ride.save();
                            return {
                                ok: true,
                                error: null
                            }
                        } else {
                            return {
                                ok: false,
                                error: "Can't update ride"
                            }
                        }
                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "You are not driving"
                    }
                }
            }
        )
    }
}