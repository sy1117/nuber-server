import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/resolverMiddleware";
import { ReportMovementMutationArgs, ReportMovementResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { cleanNullArg } from "../../../utils/cleanNullArg";

export const resolvers : Resolvers = {
    Mutation : {
        ReportMovement : privateResolver(
            async(_, args:ReportMovementMutationArgs, {req, pubSub}):Promise<ReportMovementResponse>=>{

                const user:User = req.user;
                const notNull = cleanNullArg(args);

                try {
                    await User.update({id: user.id}, {...notNull})
                    const updatedUser = await User.findOne({id:user.id})
                    console.log(updatedUser)
                    // publish(channerName, payload)
                    pubSub.publish("driverUpdate", {
                        DriversSubscription: updatedUser
                    })
                    return {
                        ok: true,
                        error: null
                    }
                } catch (error) {
                    return {
                        ok:false,
                        error: error.message
                    }
                }
        })
    }
}