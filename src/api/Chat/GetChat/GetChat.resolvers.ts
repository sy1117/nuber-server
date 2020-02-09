import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { privateResolver } from "../../../utils/resolverMiddleware";
import { GetChatResponse, GetChatQueryArgs } from "../../../types/graph";
import Chat from "../../../entities/Chat";

export const resolvers : Resolvers = {
    Query : {
        GetChat : privateResolver(
            async(_, args : GetChatQueryArgs, { req }):Promise<GetChatResponse>=>{
                const user : User = req.user;

                try {
                    const chat = await Chat.findOne({
                        id : args.chatId
                    })

                    if(chat){
                        if(
                            chat.passengerId === user.id ||
                            chat.driverId === user.id
                        ){
                            return {
                                ok :true,
                                error: null,
                                chat,
                            }
                        }else{
                            return {
                                ok: false,
                                error: "Not authorized to see this chat",
                                chat:null,
                            }
                        }
                    }else{
                        return {
                            ok: false,
                            error: "Not found",
                            chat:null,
                        }
                    }
                    
                } catch (error) {
                    return {
                        ok:false,
                        error:error.message,
                        chat : null
                    }
                }
            }
        )
    }
}