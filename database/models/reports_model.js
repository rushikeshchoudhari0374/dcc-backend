import mongoose from "mongoose"; 

const ReportsModel = mongoose.model(
    "reports",
    new mongoose.Schema(
        {
            status:{type:Boolean,default:false},
            uncompletedTests:{type:[]},
            completedTests:{type:[]},
        },
        {
            discriminatorKey:"report_name"
        }
    )
)


const CementReportModel = ReportsModel.discriminator(
    "cement",
    new mongoose.Schema(
        {
            
        }
    )
)
