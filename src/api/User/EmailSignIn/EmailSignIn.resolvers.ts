import { Resolvers } from "../../../types/resolvers";
import { EmailSignInResponse, EmailSignInMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers : Resolvers = {
    Mutation : {
        EmailSignIn: async (_, args:EmailSignInMutationArgs) :Promise<EmailSignInResponse> =>{
            const {email, password} = args;
            try {
                const user = await User.findOne({email})
                if(!user){
                    return {
                        ok : true,
                        error: "No user found with that email",
                        token : null
                    }
                }

                const checkPassword = await user.comparePassword(password);
                if(checkPassword){
                    const token = createJWT(user.id)
                    return {
                        ok : true,
                        error : null,
                        token
                    }
                } else {
                    return {
                        ok : false,
                        error : null,
                        token:null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token : null
                }
            }

            return {
                ok : true,
                error: null,
                token :"Coming Soon!"
            }
        }
    }
}

export default resolvers;