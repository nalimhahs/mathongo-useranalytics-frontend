import React, { Component } from "react";

import styled from "styled-components";

import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Paginations from "components/Pagination/Pagination.jsx";

import axios from "axios";

import { DatePicker } from "@material-ui/pickers";

const Wrapper = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-evenly;
`;

export default class DateTable extends Component {
  state = {
    data: [],
    startDate: new Date(),
    endDate: new Date(),
    page: 1
  };

  BASE_URL =
    "http://ec2-13-235-74-15.ap-south-1.compute.amazonaws.com/api/filter/" +
    this.props.type;

  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };

  json2array = json => {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key) {
      result.push(json[key]);
    });
    return result;
  };

  handleFetch = () => {
    var start =
      this.state.startDate.getFullYear() +
      "-" +
      this.state.startDate.getMonth() +
      "-" +
      this.state.startDate.getDate();

    var end =
      this.state.endDate.getFullYear() +
      "-" +
      this.state.endDate.getMonth() +
      "-" +
      this.state.endDate.getDate();
    axios
      .get(this.BASE_URL, {
        params: {
          start: start,
          end: end,
          page: this.state.page
        }
      })
      .then(response => {
        var data = [];
        response.data.map(json => {
          data.push(this.json2array(json));
        });
        this.setState({ data: data });
      });
  };

  handlePageChange = page => {
    this.setState({ page: page }, () => {
      this.handleFetch();
    });
  };

  handlePageNext = () => {
    this.handlePageChange(this.state.page + 1);
  };

  handlePagePrev = () => {
    if (this.state.page > 1) {
      this.handlePageChange(this.state.page - 1);
    }
  };

  setPageNumber = num => {
    if (num < 1) {
      return null;
    } else if (num === this.state.page) {
      return {
        text: num,
        active: true,
        onClick: () => {
          return;
        }
      };
    } else {
      return {
        text: num,
        onClick: () => {
          this.setState({ page: num }, () => {
            this.handleFetch();
          });
        }
      };
    }
  };

  setPagination = () => {
    var pages = [{ text: "PREV", onClick: this.handlePagePrev }];
    for (let i = -2; i <= 2; i++) {
      var page = this.handlePageChange(this.state.page + i);
      if (page === null) {
        continue;
      }
      pages.push(page);
    }
    pages.push({ text: "NEXT", onClick: this.handlePageNext });
    return pages;
  };

  render() {
    return (
      <div>
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
          <Button type="button" color="primary" onClick={this.handleFetch}>
            Fetch
          </Button>
        </Wrapper>
        <Table
          tableHeaderColor="primary"
          tableHead={[
            "Name",
            "Email",
            "Class",
            "Mobile Number",
            "Location",
            "Last Active",
            "Registeration Date"
          ]}
          tableData={this.state.data}
        />
        <Wrapper>
          <Paginations
            pages={[
              { text: "PREV", onClick: this.handlePagePrev },
              this.setPageNumber(this.state.page),
              this.setPageNumber(this.state.page + 1),
              this.setPageNumber(this.state.page + 2),
              this.setPageNumber(this.state.page + 3),
              this.setPageNumber(this.state.page + 4),
              { text: "NEXT", onClick: this.handlePageNext }
            ]}
          />
        </Wrapper>
      </div>
    );
  }
}
