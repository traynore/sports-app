const CoachesProfiles = require("../../modals/CoachesProfiles")

//Validation
// const ValidateCoachProfile = require("../../validation/CoachesProfileValidate");
// const validatecurrentGroup = require("../../validation/validatecurrentGroup");
// const validatecoachEducation = require("../../validation/validatecoachEducation")

exports.updateCoachProfile = async (req, res, next) => {
    try {
        // const {errors, isValid} = ValidateCoachProfile(req.body);
        // if(!isValid)
        // {
        //     return res.json(errors);
        // }
        const {id} = req.params;
        const coachprofile = await CoachesProfiles.findById(id)
        if(coachprofile)
        {
            const updateCoachProfile = {
            name: req.body.name ? req.body.name : coachprofile.name,
            childSafeGaurding: req.body.childSafeGaurding ? req.body.childSafeGaurding : coachprofile.childSafeGaurding,
            unique_id: req.body.unique_id ? req.body.unique_id : coachprofile.unique_id,
            imgUrl: req.body.imgUrl ? req.body.imgUrl : coachprofile.imgUrl,
            contactNO: req.body.contactNO ? req.body.contactNO : coachprofile.contactNO
            }

            let updatedCoachProfile = await coachprofile.updateOne({$set: updateCoachProfile})
            // console.log(updatedCoachProfile)
            return res.status(200).json({success: "true", msg: "Coach Profile was updated successfully"})
        }
        else{
            return res.status(400).json({error: "There was an error, Could not update the Coach Profile"})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

