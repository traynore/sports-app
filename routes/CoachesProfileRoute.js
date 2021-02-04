const router = require("express").Router();
const passport = require("passport");

const {
  createCoachProfile,
  addCurrentGroup,
  addCoachEducation,
} = require("../controllers/coachesProfileController/createCoachesProfile");
const {
  getAllProfiles,
  getCoachProfileById,
  getCoachProfileByUniqueID,
} = require("../controllers/coachesProfileController/getCoachProfile");
const {
  deleteCoachProfile,
  deletecoachEducation,
  deletecurrentGroup,
} = require("../controllers/coachesProfileController/deleteCoachProfile");
const {
  updateCoachProfile,
} = require("../controllers/coachesProfileController/updateCoachProfile");

//Get Coaches Profiles
router
  .route("/routes/api/coachprofile/all")
  .get(passport.authenticate("jwt", { session: false }), getAllProfiles);

//Get Single Coach Profile;
router
  .route("/routes/api/coachprofile/:id")
  .get(passport.authenticate("jwt", { session: false }), getCoachProfileById);

//Get Single Coach Profile by unique ID
router
  .route("/routes/api/coachprofile/handle/:unique_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    getCoachProfileByUniqueID
  );

//Create Coach Profile
router
  .route("/routes/api/coachprofile/createcoachprofile")
  .post(passport.authenticate("jwt", { session: false }), createCoachProfile);
router
  .route("/routes/api/coachprofile/currentgroup")
  .post(passport.authenticate("jwt", { session: false }), addCurrentGroup);
router
  .route("/routes/api/coachprofile/coacheducation")
  .post(passport.authenticate("jwt", { session: false }), addCoachEducation);

//Edit Coach Profile
router
  .route("/routes/api/coachprofile/:id")
  .put(passport.authenticate("jwt", { session: false }), updateCoachProfile);

//Delete Coach Profile
router
  .route("/routes/api/coachprofile/:id")
  .delete(passport.authenticate("jwt", { session: false }), deleteCoachProfile);
router
  .route("/routes/api/coachprofiless/deletecurrentgroup")
  .patch(passport.authenticate("jwt", { session: false }), deletecurrentGroup);
router
  .route("/routes/api/coachprofiless/deletecurrenteducation")
  .patch(
    passport.authenticate("jwt", { session: false }),
    deletecoachEducation
  );

module.exports = router;
