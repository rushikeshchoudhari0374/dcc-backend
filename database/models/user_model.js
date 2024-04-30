import mongoose from "mongoose";

export const userModel = mongoose.model
    (
        "users",
        new mongoose.Schema(
            {
                name: { type: String, required: true, trim: true },
                mobile_no: { type: String, required: true, trim: true },
                email: { type: String, required: true, trim: true },
                password: { type: String, required: true, trim: true },
                is_active: { type: Boolean, default: true },
                token_code: { type: String, default: "123456" },
            },
            { discriminatorKey: "role" }
        )
    );


export const AdminSpecificUserDocModel = userModel.discriminator("admin", new mongoose.Schema({}));

export const ManagerSpecificUserDocModel = userModel.discriminator("manager", new mongoose.Schema({}));

export const SiteEngSpecificUserDocModel = userModel.discriminator
    (
        "site-engineer",
        new mongoose.Schema(
            {
                address: { type: String, required: true },
                qualification: { type:String,required:true },
                assignedClients: {type: [{
                    client:{type:mongoose.Schema.Types.ObjectId,ref:"ClientSpecificUserDocModel"},
                    project:{type:mongoose.Schema.Types.ObjectId,ref:"projects"},
                    assignedBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
                }],default:[]}
            }
        )
    );

export const ClientSpecificUserDocModel = userModel.discriminator
    (
        "client", new mongoose.Schema(
            { 
                address: { type: String, required: true },
                company:{type:String,required:true},
                assignedSiteEngineers: {type: [{
                    siteEng:{type:mongoose.Schema.Types.ObjectId,ref:"SiteEngSpecificUserDocModel"},
                    project:{type:mongoose.Schema.Types.ObjectId,ref:"projects"},
                    assignedBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
                }],default:[]}
            },
        ),
    );


export const createUser = async (userType, userData) => {
    let userDoc;
    switch (userType) {
        case "client":
            userDoc = ClientSpecificUserDocModel(userData);
            break;

        case "site-engineer":
            userDoc = SiteEngSpecificUserDocModel(userData);
            break;

        case "manager":
            userDoc = ManagerSpecificUserDocModel(userData);
            break;

        case "admin":
            userDoc = AdminSpecificUserDocModel(userData);
            break;

        default:
            throw new Error("invalid user type..");
    }

    return await userDoc.save();
}


// export const getAdmin = async () => {
//     // return await AdminSpecificUserDocModel.findByIdAndUpdate("66105a40465e79c3d2f17e3a",{name:"Kunal Jaiswal"});
//     // return await AdminSpecificUserDocModel.updateOne({name:"ra"});

//     return await AdminSpecificUserDocModel.find()
// }

