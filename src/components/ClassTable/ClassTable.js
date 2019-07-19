import React, { Component } from "react";

import styled from "styled-components";

import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Paginations from "components/Pagination/Pagination.jsx";

import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import axios from "axios";

const Wrapper = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-evenly;
`;

export default class ClassTable extends Component {
  state = {
    data: [],
    class: "O",
    page: 1
  };

  BASE_URL =
    "http://ec2-13-235-74-15.ap-south-1.compute.amazonaws.com/api/filter/class";

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
    axios
      .get(this.BASE_URL, {
        params: {
          c: this.state.class,
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
          this.handlePageChange(num);
        }
      };
    } else {
      return {
        text: num,
        onClick: () => {
          this.handlePageChange(num);
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

  handleChange = event => {
    this.setState({ class: event.target.value });
  };

  render() {
    return (
      <div>
        <Wrapper>
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
            <Select
              value={this.state.class}
              onChange={this.handleChange}
              input={<FilledInput name="age" id="filled-age-simple" />}
            >
              <MenuItem value={"O"}>Other</MenuItem>
              <MenuItem value={"D"}>Dropper</MenuItem>
              <MenuItem value={"11"}>Class 11</MenuItem>
              <MenuItem value={"12"}>Class 12</MenuItem>
            </Select>
          </FormControl>
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
