//Layout
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import SetAuthToken from "./components/utils/SetAuthToken";
import PrivateRoute from "./private/PrivateRoute";

//Redux
import store from "./store";

//Components
import PlayerProfiles from "./components/playerprofile/PlayerProfiles";
import SinglePlayerProfile from "./components/playerprofile/SinglePlayerProfile";
import AddPlayerProfile from "./components/playerprofile/AddPlayerProfile";
import EditPlayerProfile from "./components/playerprofile/EditPlayerProfile";
import CoachProfiles from "./components/coachprofile/CoachProfiles";
import AddCoachProfile from "./components/coachprofile/AddCoachProfile";
import EditCoachProfile from "./components/coachprofile/EditCoachProfile";
import SingleCoachProfile from "./components/coachprofile/SingleCoachProfile";

//Auth
import Login from "./components/auth/Login"
import ChangePassword from "./components/auth/ChangePassword"

//Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

//NotFound
import NotFound from "./components/layout/NotFound"

function App() {
  if (localStorage.JwtToken) {
    //set auth token as header
    SetAuthToken(localStorage.JwtToken);
    //decode token and get user info
    const decoded = jwt_decode(localStorage.JwtToken);
    //set user  and is Authenticated
    store.dispatch(setCurrentUser(decoded));

    //check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //logout user
      store.dispatch({ type: "CLEAR_PROFILES" });
      store.dispatch(logoutUser());
      //redirect to login
      window.location.href = "/login";
    }
  }
  return (
    <Provider store={store}>
      <HashRouter>
        <Navbar />
        <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/changepassword" component={ChangePassword} exact />
        <PrivateRoute path="/" component={Landing} exact />
        <PrivateRoute path="/playerprofiles" component={PlayerProfiles} exact />
        <PrivateRoute path="/playerprofile/createplayerprofile" component={AddPlayerProfile} exact />
        <PrivateRoute path="/playerprofile/editplayerprofile/:id" component={EditPlayerProfile} exact />
        <PrivateRoute path="/playerprofiles/:id" component={SinglePlayerProfile} exact />
        <PrivateRoute path="/coachesprofiles" component={CoachProfiles} exact />
        <PrivateRoute path="/coachesprofile/createcoachprofile" component={AddCoachProfile} exact />
        <PrivateRoute path="/coachesprofile/editcoachprofile/:id" component={EditCoachProfile} exact />
        <PrivateRoute path="/coachesprofiles/:id" component={SingleCoachProfile} exact />
        <Route component={NotFound}/>
        </Switch>
        <Footer/>
      </HashRouter>
    </Provider>
  );
}

export default App;
