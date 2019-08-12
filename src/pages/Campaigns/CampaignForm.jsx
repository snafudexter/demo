import React, {Component} from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Alert from 'react-s-alert';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class CampaignForm extends Component {
    constructor(){
        super();
        this.state={
            creator:'',
            selectedOption: '',
            selectedOptionClu:'',
            startDates: moment(),
            startDate: moment().format(),
            urgent: false
        }
    }

    addCampaign(){

    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      }
      handleClusterChange = (selectedOptionClu) => {
        this.setState({ selectedOptionClu });
      }
    handleDateChange(date){
     this.setState({
         startDate:date
     })
    }
    handleFormSubmit = () => {
      let error = false;

      if(!this.state.type){
        Alert.error('Select Type !', {
          position: 'top-right',
          effect: 'slide'
        });
        error = true;
      }

      if(!this.state.campaignName || this.state.campaignName === '')
      {
        Alert.error('Campaign name can not be empty !', {
          position: 'top-right',
          effect: 'slide'
        });
        error = true;
      }

      if(!error)
      {
        let d = {
          creatorId: this.props.user.id,
          description: this.state.description,
          name: this.state.campaignName,
          type: this.state.type.value,
          urgent: this.state.urgent
        }
        this.props.addCampaign({variables: d})
          .then(response => {
            Alert.info('Campaign Added!', {
              position: 'top-right',
              effect: 'slide'
            });

            this.props.history.push('/branding/upload/'+response.data.addCampaign.id)
          })
          .catch(e => {
            Alert.error(e.message, {
              position: 'top-right',
              effect: 'slide'
            });
          })
        }
    }

 

    renderTypeSelection()
    {
      if(!this.state.type)
      if(!this.props.loading)
      if(this.props.user.type)
      {
        if(this.props.types)
          this.setState({type: this.props.types.filter(p => p.label === this.props.user.type.name)[0]})
      }
    }

    

  render() {
    if (this.props.loading) {
      return (
        <div className="loader"><div></div></div>
      );
    }
    this.renderTypeSelection();
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <div id="main-container">
           <div className="content">
            <div>
             <div className="row">
             <div className="block" style={{width:'70%',margin:'0 auto'}}>
             <div className="block-content">
               <form onSubmit={(e)=>{e.preventDefault();this.addCampaign();}}>
               <div className="form-group">
               <label htmlFor="example-nf-email">Creator</label>
               <input className="form-control" disabled placeholder={this.props.user.name} />
               </div>
                 <div className="form-group ">
                   <label htmlFor="example-nf-email">Types</label>
                   <Select
                    disabled={(this.props.user.type)?true: false}
                    name="form-field-name"
                    value={this.state.type}
                    onChange={v => this.setState({type:v})}
                    options={this.props.types}
                  />
                 </div>
      
                 
                
                 <div className="form-group">
                   <label htmlFor="example-nf-email">Campaign</label>
                   <input className="form-control"  onChange={e=>this.setState({campaignName:e.target.value})}  placeholder="Campaign Name..." />
                 </div>
                 <div className="form-group">
                   <label htmlFor="example-nf-email">Special Description</label><br/>
                   <textarea  rows={5} cols={18} style={{width: '100%'}}  onChange={e=>this.setState({description:e.target.value})}/>
                 </div>
                 <div class="checkbox">
                    <label><input type="checkbox" onChange={e=>this.setState({urgent:e.target.checked})} />Urgent</label>
                 </div>
                 <div className="form-group">
                   <button type="button" className="btn btn-alt-primary" onClick={this.handleFormSubmit.bind(this)}>Create Campaign</button>
                 </div>
               </form>
             </div>
           </div>

             </div>
            </div>
           </div>
          </div>

        </div>
      </div>
    )
  }
}

const ADD_CAMPAIGN = gql `
mutation addCampaign( $creatorId: ID!,  $name: String!, $description: String,
  $type: ID!,  $urgent: Boolean){
addCampaign( creatorId: $creatorId,  name: $name, description: $description, type: $type, 
  urgent: $urgent){
    id
  user
  {
    id
  }
}
}`;

const TYPES_LIST = gql `
  query {
    allTypes {
      id
      name
    }
  }
`;

const CLUSTERS_LIST = gql `
  query {
    allClusters {
      id
      name
    }
  }
`;

const ME_QUERY = gql `
  query {
      me {
        id
        name
        type{
          name
        }
        role
      }
  }
`;



export default compose(graphql(ADD_CAMPAIGN, {name: 'addCampaign'}),
graphql(ME_QUERY,{

  props: ({data}) => {
    if (!data.me) {
      return {loading: data.loading};
    }

    return {loading: data.loading, user: data.me};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }

}),
graphql(TYPES_LIST,{

  props: ({data}) => {
    if (!data.allTypes) {
      return {loading: data.loading};
    }
    const types = data
      .allTypes
      .map(({id, name}) => ({value: id, label: name}));

    return {loading: data.loading, types};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }

}),graphql(CLUSTERS_LIST,{

  props: ({data}) => {
    if (!data.allClusters) {
      return {loading: data.loading};
    }
    const clusters = data
      .allClusters
      .map(({id, name}) => ({value: id, label: name}));

    return {loading: data.loading, clusters};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }

}))(CampaignForm)



