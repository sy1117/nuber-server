import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

export const resolvers = {
    Subscription : {
        RideStatusSubscription : {
            subscribe : withFilter(
                (_, __, { pubSub })=> pubSub.asyncIterator("rideUpdate"),
                async (payload, __, { context })=>{
                    const user : User = context.currentUser;
                    const { 
                        RideStatusSubscription : { 
                            driverId, 
                            passengerId,
                        }
                    } = payload;
                    return (
                        user.id === driverId ||
                        user.id === passengerId 
                    )
                }
            )
        }
    } 
}