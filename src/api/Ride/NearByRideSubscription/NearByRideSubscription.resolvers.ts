import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

export const resolvers = {
    Subscription : {
        NearByRideSubscription : {
            subscribe : withFilter(
                (_, __, { pubSub })=> pubSub.asyncIterator("rideRequest"),
                async (payload, __, { context })=>{
                    const user : User = context.currentUser;
                    const { NearByRideSubscription : { 
                        pickUpLat, 
                        pickUpLng,
                    }} = payload;
                    const { lastLat : userLastLat, lastLng: userLastLng } = user;

                    return (
                        pickUpLat >= userLastLat - 0.05 &&
                        pickUpLat <= userLastLat + 0.05 &&
                        pickUpLng >= userLastLng - 0.05 &&
                        pickUpLng <= userLastLng + 0.05
                    )
                }
            )
        }
    } 
}