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
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import DateTable from "components/DateTable/DateTable";
import ClassTable from "components/ClassTable/ClassTable";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Class from "@material-ui/icons/Class";
import HowToReg from "@material-ui/icons/HowToReg";
import ShowChart from "@material-ui/icons/ShowChart";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };
  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };
  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };
  render() {
    // const { classes } = this.props;
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <CustomTabs
                title="Filter By: "
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Class",
                    tabIcon: Class,
                    tabContent: <ClassTable />
                  },
                  {
                    tabName: "Date of registration",
                    tabIcon: HowToReg,
                    tabContent: <DateTable type="reg" />
                  },
                  {
                    tabName: "Recent Activity",
                    tabIcon: ShowChart,
                    tabContent: <DateTable type="activity" />
                  }
                ]}
              />
            </MuiPickersUtilsProvider>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

TableList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(TableList);
