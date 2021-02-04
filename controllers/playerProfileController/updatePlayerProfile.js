const PlayerProfiles = require("../../modals/PlayerProfiles");

//Validation
const ValidatePlayerProfile = require("../../validation/PlayerProfileValidate")
const validateplayerMedicalNotes = require("../../validation/validateplayerMedicalNotes");
const validateplayerNotes = require("../../validation/validateplayerNotes");

exports.updatePlayerProfile = async (req, res, next) => {
    try {
        // const {errors, isValid} = ValidatePlayerProfile(req.body);
        // if(!isValid)
        // {
        //     return res.json(errors);
        // }
        const {id} = req.params;
        const playerprofile = await PlayerProfiles.findById(id)
        if(playerprofile)
        {
            const updatePlayerProfile = {
            name: req.body.name ? req.body.name : playerprofile.name,
            dateofbirth: req.body.dateofbirth ? req.body.dateofbirth : playerprofile.dateofbirth,
            age: req.body.age ? req.body.age : playerprofile.age,
            unique_id: req.body.unique_id ? req.body.unique_id : playerprofile.unique_id,
            currentGroup: req.body.currentGroup ? req.body.currentGroup : playerprofile.currentGroup,
            imgUrl: req.body.imgUrl ? req.body.imgUrl : playerprofile.imgUrl,
            contactNO: req.body.contactNO ? req.body.contactNO : playerprofile.contactNO
            }

            updatePlayerProfile.parents = {}
            req.body.mother ? updatePlayerProfile.parents.mother = req.body.mother : updatePlayerProfile.parents.mother = playerprofile.parents.mother
            req.body.father ? updatePlayerProfile.parents.father = req.body.father : updatePlayerProfile.parents.father = playerprofile.parents.father

            let updatedPlayerProfile = await playerprofile.updateOne({$set: updatePlayerProfile})
            // console.log(updatedPlayerProfile)
            return res.status(200).json({success: "true", msg: "Player Profile was updated successfully"})
        }
        else{
            return res.status(400).json({error: "There was an error, Could not update the Player Profile"})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}


exports.updatePlayerNote = async (req, res, next) => {
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
            let PlayerNoteIndex = playerprofile.playerNotes.map(item => item.id).indexOf(playerNote.id)
           if(PlayerNoteIndex !== -1)
           {
              
                //let playerNotes = await playerprofile.playerNotes;
               playerprofile.playerNotes[PlayerNoteIndex].playerNote = playerNote.playerNote;
               const NotePlayerProfile = await playerprofile.save();
               return res.status(200).json({success: "true", PlayerProfile :NotePlayerProfile})
           }
        }
        else{
            return res.status(404).json({error: "Player Not found with that Id"})
        }
        
    } catch (error) {
        console.log(error)
    }
}


exports.updatePlayerMedicalNote = async (req, res, next) => {
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
            const playerMedicalNote = {
                id: req.body.id,
                playerMedicalNote: req.body.playerMedicalNote
            };
            let PlayerMedicalNoteIndex = playerprofile.medicalNotes.map(item => item.id).indexOf(playerMedicalNote.id)
           if(PlayerMedicalNoteIndex !== -1)
           {
              
                //let playerNotes = await playerprofile.playerNotes;
               playerprofile.medicalNotes[PlayerMedicalNoteIndex].playerMedicalNote = playerMedicalNote.playerMedicalNote;
               const NotePlayerProfile = await playerprofile.save();
               return res.status(200).json({success: "true", PlayerProfile : NotePlayerProfile})
           }
        }
        else{
            return res.status(404).json({error: "Player Not found with that Id"})
        }

    }
    catch(error)
    {
        console.log(error)
    }
}