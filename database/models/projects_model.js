import mongoose from 'mongoose';

const ProjectModel = mongoose.model(
    "projects",
    new mongoose.Schema(
        {
            projectName:{type:String,trim:true,required:true},
            address:{type:String},
            client:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
            addedBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
            reports:{type:[],default:[]},
        }
    )
);


export default ProjectModel;