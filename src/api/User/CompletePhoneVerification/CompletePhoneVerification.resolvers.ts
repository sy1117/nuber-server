import { Resolvers } from "../../../types/resolvers";
import { CompletePhoneVerificationResponse, CompletePhoneVerificationMutationArgs } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

export const resolvers : Resolvers = {
    Mutation:{
        CompletePhoneVerification: async(
            _, 
            args:CompletePhoneVerificationMutationArgs
        ):Promise<CompletePhoneVerificationResponse>=>{
            const { phoneNumber, key} = args;

            try {
                const verification= await Verification.findOne({
                    payload: phoneNumber,
                    key
                })
                if(!verification){
                    return {
                        ok: false,
                        error : "Verification key not valid",
                        token: null
                    }
                }else{
                    verification.verified = true;
                    verification.save();
                    return {
                        ok: true,
                        error: null,
                        token:null
                    }
                }
            } catch (error) {
                return {
                    ok : false,
                    error : error.message,
                    token:null

                }
            }

            try {
                const user:any = await User.findOne({
                    phoneNumber
                });
                if(user){
                    user.verifiedPhoneNumber = true;
                    user.save();
                    const token = createJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                }else { 
                    return {
                        ok: true,
                        error:null,
                        token:null
                    }
                } 
            } catch (error) {
                return {
                    ok : false,
                    error : error.message,
                    token:null
                }
            }
        }
    }
}