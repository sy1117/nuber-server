import { Resolvers } from "../../../types/resolvers";
import { EmailSignInResponse, EmailSignInMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";

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
                    return {
                        ok : true,
                        error : null,
                        token :"Coming Soon"
                    }
                } else {
                    return {
                        ok : true,
                        error : null,
                        token :"Coming Soon"
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