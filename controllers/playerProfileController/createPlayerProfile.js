const PlayerProfiles = require("../../modals/PlayerProfiles");

//Validation
const ValidatePlayerProfile = require("../../validation/PlayerProfileValidate")
const validateplayerMedicalNotes = require("../../validation/validateplayerMedicalNotes");
const validateplayerNotes = require("../../validation/validateplayerNotes");

exports.createPlayerProfile = async (req, res, next) => {
    try {
        const {errors, isValid} = ValidatePlayerProfile(req.body);
        if(!isValid)
        {
            return res.status(400).json(errors);
        }
        const playerProfile = {
            name: req.body.name,
            dateofbirth: req.body.dateofbirth,
            age: req.body.age,
            unique_id: req.body.unique_id,
            currentGroup: req.body.currentGroup,
            imgUrl: req.body.imgUrl,
            contactNO: req.body.contactNO
        }

        playerProfile.parents = {}
        if(req.body.mother) playerProfile.parents.mother = req.body.mother;
        if (req.body.father) playerProfile.parents.father = req.body.father;

        const profileFound = await PlayerProfiles.findOne({unique_id: req.body.unique_id});
        if(!profileFound)
        {
            let newplayerProfile = await new PlayerProfiles(playerProfile).save();
            return res.json(newplayerProfile)
            next()
        }
        else{
            return res.status(400).json({error: "A Player Exists with that unique_id please try another one."})
        }
    } catch (error) {
        console.log(error)
    }
}


exports.addPlayerNote = async (req, res, next) => {
    try {
        const {errors, isValid} = validateplayerNotes(req.body)
        if(!isValid)
        {
            return res.json(errors);
        }
        const PlayerProfileId = req.body.profileid;
        const playerprofile = await PlayerProfiles.findById(PlayerProfileId);
        if(playerprofile)
        {
            const playerNote = {
                id: req.body.id,
                playerNote: req.body.playerNote
            };
            playerprofile.playerNotes.unshift(playerNote);
            const NotePlayerProfile = await playerprofile.save();
            return res.status(200).json({success: "true", PlayerProfile: NotePlayerProfile})
        }
        else{
            return res.status(404).json({error: "Player Not found with that Id"})
        }
    } catch (error) {
        console.log(error)
    }
}


exports.addPlayerMedicalNote = async (req, res, next) => {
    try {
        const {errors, isValid} = validateplayerMedicalNotes(req.body)
        if(!isValid)
        {
            return res.json(errors);
        }
        const PlayerProfileId = req.body.profileid;
        const playerprofile = await PlayerProfiles.findById(PlayerProfileId);
        if(playerprofile)
        {
            const playerMedicalNote =  {
                id: req.body.id,
                playerMedicalNote: req.body.playerMedicalNote
            };
            playerprofile.medicalNotes.unshift(playerMedicalNote);
            const MedicalNotePlayerProfile = await playerprofile.save();
            return res.status(200).json({success: "true", MedicalNotePlayerProfile})
        }
        else{
            return res.status(404).json({error: "Player Not found with that Id"})
        }
    } catch (error) {
        console.log(error)
    }
}