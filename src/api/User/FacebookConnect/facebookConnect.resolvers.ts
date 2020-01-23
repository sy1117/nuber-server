import { Resolvers } from "../../../types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers : Resolvers = {
    Mutation : {
        FacebookConnect : async(_, args:FacebookConnectMutationArgs):Promise<FacebookConnectResponse> => {
            const {fbId} = args;
            try {
                const existingUser = await User.findOne({fbId})
                if(existingUser){
                    return {
                        ok : true,
                        error: null,
                        token: "Coming Soon, already"
                    }
                }
            } catch (error) {
                return {
                    ok : false,
                    error : error.message,
                    token : ""
                }
            }

            try {
                await User.create({
                    ...args
                    ,profilePhoto : `http://graph.facebook.com/${fbId}/picture?type=square`
                }).save();

                return {
                    ok:true,
                    error: "",
                    token : "Coming Soon, created"
                }
            } catch (error) {
                return {
                    ok : false,
                    error : error.message,
                    token : "test"
                }
            }

        }
    }
}


export default resolvers;