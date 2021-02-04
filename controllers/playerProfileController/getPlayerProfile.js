const PlayerProfiles = require("../../modals/PlayerProfiles");

exports.getAllProfiles = async (req, res, next) => {
    try {
        const playerprofiles = await PlayerProfiles.find();
        if(playerprofiles.length > 0)
        {
            return res.status(200).json({success: "true", playerprofiles})
        }
        else{
            return res.status(404).json({error: "No Player Profiles Found"})
        }

        next()
        
    } catch (error) {
        console.log(error)
    }
}

exports.getPlayerProfileById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const playerprofile = await PlayerProfiles.findById(id);
        if(playerprofile){
            return res.status(200).json({success: "true", playerprofile})
        }
        else{
            return res.status(404).json({error: "No Player Profile found with that ID"})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}


exports.getPlayerProfileByUniqueID = async (req, res, next) => {
    try {
        const {unique_id} = req.params;
        console.log(unique_id)
        const playerprofile = await PlayerProfiles.findOne({unique_id: unique_id})
        if(playerprofile){
            return res.status(200).json({success: "true", playerprofile})
        }
        else{
            return res.status(404).json({error: "No Player Profile found with that ID"})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}