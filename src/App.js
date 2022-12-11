import React, { Component } from "react";

class App extends Component {
  /**
   * Keep the following data as default data in agenda details as it is required for testing
   * [
   *  {
   *    title:"Angular",
   * description:"Some description about the angular",
   * topics:["Introduction","Typescript","Why Angular?","understanding Versions","Fundamentals"]
   * },
   * {
   *    title:"Vue",
   * description:"Some description about the vue",
   * topics:["Introduction","Javascipt","Why Vue?","Vue Bindings","Component Interaction"]
   * },
   * ]
   */

  constructor(props) {
    super(props);
    this.state = {
      ags: [
        {
          title: "Angular",
          description: "Some description about the angular",
          topics: [
            "Introduction",
            "Typescript",
            "Why Angular?",
            "understanding Versions",
            "Fundamentals",
          ],
        },
        {
          title: "Vue",
          description: "Some description about the vue",
          topics: [
            "Introduction",
            "Javascipt",
            "Why Vue?",
            "Vue Bindings",
            "Component Interaction",
          ],
        },
      ],
      title: '',
      description:'',
      topic: '',
      topics: [],
      view: "add",
      errors:{
        title:'',
        description:'',
        topic:''
      }
    };
  }

  validateForm=(errors)=>{
    let valid=true
    Object.values(errors).forEach(val=>val.length>0 && (valid=false));
    return valid;
  }

  handleChange=(event)=>{
    event.preventDefault();
    const {name,value}=event.target
    let errors=this.state.errors
    switch(name){
      case 'title':errors.title=(value.trim() === '' || value.length<=0)?'Title is required':'';
      break;
      case 'description':errors.description=(value.trim() === '' || value.length<=0)?'Description is required':'';
      break;
      case 'topic':errors.topic=(value.trim() ==='' || value.length<=0)?'Topic is required':'';
      break;
      default:break;
    }
    this.setState({errors,[name]:value});
  }

  handleSubmitAgenda = (e) => {
    e.preventDefault();

    this.setState(state=>{
      return{
        ags:[
          ...state.ags,
          {
            title:state.title,
            description:state.description,
            topics:state.topics
          }
        ],
        title: '',
        description:'',
        topic: '',
        topics: [],
        errors:{
          title:'',
          description:'',
          topic:''
        }
      }
    })
  };

  

  handleChangeView = () => {
    this.setState((state) => {
      return {
        view: state.view === "add" ? "view" : "add",
      };
    });
  }

  handleAddNewTopic = (e) => {
    e.preventDefault();
    this.setState((state) => {
      return {
        topics: [...state.topics, state.topic.trim()],
        topic: "",
      };
    });
  };

  render() {
    let topics =
      this.state.topics && this.state.topics.length > 0
        ? this.state.topics.map((topic) => (
            <li className="list-group-item" role="topicList" key={topic}>
              {topic}
            </li>
          ))
        : "";

    return (
      <div>
        <h1 className="mx-5 mb-5">Agenda Manager</h1>

        {/*show/hide this following add agenda template*/}
        {this.state.view && this.state.view === "add" && (
          <div className="container" role="addAgenda">
            <button
              className="btn btn-info"
              role="goToView"
              onClick={this.handleChangeView}
            >
              Click to View Agenda
            </button>
            <form>
              <div className="my-3">
                <label className="form-label">Title</label>
                {/**title */}
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter the title"
                  className="form-control "
                  role="inputTitle"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <small className="text-danger" data-testid="invalidTitle">
                  {/**
                   * show empty string if title input is valid
                   * else show 'Title is required'
                   */}
                   {this.state.errors.title}
                </small>
              </div>
              <div className="my-3">
                <label className="form-label">Description:</label>
                {/** description */}
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the description"
                  className="form-control"
                  role="inputDescription"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <small className="text-danger" data-testid="invalidDescription">
                  {/**
                   * show empty string if description input is valid
                   * else show 'DEscription is required'
                   */}
                  {this.state.errors.description}
                </small>
              </div>
              <div className="my-3 w-50">
                <label className="form-label">Enter topic</label>
                {/*topic*/}
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  placeholder="Enter the topic"
                  className="form-control"
                  role="inputTopic"
                  value={this.state.topic}
                  onChange={this.handleChange}
                />
                <small className="text-danger" data-testid="invalidTopic">
                  {/**
                   * show empty string if topic input is valid
                   * else show 'Topic is required'
                   */}
                   {this.state.errors.topic}
                </small>
              </div>

              {/* on click should add topics and disable the button if invalid topic*/}
              <button
                className="btn btn-success addAlign"
                role="addTopicBtn"
                disabled={this.state.topic===null || this.state.topic.trim()===''}
                onClick={this.handleAddNewTopic}
              >
                {" "}
                + Add Topic
              </button>
              {/* on click should add agenda details and disable the button if invalid input*/}
              <button
                className="btn btn-success submitAlign"
                role="submitAgendaBtn"
                type="submit"
                disabled={!this.validateForm || this.state.topics.length===0}
                onClick={this.handleSubmitAgenda}
              >
                Submit Agenda
              </button>
            </form>

            {/** show if no topics added yet */}
            {this.state.topics.length > 0 ? (
              ""
            ) : (
              <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
                {" "}
                No Topics Added
              </div>
            )}
            {/** display the list of topics added using li */}
            <div className="card-my-3">
              <div className="card-header">Added Topics</div>
              <div className="card-body">
                <ul className="list-group">
                  {topics}
                  {/* <li className="list-group-item" key={topic}></li> */}
                </ul>
              </div>
              <div className="card-footer">Refer the topics you added</div>
            </div>
          </div>
        )}

        {/*show/hide this following view agenda template */}
        {this.state.view === "view" && (
          <div className="container" role="viewAgenda">
            <button
              className="btn btn-info"
              role="goToAdd"
              onClick={this.handleChangeView}
            >
              {" "}
              Click to add agenda
            </button>
            {/**iterate the agenda details to display */}
            {this.state.ags.map((agenda) => (
              <div className="card my-3" key={agenda.title} role="cards">
                <div className="card-header">
                  {/**{title} */}
                  {agenda.title}
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    {/** iterate the topics to display */}
                    {agenda.topics.map((topic) => (
                      <li className="list-group-item" key={topic}>
                        {/**{topic} */}
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  {/** {description} */}
                  {agenda.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
