const CoachesProfiles = require("../../modals/CoachesProfiles")

exports.getAllProfiles = async (req, res, next) => {
    try {
        const coachesprofiles = await CoachesProfiles.find();
        if(coachesprofiles.length > 0)
        {
            return res.status(200).json({success: "true", coachesprofiles})
        }
        else{
            return res.status(404).json({error: "No Coaches Profiles Found"})
        }

        next()
        
    } catch (error) {
        console.log(error)
    }
}

exports.getCoachProfileById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const coachprofile = await CoachesProfiles.findById(id);
        if(coachprofile){
            return res.status(200).json({success: "true", coachprofile})
        }
        else{
            return res.status(404).json({error: "No Coach Profile found with that ID"})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}


exports.getCoachProfileByUniqueID = async (req, res, next) => {
    try {
        const {unique_id} = req.params;
        console.log(unique_id)
        const coachprofile = await CoachesProfiles.findOne({unique_id: unique_id})
        if(coachprofile){
            return res.status(200).json({success: "true", coachprofile})
        }
        else{
            return res.status(404).json({error: "No Coach Profile found with that ID"})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}