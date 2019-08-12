import React from 'react'
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import ExportButton from "../../helpers/ExportButton";
import TasksTable from "../../components/Tables/TasksTable";

const mapPropsToOptions = props => {
    let media = [],
    campaignId = [],
    cityId = [],
    zoneId = [],
    typeId = [],
    clusterId = [],
    categoryId = [];
    var variables;

    if(props){
        if(props.filter.filter.campaign){
            if (Array.isArray(props.filter.filter.campaign))
            campaignId = props.filter.filter.campaign.map(val => {
              return val.value;
            });
            else campaignId.push(props.filter.filter.campaign.value);
        }
        if(props.filter.filter.type){
            if(Array.isArray(props.filter.filter.type))
            typeId = props.filter.filter.type.map(t=>{
                return t.value;
            });
            else typeId.push(props.types.value)
        }
        if(props.filter.media){
            media = props.filter.media.map((m)=>{
                return m.name;
            })
        }

        variables = {
            campaignId: campaignId,
            cityId: cityId,
            zoneId: zoneId,
            typeId: typeId,
            clusterId: clusterId,
            categoryId: categoryId,
            startDate: props.filter.filter.startDate?props.filter.filter.startDate:"",
            endDate: props.filter.filter.endDate?props.filter.filter.endDate:""
        };
    
    }
    return { variables, fetchPolicy: "cache-and-network" };
};

class InstallationTableWrapper extends React.Component {

    state = {
        selectedTasks: [],
        columns:  [
            {
                key: "zone",
                name: "Zone",
                resizable: true,
                width: 115
            },
            {
                key: "state",
                name: "State",
                resizable: true,
                width: 115
            },            
            {
                key: "city",
                name: "City",
                resizable: true,
                width: 115
            },
            {
                key: "campaign",
                name: "Campaign",
                resizable: true,
                width: 115
            },
            {
                key: "dealerCode",
                name: "Dealer Code",
                resizable: true,
                width: 115
            },
            {
                key: "dealerName",
                name: "Dealer Name",
                resizable: true,
                width: 115
            },
            {
                key: "dealerAddress",
                name: "Dealer Address",
                resizable: true,
                width: 115
            },
            {
                key: "recarea",
                name: "Recce Area",
                resizable: true,
                width: 115
            },
            {
                key: "apparea",
                name: "Approved Area",
                resizable: true,
                width: 115
            },
            {
                key: "insarea",
                name: "Installed Area",
                resizable: true,
                width: 115
            },
            {
                key: "remark",
                name: "Remarks",
                resizable: true,
                width: 115
            },
            {
                key: "printingCost",
                name: "Printing Cost",
                resizable: true,
                width: 115
            },
            {
                key: "installationcost",
                name: "Installation Cost",
                resizable: true,
                width: 115
            }
        ]
    }

    setSelectedTasks = (tasks)=> {
        this.setState({ selectedTasks: tasks})
    }

    renderTable(props){
        if(props.tasks)
        if(props.tasks.length > 0){
            return <TasksTable 
                        tasks={props.tasks}
                        columns={props.columns}
                        setSelectedTasks={props.setSelectedTasks}   
                        tracker={true}
                    />
        }
        else <div/>
    }
    makeColumns(props){
        let columns = this.state.columns
            if (columns.length < 29) {
                props.map((m, i)=>{
                    let c = {}
                    i = i + 7;
                    c = {
                        key: (m.name.replace(/\s|-/g, "")).toLowerCase(),
                        name: m.name,
                        resizable: true,
                        width: 115
                    }
                    columns.splice( i, 0, c)
                })   
            }
            columns = columns.filter(column => column.name != "Clip-on-board" && column.name != "Acrylic Sandwitch")
            return columns
    }

    render(){
        return (
            <div>
                <div
                    className="block-options"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    >
                    {this.state.selectedTasks.length != 0 ? (
                        <ExportButton
                        showAlert={this.props.showAlert}
                        tasks={this.state.selectedTasks}
                        storeRefetch={this.props.storeRefetch}
                        allTask={this.props.allTasks}
                        />
                    ) : (
                        <button type="button" className="btn btn-secodary float-left">
                        Download Report
                        </button>
                    )}
                </div>
                <div>{this.props.loading?console.log("NOT YET") :
                    <this.renderTable
                        columns={this.props.filter.media?this.makeColumns(this.props.filter.media):console.log("WAITING FOR MEDIA")}
                        tasks={this.props.tasks}
                        setSelectedTasks={this.setSelectedTasks}
                    />}
                </div>
            </div>
        );
    }
}

const ALL_TASKS = gql`
  query vanillaReportTasks(
    $campaignId: [ID]
    $cityId: [ID]
    $zoneId: [ID]
    $typeId: [ID]
    $clusterId: [ID]
    $categoryId: [ID]
    $startDate: DateTime
    $endDate: DateTime
  ) {
    vanillaReportTasks(
      campaignId: $campaignId
      cityId: $cityId
      zoneId: $zoneId
      typeId: $typeId
      clusterId: $clusterId
      categoryId: $categoryId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      status
      startDate
      recceOnDate
      approvalSentDate
      bajajReviewDate
      installedDate
      remark{
          id
          name
      }
      adSpots {
        id
        type
        height
        width
        installed
        approved
        media{
            id
            name
        }
      }
      campaign {
        name
      }
      store {
        id
        dealerCode
        dealerName
        dealerAddress
        category {
          name
          type {
            name
          }
        }
        city {
          name
          cluster {
            name
          }
          state {
            name
            zone {
              name
            }
          }
        }
      }
    }
  }
`;

