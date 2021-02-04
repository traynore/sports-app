const PlayerProfiles = require("../../modals/PlayerProfiles");

exports.deletePlayerProfile = async (req, res, next) => {
    try {
        const {id} = req.params;
        const playerprofile = await PlayerProfiles.findByIdAndRemove(id)
        if(playerprofile){
            return res.status(200).json({success: "true", msg: "Player Profile was deleted successfully"})
        }
        else{
            return res.status(400).json({error: "Could not delete the Player Profile, Player Profile not found."})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

exports.deletePlayerNote = async (req, res, next) => {
    try {
        const PlayerProfileId = req.body.profileid;
        const playerprofile = await PlayerProfiles.findById(PlayerProfileId);
        if(playerprofile)
        {
            const playerNoteid = req.body.id
                
            let PlayerNoteIndex = playerprofile.playerNotes.map(item => item.id).indexOf(playerNoteid)
            //console.log(playerprofile.playerNotes)
           if(PlayerNoteIndex !== -1)
           {
              
                //let playerNotes = await playerprofile.playerNotes;
               playerprofile.playerNotes.splice(PlayerNoteIndex, 1)
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


exports.deletePlayerMedicalNote = async (req, res, next) => {
    try {

        const PlayerProfileId = req.body.profileid;
        const playerprofile = await PlayerProfiles.findById(PlayerProfileId);
        if(playerprofile)
        {
            const playerMedicalNoteid = req.body.id
                
            let PlayerMedicalNoteIndex = playerprofile.medicalNotes.map(item => item.id).indexOf(playerMedicalNoteid)
            //console.log(playerprofile.playerNotes)
           if(PlayerMedicalNoteIndex !== -1)
           {
              
                //let playerNotes = await playerprofile.playerNotes;
               playerprofile.medicalNotes.splice(PlayerMedicalNoteIndex, 1)
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