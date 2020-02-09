import { privateResolver } from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { UpdateRideStatusResponse, UpdateRideStatusMutationArgs } from "../../../types/graph";
import Ride from "../../../entities/Ride";
import Chat from "../../../entities/Chat";

export const resolvers : Resolvers = {
    Mutation :{
        UpdateRideStatus : privateResolver(
            async(_, args:UpdateRideStatusMutationArgs, { req, pubSub }) : Promise<UpdateRideStatusResponse>=>{
                const user : User = req.user;

                if (user.isDriving) {
                    try {
                        let ride : Ride | undefined;
                        // REQUESTING => ACCEPTED 
                        if (args.status ==="ACCEPTED") {
                            ride = await Ride.findOne({
                                id:args.rideId, 
                                status:"REQUESTING",
                            }, {"relations": ["passenger"]});
                            if(ride){
                                ride.driver = user;
                                user.isTaken = true;
                                user.save();

                                const chat = await Chat.create({
                                    driver : user,
                                    passenger: ride.passenger
                                }).save();
                                console.log(chat)
                                ride.chat = chat;
                                ride.save();
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
                            pubSub.publish("rideUpdate", { 
                                RideStatusSubscription : ride
                            })
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