export default compose(
    graphql(ALL_TASKS, {
        props: ({data}) => {
            if(!data.vanillaReportTasks){
                return { loading: data.loading };
            }
            let tasks = data.vanillaReportTasks.map((task, i)=>{
                let count = 0, recarea = 0, apparea = 0, insarea = 0;

                let wsb = 0, sav = 0, owv = 0, flex = 0, fwf = 0, acrylicsheet = 0, backlitbox = 0, 
                    backlitflex = 0, clearfilm = 0, translit = 0, mdf = 0, clipon = 0, fab = 0, acp = 0;

                let totalwsb = 0, totalsav = 0, totalowv = 0, totalflex = 0, totalfwf = 0, totalacrylicsheet = 0, totalbacklitbox = 0, 
                totalbacklitflex = 0, totalclearfilm = 0, totaltranslit = 0, totalmdf = 0, totalclipon = 0, totalfab = 0, totalacp = 0;

                let installationCharge = 0;
                let printingCharge = 0;

                if(task.adSpots){
                    count = task.adSpots.length;
                }
                if(count>0){
                    for (let i = 0; i < count; i++) {
                        if(task.adSpots[i].type === 'NEW' || task.adSpots[i].type === 'OLD' ){
                            if(task.adSpots[i].media.name == 'WSB'){
                                wsb = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalwsb += wsb;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += wsb * 140.91;
                                }
                                else {
                                    printingCharge += wsb * 147.84;
                                }
                            }
                            if(task.adSpots[i].media.name == 'SAV'){
                                sav = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalsav += sav; 
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += sav * 103.95;
                                }
                                else {
                                    printingCharge += sav * 117.81;
                                }
                            }
                            if(task.adSpots[i].media.name == 'OWV'){
                                owv = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalowv += owv;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += owv * 147.84;
                                }
                                else {
                                    printingCharge += owv * 147.84;
                                }
                            }
                            if(task.adSpots[i].media.name == 'Flex'){
                                flex = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalflex += flex;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += flex * 38.12;
                                }
                                else {
                                    printingCharge += flex * 40.43;
                                }
                            }
                            if(task.adSpots[i].media.name == 'FWF'){
                                fwf = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalfwf += fwf;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += fwf * 144.38;
                                }
                                else {
                                    printingCharge += fwf * 150.15;
                                }
                            }
                            if(task.adSpots[i].media.name == 'Acrylic Sheet' || task.adSpots[i].media.name == 'Acrylic Sandwitch'){
                                acrylicsheet = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalacrylicsheet += acrylicsheet;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += acrylicsheet * 386.93;
                                }
                                else {
                                    printingCharge += acrylicsheet * 391.55;
                                }
                            }
                            if(task.adSpots[i].media.name == 'Backlit Box'){
                                backlitbox = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalbacklitbox += backlitbox;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += backlitbox * 321.09;
                                }
                                else {
                                    printingCharge += backlitbox * 336.11;
                                }
                            }
                            if(task.adSpots[i].media.name == 'Backlit Flex'){
                                backlitflex = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalbacklitflex += backlitflex;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += backlitflex * 54;
                                }
                                else {
                                    printingCharge += backlitflex * 62;
                                }
                            }
                            if(task.adSpots[i].media.name == 'Clear Film'){
                                clearfilm = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalclearfilm += clearfilm;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += clearfilm * 127.05;
                                }
                                else {
                                    printingCharge += clearfilm * 131.67;
                                }
                            }
                            if(task.adSpots[i].media.name == 'Translit'){
                                translit = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totaltranslit += translit;
                                if(task.store.city.state.zone.name == 'North' || task.store.city.state.zone.name == 'West' || task.store.city.state.zone.name == 'Central'){
                                    printingCharge += translit * 127.05;
                                }
                                else {
                                    printingCharge += translit * 131.67;
                                }
                            }
                            if(task.adSpots[i].media.name == 'MDF Standee'){
                                mdf = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalmdf += mdf;
                            }
                            if(task.adSpots[i].media.name == 'Clip-On Board' || task.adSpots[i].media.name == 'Clip-on-board'){
                                clipon = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalclipon += clipon;
                            }
                            if(task.adSpots[i].media.name == 'FAB with Frame'){
                                fab = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalfab += fab;
                            }
                            if(task.adSpots[i].media.name == 'ACP LED Signage"'){
                                acp = (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                totalacp += acp;
                                
                            }
                          if(!task.adSpots[i].approved){
                            if(!task.adSpots[i].installed){
                                recarea += (task.adSpots[i].width * task.adSpots[i].height) / 144;
                            }
                          } else {
                            if(task.adSpots[i].installed){
                                recarea += (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                insarea += (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                apparea += (task.adSpots[i].width * task.adSpots[i].height) / 144;
                            } else {
                                recarea += (task.adSpots[i].width * task.adSpots[i].height) / 144;
                                apparea += (task.adSpots[i].width * task.adSpots[i].height) / 144;
                            }
                          }
                        }                        
                      } //adspot loop end
                      if(task.store.city.state.name == "West Bengal"){
                        installationCharge = insarea * 17.33
                      }
                      else {
                          installationCharge = insarea * 11.55
                      }
                      let tasks = {...task};
                      tasks = {...tasks} 
                     
                }
                return {...task, recarea, insarea, apparea, totalwsb, totalsav, totalowv, totalflex, totalfwf, totalacrylicsheet, totalbacklitbox,
                    totalbacklitflex, totalclearfilm, totaltranslit, totalmdf, totalclipon, totalfab, totalacp, printingCharge, installationCharge};               
            });
            return { loading: data.loading, tasks: tasks };
        },
        options: mapPropsToOptions
    })
)(InstallationTableWrapper);

InstallationTableWrapper.propTypes = {};