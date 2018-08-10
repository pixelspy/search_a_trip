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
    queryArrival: '',
    resultsArrival: [],
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

  getQuery() {
    axios.get(`http://www-uat.tictactrip.eu/api/cities/autocomplete/?q=${this.state.query}`)
    // .then(response => console.log(response))
    .then(({data}) => {
      // let fiveFirst = data;
      // console.log('data = ', fiveFirst);
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
  handleClick = (e) => {
    e.preventDefault();
    this.setState({enabledList: true});
    // console.log('clicked')
    this.getPopularCities();
    };



  handleClickBtn = (name, uniqueName, isDeparture) => {
    // isDeparture = props.departure (in Suggestions Child )
      if(isDeparture === true ) {
        this.search.value = name;  // ref of input
        this.setState({
          uniqueName}, () => {
            this.getQueryArrival();
          });
        this.searchDest.focus();
        this.setState({results: []});
        this.setState({titleChanged: true})
      } else {
        this.searchDest.value = name;
      }
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
    };

  handleInputChangeDestination = () => {
      this.setState({
        queryArrival: this.searchDest.value
      }, () => {
        if (this.state.queryArrival && this.state.queryArrival.length > 1) {
          if (this.state.queryArrival.length % 2 === 1) {
            this.getQueryArrival()
          }
        }
      })
    };

  // componentDidMount() {
  //   this.getCities();
  // };

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


            <div className="search_form_left">
              <div className="form_title">Where can we take you?</div>
              <form>
                <div className="search_section_container">
                    <input
                      className="input_field input_in"
                      placeholder="Enter your departure station..."
                      ref={input => this.search = input}
                      onChange={this.handleInputChange}
                      onClick={(e) => this.handleClick(e)}

                    />
                    <input
                      className="input_field input_out"
                      placeholder="Enter your arrival station"
                      ref={input => this.searchDest = input}
                      onChange={this.handleInputChangeDestination}
                      // onClick={(uniqueName) => this.handleClickArr(uniqueName)}

                    />


                </div>
                <div className="search_section_container">
                    <input
                      className="input_field input_depart_in"
                      placeholder="Depart"
                    />
                    <input
                      className="input_field input_depart_out"
                      placeholder="Return"
                    />
                </div>
                <div className="search_section_container">
                  <input
                    className="input_field_travellers input_travellers_icon"
                    placeholder="1 Adult (26-59)"
                  />
                </div>
                <div className="search_btn_content">
                  <a href="" className="lien"><p>Use a discount code</p></a>
                  <button className="btn_search">Search</button>
                </div>
             </form>
            </div>
            <div className="search_form_right">
              <div>

                <div>
                  <div className="form_title">
                    {
                      this.state.titleChanged ? 'Select a Popular Destination' : 'Select a departure station'
                    }

                  </div>
                  { this.state.query ?
                    <ul className="search_list">
                      <Suggestions
                        departure={true}
                        results={this.state.results}
                        handleClickBtn={this.handleClickBtn}
                      />
                    </ul>
                    : <div>
                      {this.state.enabledList &&
                        <ul className="search_list">
                        {cities.map(city => {
                          const { local_name } = city;
                          return (
                              <li className="search_list_item" key={local_name}>
                                <img
                                  className="search_item_icone"
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

              {/* when query is inserted and i handleclick input arrival ==> then top5 destinations suggesions should appear */}

                <div>
                  <Suggestions
                    departure={false}
                    results={this.state.resultsArrival}
                    handleClickBtn={this.handleClickBtn}
                  />
                </div>


                <button className="search_list_btn search_item_icon">VIA</button>

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
