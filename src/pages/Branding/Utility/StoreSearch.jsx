import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import {Link} from 'react-router-dom';

const mapPropsToOptions = () => {

    var variables = {
        dealerCode: 0

    }
    return {variables, fetchPolicy: "cache-and-network"};
};

class StoreSearch extends Component
{
    state = {
        dealerCode: ''
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({store: nextProps.store})
    }

    renderTaskList = () => {
        if (this.state.store) {
            if (this.state.store.tasks) {
                return (
                    <div className="row gutters-only">
                        <div className="col-md-12">
                            <div className="block">
                                <div>
                                    <table className="table table-vcenter">
                                    <thead>
                                                        <tr>
                                                        <th className="text-center">Date</th>
                                                        <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                        {this
                                            .state
                                            .store
                                            .tasks
                                            .map(e => {
                                                return (
                                                    
                                                    <tr>
                                                        <td className="text-center">{moment(e.startDate).format('DD/MM/YYYY')}</td>
                                                        <td className="text-center">
                                                            <Link to={"/branding/task/" + e.id} className="btn btn-sm btn-rounded btn-success " href="">
                                                                
                                                                View Details
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else 
                return null;

            }
        else 
            return null;
        }
    
    render()
    {
        return (
            <div className="col-md-12">
                <div className="block block-bordered">
                    <div className="block-header block-header-default">
                        <h3 className="block-title">
                            Dealer Code
                            <input
                                className="form-control"
                                placeholder="Dealer Code"
                                value={this.state.dealerCode}
                                onChange={e => {
                                this.setState({dealerCode: e.target.value});
                            }}/>
                            <button
                                className="btn btn-sm btn-rounded btn-success upload-action-btn pull-right"
                                onClick={() => {
                                    console.log(this.state.dealerCode)
                                this
                                    .props
                                    .fetchMore(parseInt(this.state.dealerCode))
                            }}>
                                <i className="fa fa-plus"></i>
                                Search
                            </button>
                        </h3>
                    </div>
                    {this.renderTaskList()}
                </div>
            </div>
        );
    }
}

const STORE_QUERY = gql `
query searchStore($dealerCode: Int!)
{
    searchStore(dealerCode: $dealerCode)
    {
        tasks
        {
            startDate
            id
            campaign
            {
                id
                name
            }
        }
    }
}
`;

export default compose(graphql(STORE_QUERY, {
    props: ({data, fetchMore}) => {
        if (data.loading) 
            return {loading: data.loading};
        
        const store = {
            store: data.searchStore,
            fetchMore: (dealerCode) => {
                {
                    data.fetchMore({
                        variables: {
                            dealerCode: dealerCode
                        },
                        updateQuery(prev, {fetchMoreResult}) {
                            console.log('cl')
                            console.log(fetchMoreResult)
                            var c = {
                                searchStore: fetchMoreResult.searchStore
                            }
                            return ({
                                ...c
                            })
                        }
                    })
                }
            }
        };
        return store
    },
    options: mapPropsToOptions
}))(StoreSearch);