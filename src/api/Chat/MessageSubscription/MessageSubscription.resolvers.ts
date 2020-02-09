import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

export const resolvers = {
    Subscription : {
        MessageSubscription : {
            subscribe : withFilter(
                (_, __, { pubSub })=> pubSub.asyncIterator("newChatMessage"),
                async (payload, _, { context })=>{
                    const user : User = context.currentUser;
                    const { 
                        MessageSubscription : { 
                            chatId, 
                        }
                    } = payload;

                    try {
                        const chat = await Chat.findOne({
                            id: chatId
                        })
                        if(chat){
                            if(
                                chat.driverId === user.id ||
                                chat.passengerId === user.id
                            ){
                                return true;
                            }
                        }
                        return false;
                    } catch (error) {
                        return false
                    }
                }
            )
        }
    } 
}