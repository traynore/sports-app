const CoachesProfiles = require("../../modals/CoachesProfiles")

exports.deleteCoachProfile = async (req, res, next) => {
    try {
        const {id} = req.params;
        const coachprofile = await CoachesProfiles.findByIdAndRemove(id)
        if(coachprofile){
            return res.status(200).json({success: "true", msg: "Coach Profile was deleted successfully"})
        }
        else{
            return res.status(400).json({error: "Could not delete the Coach Profile, Coach Profile not found."})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

exports.deletecurrentGroup = async (req, res, next) => {
    try {
        const CoachProfileId = req.body.profileid;
        const coachprofile = await CoachesProfiles.findById(CoachProfileId);
        if(coachprofile)
        {
            const currentGroupid = req.body.id
                
            let currentGroupIndex = coachprofile.currentGroups.map(item => item.id).indexOf(currentGroupid)
           if(currentGroupIndex !== -1)
           {
               coachprofile.currentGroups.splice(currentGroupIndex, 1)
               const CoachProfile = await coachprofile.save();
               return res.status(200).json({success: "true", CoachProfile})
           }
        }
        else{
            return res.status(404).json({error: "Coach Not found with that Id"})
        }

    } catch (error) {
        console.log(error)
    }
}


exports.deletecoachEducation = async (req, res, next) => {
    try {

        const CoachProfileId = req.body.profileid;
        const coachprofile = await CoachesProfiles.findById(CoachProfileId);
        if(coachprofile)
        {
            const coacheducationid = req.body.id
                
            let coachEducationIndex = coachprofile.coachEducation.map(item => item.id).indexOf(coacheducationid)
           if(coachEducationIndex !== -1)
           {
               coachprofile.coachEducation.splice(coachEducationIndex, 1)
               const CoachProfile = await coachprofile.save();
               return res.status(200).json({success: "true", CoachProfile})
           }
        }
        else{
            return res.status(404).json({error: "Coach Not found with that Id"})
        }
    }
    catch(error)
    {
        console.log(error)
    }
}