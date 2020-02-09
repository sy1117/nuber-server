import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { GetNearByRideResponse } from "../../../types/graph";
import { getRepository, Between } from "typeorm";
import Ride from "../../../entities/Ride";

export const resolvers :Resolvers = {
    Query :{
        GetNearByRide : privateResolver(
            async(_, __, {req}) : Promise<GetNearByRideResponse> =>{
                const user : User = req.user;
                if(user.isDriving){
                    try {
                        const { lastLat, lastLng } = user;
                        const ride =await getRepository(Ride).findOne({
                            status: "REQUESTING",
                            pickUpLat : Between(lastLat - 0.05,lastLat+0.05),
                            pickUpLng : Between(lastLng - 0.05,lastLng+0.05),
                        })
                        if(ride){
                            return {
                                ok: true,
                                error:null,
                                ride
                            }
                        }else{
                            return {
                                ok: false,
                                error:"there is no ride",
                                ride :null
                            }
                        }

                    } catch (error) {
                        return {
                            ok: false,
                            error: error.message,
                            ride: null
                        }
                    }
                }else{
                    return {
                        ok: false,
                        error: "You are not a driver",
                        ride: null
                    }
                }
            }
        )
    }
}