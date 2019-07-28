/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import axios from "axios";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import CardFooter from "components/Card/CardFooter.jsx";

import DateChart from "components/DateChart/DateChart.js";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

class Dashboard extends React.Component {
  state = {
    isLoading: true,
    data: {}
  };

  componentDidMount = () => {
    this.handleFetch();
  };

  handleFetch = () => {
    this.setState({ isLoading: true });
    var BASE_URL =
      "http://ec2-13-235-74-15.ap-south-1.compute.amazonaws.com/api/";
      // "http://localhost:8000/api/";
    axios.get(BASE_URL).then(response => {
      this.setState({ data: response.data });
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.isLoading ? (
          <Wrapper>
            <h3>Please Wait...</h3>
          </Wrapper>
        ) : (
          <>
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="primary" stats icon>
                    <CardIcon color="primary">
                      <Icon>today</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Users</p>
                    <h3 className={classes.cardTitle}>
                      {this.state.data.total}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Total Registered Users
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>today</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Active Today</p>
                    <h3 className={classes.cardTitle}>
                      {this.state.data.dailyActive}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Users Active Today
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Icon>view_day</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Monthly Active</p>
                    <h3 className={classes.cardTitle}>
                      {this.state.data.monthlyActive}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Last 30 Days
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Icon>today</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Registrations today</p>
                    <h3 className={classes.cardTitle}>
                      {this.state.data.dailyReg}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      User Registrations today
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Icon>view_day</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>
                      Registrations this month
                    </p>
                    <h3 className={classes.cardTitle}>
                      {this.state.data.monthlyReg}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Last 30 Days
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <GridContainer>
                <DateChart
                  type="reg"
                  classes={classes}
                  title="User Registration"
                  subTitle="Users registering in day"
                  color="success"
                />
                <DateChart
                  type="activity"
                  classes={classes}
                  title="User Activity"
                  subTitle="Users active in day"
                  color="primary"
                />
              </GridContainer>
            </MuiPickersUtilsProvider>
          </>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
