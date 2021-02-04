const CoachesProfiles = require("../../modals/CoachesProfiles")

//Validation
const ValidateCoachProfile = require("../../validation/CoachesProfileValidate");
const validatecurrentGroup = require("../../validation/validatecurrentGroup");
const validatecoachEducation = require("../../validation/validatecoachEducation")

exports.createCoachProfile = async (req, res, next) => {
    try {
        const {errors, isValid} = ValidateCoachProfile(req.body)
        if(!isValid)
        {
            return res.status(400).json(errors);
        }
        const coachProfile = {
            name: req.body.name,
            unique_id: req.body.unique_id,
            childSafeGaurding: req.body.childSafeGaurding,
            contactNO: req.body.contactNO
        }

        const profileFound = await CoachesProfiles.findOne({unique_id: req.body.unique_id});
        if(!profileFound)
        {
            let newCoachProfile = await new CoachesProfiles(coachProfile).save();
            return res.json(newCoachProfile)
            next()
        }
        else{
            return res.status(400).json({error: "A Coach Exists with that unique_id please try another one."})
        }
    } catch (error) {
        console.log(error)
    }
}


exports.addCurrentGroup = async (req, res, next) => {
    try {
        const {errors, isValid} = validatecurrentGroup(req.body);
        if(!isValid)
        {
            return res.json(errors);
        }
        const coachProfileId = req.body.profileid;
        const coachprofile = await CoachesProfiles.findById(coachProfileId);
        if(coachprofile)
        {
            const currentGroup = {
                id: req.body.id,
                curgroup: req.body.curgroup
            };
            coachprofile.currentGroups.unshift(currentGroup);
            const NoteCoachProfile = await coachprofile.save();
            return res.status(200).json({success: "true", CoachProfile: NoteCoachProfile})
        }
        else{
            return res.status(404).json({error: "Coach Not found with that Id"})
        }
    } catch (error) {
        console.log(error)
    }
}


exports.addCoachEducation = async (req, res, next) => {
    try {
        const {errors, isValid} = validatecoachEducation(req.body)
        if(!isValid)
        {
            return res.json(errors);
        }
        const coachProfileId = req.body.profileid;
        const coachprofile = await CoachesProfiles.findById(coachProfileId);
        if(coachprofile)
        {
            const coacheducation =  {
                id: req.body.id,
                category: req.body.category,
                award: req.body.award
            };
            coachprofile.coachEducation.unshift(coacheducation);
            const CoachProfile = await coachprofile.save();
            return res.status(200).json({success: "true", CoachProfile})
        }
        else{
            return res.status(404).json({error: "Coach Not found with that Id"})
        }
    } catch (error) {
        console.log(error)
    }
}