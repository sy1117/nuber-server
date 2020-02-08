import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

export const resolver = {
    Subscription: {
        DriversSubscription:{
            subscribe : withFilter((_, __, {pubSub})=>pubSub.asyncIterator("driverUpdate"), 
            (payload, _, {context})=>{
                console.log(`This is coming from the ReportMovement`);
                const user : User = context.currentUser;
                const { DriversSubscription : { lastLat : driverLastLat, lastLng: driverLastLng }} = payload;
                const { lastLat : userLastLat, lastLng: userLastLng } = user;

                return (
                    driverLastLat >= userLastLat - 0.05 &&
                    driverLastLat <= userLastLat + 0.05 &&
                    driverLastLng >= userLastLng - 0.05 &&
                    driverLastLng <= userLastLng + 0.05
                )

            })
        }
    }
}