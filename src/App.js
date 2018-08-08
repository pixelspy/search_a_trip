import React, { Component } from 'react';
import axios from 'axios';
import Suggestions from './components/Suggestions';
import Button from './components/button';

import logo from './img/TL_Logo_White.png';

class App extends Component {
  state = {
    cities: [],
    query: '',
    results: [],
    queryDest: '',
    resultsDest: []
  };

  getCities() {
    axios
      .get("http://www-uat.tictactrip.eu/api/cities/popular/5")
      // .then(response => console.log(response))
      .then(response =>
        response.data.map(city => ({
          local_name: `${city.local_name}`
        }))
      ).then(cities => {
        this.setState({
          cities
        });
      })
      .catch(error => this.setState({error}));
  };

  getQuery() {
    axios.get(`http://www-uat.tictactrip.eu/api/cities/autocomplete/?q=${this.state.query}`)
    // .then(response => console.log(response))
    .then(({data}) => {
      this.setState({
        results: data
      })
    })
  };
  getQueryDestination() {
    axios.get(`http://www-uat.tictactrip.eu/api/cities/popular/from/${this.state.queryDest}/5`)
    // .then(response => console.log(response))
    .then(({data}) => {
      this.setState({
        resultsDest: data
      })
    })
    console.log(`http://www-uat.tictactrip.eu/api/cities/popular/from/${this.state.queryDest}/5`)
  };

  handleInputChange = () => {
      this.setState({
        query: this.search.value
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getQuery()
          }
        }
      })
    }

  handleInputChangeDestination = () => {
      this.setState({
        queryDest: this.searchDest.value
      }, () => {
        if (this.state.queryDest && this.state.queryDest.length > 1) {
          if (this.state.queryDest.length % 2 === 1) {
            this.getQueryDestination()
          }
        }
      })
    };

  componentDidMount() {
    this.getCities();
  };

  render() {

    const { cities } = this.state;
    return (
      <div className="app">
        <div className="cover_image">
          <div className="app_header">
            <div className="header">
                <img className="header_logo" src={logo} alt="TL Logo"/>
                <div className="header_account">
                  <Button text="CREATE ACCOUNT" />
                  <Button text="SIGN IN" />
                  <p className="header_text">UK RAIL</p>
                  <p className="header_text">help</p>
                </div>
            </div>
          </div>

          <div className="app_body">
            <h1 className="home_title">European trains and buses at your fingertips.</h1>
            <h2 className="home_subtitle">Travel with Trainline, the independent leader in train and bus ticket sales throughout Europe.</h2>
          <div className="search_content">
            <div className="search_form">
              <div>Where can we take you?</div>
              <form>
               <input
                 placeholder="Search for..."
                 ref={input => this.search = input}
                 onChange={this.handleInputChange}
               />
             </form>
             {/* <Suggestions results={this.state.results} /> */}
            </div>
          </div>

          </div>

          {/* <div>
            <h2>Top 5 Cities</h2>
            {cities.map(city => {
              const { local_name } = city;
              return (
                <div key={local_name}>{local_name}</div>
              );
            })}
          </div>
          <div>
            <h2>Popular Destinations</h2>
            <form>
              <input
                placeholder="Go to ..."
                ref={input => this.searchDest = input}
                onChange={this.handleInputChangeDestination}
              />
              {/* <p>{this.state.queryDest}</p> */}
            {/* </form>
            <Suggestions results={this.state.resultsDest} />
          </div>  */}

        </div>
      </div>
    );
  }
}

export default App;
