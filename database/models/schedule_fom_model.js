import mongoose from 'mongoose';

const ScheduleFormModel = mongoose.model(
    "scheduleForm",
    new mongoose.Schema(
        {
            siteEng:{type:mongoose.Schema.Types.ObjectId,ref:"SiteEngSpecificUserDocModel"},
            testID:{type:String,required: true, trim: true},
            projectID:{type:mongoose.Schema.Types.ObjectId,ref:"projects"},
            clientID:{type:mongoose.Schema.Types.ObjectId,ref:"ClientSpecificUserDocModel"},
            ScheduledDate:{type:Date,default:Date.now()},
            is_completed:{type:Boolean,default:false},
        }
    )
);


export default ScheduleFormModel