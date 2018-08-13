import React, { Component } from 'react';
import axios from 'axios';
import Suggestions from './components/Suggestions';
import Button from './components/button';

import logo from './img/TL_Logo_White.png';

// TRIANGLE ANIM
class App extends Component {
  state = {
    cities: [],
    query: '',                        // query Search for the Departure
    results: [],                      // results for the Departure query
    queryArrival: '',                 // query Search for the Arrival
    resultsArrival: [],               // results for the Top 5 Arrival query
    enabledList: false,               // for list of Popular Destination
    uniqueName: '',                   // for Get Query Arrival Suggestions
    titleChanged: false               // for Title on Right Panel List
  };


  getPopularCities() {
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

  getQueryDest() {
    axios.get(`http://www-uat.tictactrip.eu/api/cities/autocomplete/?q=${this.state.query}`)
    // .then(response => console.log(response))
    .then(({data}) => {
      this.setState({
        results: data.slice(0, 6)
      })
    })
  };

  getQueryArrival() {
    axios.get(`http://www-uat.tictactrip.eu/api/cities/popular/from/${this.state.uniqueName}/5`)
    // .then(response => console.log(response))
    .then(({data}) => {
      this.setState({
        resultsArrival: data
      })
    })
    // console.log(`http://www-uat.tictactrip.eu/api/cities/popular/from/${this.state.queryArrival}/5`)
  };


  // List of popular cities On Click
  handleClick = (e, local_name) => {
    e.preventDefault();
    this.setState({enabledList: true});
    console.log('1st input clicked')
    this.getPopularCities();
    };

  handleClickOut = (e) => {
    e.preventDefault();
    console.log('2nd input clicked')
  }
  handleClickDepart = (e) => {
    e.preventDefault();
    console.log('3rd input clicked')
  }
  handleClickReturn = (e) => {
    e.preventDefault();
    console.log('4th input clicked')
  }

  handleClickBtn = (name, uniqueName, isDeparture) => {
    // isDeparture = props.departure (in Suggestions Child )

    // 1° Location in the list has been clicked
      if(isDeparture === true ) {
    // 2° Change input form to the value of the Location from the list
        this.search.value = name;  // ref of input
        this.setState({
    // 3° change the unique_name of the API URL to start query of Top Arrivals
          uniqueName}, () => {
            this.getQueryArrival();
          });
    // 4° Change the focus of the input to the Arrival input
        this.searchArr.focus();
    // 5° Make the Departure List disappear
        this.setState({results: []});
    // 6° Change the title of the List
        this.setState({titleChanged: true})
      } else {
    // 7° Fill up form input to the selected Location from list
        this.searchArr.value = name;
      }
  };

  handleInputChange = () => {
      this.setState({
        query: this.search.value
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getQueryDest()
          }
        }
      })
    };

  handleInputChangeDestination = () => {
      this.setState({
        queryArrival: this.searchArr.value
      }, () => {
        if (this.state.queryArrival && this.state.queryArrival.length > 1) {
          if (this.state.queryArrival.length % 2 === 1) {
            this.getQueryArrival()
          }
        }
      })
    };

  render() {

    const { cities, titleChanged, query, results, resultsArrival, enabledList } = this.state;

    return (
      <div className="app">
        <div className="coverImage">
          <div className="appHeader">
            <div className="header">
                <img className="headerLogo" src={logo} alt="TL Logo"/>
                <div className="headerAccount">
                  <Button text="CREATE ACCOUNT" />
                  <Button text="SIGN IN" />
                  <p className="headerText">UK RAIL</p>
                  <p className="headerText">help</p>
                </div>
            </div>
          </div>

          <div>
            <h1 className="homeTitle">European trains and buses at your fingertips.</h1>
            <h2 className="homeSubtitle">Travel with Trainline, the independent leader in train and bus ticket sales throughout Europe.</h2>
            <span className="mobileText">Trainline works even better when you use the app.</span>
            <div className="mobileBadges">
              <img src="https://assets.trainline.eu/assets/images/open-home/en/google_play-3380d3b732c0b49bde83314d15ee2c7b.svg" alt="Google Play Badge"/>
              <img src="https://assets.trainline.eu/assets/images/open-home/en/app_store-8bab50976228b57b171b916a98ddfd11.svg" alt="App Store Badge"/>
            </div>
            <span className="mobileTextLink">Or visit our mobile site.</span>
          <div className="searchContent">


            <div className="searchFormLeft">
              <div className="formTitle">Where can we take you?</div>
              <form>
                <div className="searchSectionContainer">
                    <input
                      className="inputField inputIn"
                      placeholder="Enter your departure station..."
                      ref={input => this.search = input}
                      onChange={this.handleInputChange}
                      onClick={(e) => this.handleClick(e)}
                    />
                    <input
                      className="inputField inputOut"
                      placeholder="Enter your arrival station"
                      ref={input => this.searchArr = input}
                      onChange={this.handleInputChangeDestination}
                      onClick={(e) => this.handleClickOut(e)}
                    />
                </div>

                <div className="searchSectionContainer">
                    <input
                      className="inputField inputDepartIn"
                      placeholder="Depart"
                      onClick={(e) => this.handleClickDepart(e)}
                    />
                    <input
                      className="inputField inputDepartOut"
                      placeholder="Return"
                      onClick={(e) => this.handleClickReturn(e)}

                    />
                </div>
                <div className="searchSectionContainer">
                  <input
                    className="inputFieldTravellers inputTravellersIcon"
                    placeholder="1 Adult (26-59)"
                  />
                </div>
                <div className="searchBtnContent">
                  <a href="" className="lien"><p>Use a discount code</p></a>
                  <button className="btnSearch">Search</button>
                </div>
             </form>
            </div>
            <div className="searchFormRight">
              <div className="triangle"></div>
              <div>
                <div>
                  <div className="formTitle">
                    {
                      titleChanged ? 'Select a Popular Destination' : 'Select a departure station'
                    }
                  </div>
                  { query ?
                    <ul className="searchList">
                      <Suggestions
                        departure={true}
                        results={results}
                        handleClickBtn={this.handleClickBtn}
                      />
                    </ul>
                    : <div>
                        {enabledList &&
                          <ul className="searchList">
                          {cities.map(city => {
                            const { local_name } = city;
                            return (
                                <li className="searchListItem" key={local_name}>
                                  <img
                                    className="searchItemIcone"
                                    src="https://assets.trainline.eu/assets/images/location-5632039ea0e607c803bc503fba864f35.svg"
                                    alt="logo"/>
                                  {local_name}
                                </li>
                              );
                            })}
                          </ul>
                        }
                      </div>
                    }
                </div>
                <div>
                  <Suggestions
                    departure={false}
                    results={resultsArrival}
                    handleClickBtn={this.handleClickBtn} />
                </div>
                <button className="searchListBtn searchItemIcon">VIA</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
