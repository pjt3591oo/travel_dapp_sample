import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";

import QrDisplay from "../pages/qrDisplay";
import Payment from "../pages/payment";
import Reservation from "../pages/reservation";
import ReservationSearch from "../pages/reservationSearch";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/qr/display" component={QrDisplay} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/reservation" component={Reservation} />
        <Route exact path="/reservation/search" component={ReservationSearch} />
      </Switch>
    </Router>
  )
}

export default Routes;