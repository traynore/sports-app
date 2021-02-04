const router = require("express").Router();
const passport = require("passport");

const {
  createPlayerProfile,
  addPlayerNote,
  addPlayerMedicalNote,
} = require("../controllers/playerProfileController/createPlayerProfile");
const {
  getAllProfiles,
  getPlayerProfileByUniqueID,
  getPlayerProfileById,
} = require("../controllers/playerProfileController/getPlayerProfile");
const {
  deletePlayerProfile,
  deletePlayerNote,
  deletePlayerMedicalNote,
} = require("../controllers/playerProfileController/deletePlayerProfile");
const {
  updatePlayerProfile,
  updatePlayerNote,
  updatePlayerMedicalNote,
} = require("../controllers/playerProfileController/updatePlayerProfile");

//Get Player Profiles
router
  .route("/routes/api/playerprofile/all")
  .get(passport.authenticate("jwt", { session: false }), getAllProfiles);

//Get Single Player Profile;
router
  .route("/routes/api/playerprofile/:id")
  .get(passport.authenticate("jwt", { session: false }), getPlayerProfileById);

//Get Single Player Profile by unique ID
router
  .route("/routes/api/playerprofile/handle/:unique_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    getPlayerProfileByUniqueID
  );

//Create Player Profile
router
  .route("/routes/api/playerprofile/createplayerprofile")
  .post(passport.authenticate("jwt", { session: false }), createPlayerProfile);
router
  .route("/routes/api/playerprofile/playernote")
  .post(passport.authenticate("jwt", { session: false }), addPlayerNote);
router
  .route("/routes/api/playerprofile/medicalnote")
  .post(passport.authenticate("jwt", { session: false }), addPlayerMedicalNote);

//Edit Player Profile
router
  .route("/routes/api/playerprofile/:id")
  .put(passport.authenticate("jwt", { session: false }), updatePlayerProfile);
router
  .route("/routes/api/playerprofile/updateplayernote")
  .patch(passport.authenticate("jwt", { session: false }), updatePlayerNote);
router
  .route("/routes/api/playerprofile/updateplayermedicalnote")
  .patch(
    passport.authenticate("jwt", { session: false }),
    updatePlayerMedicalNote
  );

//Delete Player Profile
router
  .route("/routes/api/playerprofile/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    deletePlayerProfile
  );
router
  .route("/routes/api/playerprofiless/deleteplayernote")
  .patch(passport.authenticate("jwt", { session: false }),
  deletePlayerNote)
router
  .route("/routes/api/playerprofiless/deleteplayermedicalnote")
  .patch(
    passport.authenticate("jwt", { session: false }),
    deletePlayerMedicalNote
  );

module.exports = router;
