import mongoose from 'mongoose';
import { getTestID } from '../../constants/test_constant';

const TestModel = mongoose.model(
    "tests",
    new mongoose.Schema(
        {
            indianStandardCode: { type: String, trim: true, required: true },
            client: { type: mongoose.Schema.Types.ObjectId, ref: "ClientSpecificUserDocModel", required: true },
            performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "SiteEngSpecificUserDocModel", required: true },
            dateOfTest: { type: Date, default: Date.now() },
        },
        {
            discriminatorKey: "testID",
        }
    )
)

const consistencyOfCementDocModel = TestModel.discriminator(
    getTestID("CONSISTENCY OF CEMENT"),
    new mongoose.Schema({
        cementBrand: { type: String, required: true, trim: true },
        cementGrade: { type: String, required: true, trim: true },
        trailData: {
            type: [{
                actualTemperature: { type: Number, required: true },
                sampleWeight: { type: Number, required: true },
                waterQuantity: { type: Number, required: true },
                plungerReading: { type: Number, required: true },
                normalConsistency: { type: Number, required: true }
            }],
            required: true
        },
        averageConsistency: { type: Number, required: true }
    })
);


const initialAndFinalSettingTimeOfCementDocModel = TestModel.discriminator(
    getTestID("INITIAL AND FINAL SETTING TIME OF CEMENT"),
    new mongoose.Schema({
        cementBrand: { type: String, required: true, trim: true },
        cementGrade: { type: String, required: true, trim: true },
        actualTestTemperature: { type: Number, required: true },
        sampleWeight: { type: Number, required: true },
        consistency: { type: Number, required: true },
        waterQuantityToAdd: { type: Number, required: true },
        timeOfAddingWaterToCement: { type: String },
        timeAtInitialSetting: { type: String },
        totalTimetakenForInitialSetting: { type: Number },
        timeAtFinalSetting: { type: String },
        totalTimetakenForFinalSetting: { type: Number },
    })
);


const determinationOfFinenessOfFlyAshDocModel = TestModel.discriminator(
    "determinationOfFinenessOfFlyAsh",
    new mongoose.Schema
        (
            {
                trailData: {
                    type: [{
                        weightOfFlyAshTaken: { type: Number, required: true },
                        percentage_of_Passing: { type: Number, required: true },
                        // Wt.of Fly Ash retained on 45 -micron seive
                    }],
                    required: true
                },
            }
        ),
);
