import React, { Component } from "react";

import styled from "styled-components";

import Button from "components/CustomButtons/Button.jsx";
import TextField from "@material-ui/core/TextField";
import ChartistGraph from "react-chartist";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import axios from "axios";

import { DatePicker } from "@material-ui/pickers";

var Chartist = require("chartist");

const Wrapper = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const chartProps = {
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  // for animation
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * 80,
            dur: 500,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

export default class DateTable extends Component {
  state = {
    data: {},
    startDate: new Date(),
    endDate: new Date(),
    step: 7,
    chartProps: chartProps
  };

  componentDidMount = () => {
    var d = new Date();
    d.setDate(d.getDate() - this.state.step);
    this.setState({ startDate: d }, () => {
      this.handleFetch();
    });
  };

  BASE_URL =
    "http://ec2-13-235-74-15.ap-south-1.compute.amazonaws.com/api/filter/" + this.props.type;
    // "http://localhost:8000/api/charts/" + this.props.type;

  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };

  handleFetch = () => {
    var start =
      this.state.startDate.getFullYear() +
      "-" +
      (this.state.startDate.getMonth() + 1) +
      "-" +
      this.state.startDate.getDate();

    var end =
      this.state.endDate.getFullYear() +
      "-" +
      (this.state.endDate.getMonth() + 1) +
      "-" +
      this.state.endDate.getDate();
    axios
      .get(this.BASE_URL, {
        params: {
          start: start,
          end: end,
          step: this.state.step
        }
      })
      .then(response => {
        var ModChartProps = this.state.chartProps;
        ModChartProps.options.high = Math.max(...response.data.series[0]) * 1.2;
        this.setState({ data: response.data, chartProps: ModChartProps });
        console.log(this.props.type)
        console.log(this.state.data)
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridItem xs={12} sm={12} md={6}>
        <Card chart>
          <CardHeader color={this.props.color}>
            <ChartistGraph
              // className="ct-chart"
              data={this.state.data}
              type="Line"
              options={this.state.chartProps.options}
              // responsiveOptions={chartProps.responsiveOptions}
              listener={this.state.chartProps.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>{this.props.title}</h4>
            <p className={classes.cardCategory}>{this.props.subTitle}</p>
          </CardBody>
          <CardFooter chart>
            <Wrapper>
              <DatePicker
                label="Start Date:"
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
              />
              <DatePicker
                label="End Date:"
                value={this.state.endDate}
                onChange={this.handleEndDateChange}
              />
              <TextField
                id="standard-name"
                label="Data Points"
                value={this.state.step}
                onChange={event => {
                  this.setState({ step: event.target.value });
                }}
              />
              <Button type="button" color="primary" onClick={this.handleFetch}>
                Fetch
              </Button>
            </Wrapper>
          </CardFooter>
        </Card>
      </GridItem>
    );
  }
}
