import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { CompleteEmailVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";

export const resolvers: Resolvers = {
    Mutation : {
        CompleteEmailVerification : privateResolver(
            async(_, args, {req}):Promise<CompleteEmailVerificationResponse>=>{
                const {key} =args;
            const user:User = req.user;
            if(user.email){
                try {
                    const verification = Verification.findOne({
                        key,
                        payload: user.email
                    })

                    if(verification){
                        user.verifiedEmail = true;
                        user.save();
                        return {
                            ok: true,
                            error: null,
                        }
                    }

                    return {
                        ok: false,
                        error: "Can't verify Email."
                    }
                    
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }
            }else{
                return {
                    ok: false,
                    error: "No User with this email."
                }
            }
        })
    } 
}