import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import * as XLSX from "xlsx";
import Alert from "react-s-alert";
import moment from "moment";

export default class ExportCSVButton extends Component {
  checkData = () => {
    let tasks = [];
    let pq = [];
    let totalDistance = this.props.totalDistance;
    // console.log(totalDistance);
    if (!this.props.selectedTasks.length) {
      tasks = this.props.allTasks;
    } else {
      tasks = this.props.selectedTasks;
    }

    pq.push(this.props.printerQuotation);

    if (!pq.length) {
      Alert.closeAll();
      Alert.error("Check Printer Quotation", {
        position: "top-right",
        effect: "slide"
      });
      return false;
    }

    if (!tasks.length) {
      Alert.closeAll();
      Alert.error("Tasks are empty", {
        position: "top-right",
        effect: "slide"
      });
      return false;
    }

    if (totalDistance < 0) {
      Alert.closeAll();
      Alert.error("Total Distance Not Set", {
        position: "top-right",
        effect: "slide"
      });
      return false;
    }
    // console.log(tasks);
    // console.log(pq);
    // console.log(totalDistance);
    // console.log(dataValid);
    return true;
  };

  // THESE METHODS WILL BE SPECIFICALLY USED FOR HUB RATES
  // AS THEY CAN BE NULL ( AS THEY ARE NEWLY UPDATED TO DATAMODEL)

  checkNumberVal = val => {
    if (val === null || val === undefined) {
      return -1;
    }
    return val;
  };

  checkBooleanVal = val => {
    if (val === null || val === undefined) {
      return false;
    }
    return val;
  };

  getHubMediaNameAreaRate = (mediaWiseTasks, printerQuotation, shopCount) => {
    // first format tasks media into an array of media name and area
    let taskMediaAreaArray = [];
    for (let t of mediaWiseTasks) {
      let name = t.Media;
      let area = t.Area;
      taskMediaAreaArray.push({ name, area });
    }

    let mediaRateArr = [];
    let hubInstallationRate = 0;
    let hubTransportationRate = 0;
    let hubRecceRate = 0;
    let hubRecceRateIsPerShop = true;
    for (let a of printerQuotation) {
      hubInstallationRate = this.checkNumberVal(a.hubInstallationRate);
      hubTransportationRate = this.checkNumberVal(a.hubTransportationRate);
      hubRecceRate = this.checkNumberVal(a.hubRecceRate);
      hubRecceRateIsPerShop = this.checkBooleanVal(a.hubRecceRatePerShop);
      for (let b of a.mediaRates) {
        mediaRateArr.push({ name: b.media.name, rate: b.rate });
      }
    }

    // now generate the ultimate table
    let theUtlimateTable = [];
    let cummulativeAreaOfAllMedias = 0;
    for (let val of mediaRateArr) {
      let totalArea = 0;
      //check media by name in tasks, if exists then add total area
      for (let tma of taskMediaAreaArray) {
        if (val.name === tma.name) {
          totalArea += tma.area;
        }
      }
      cummulativeAreaOfAllMedias += totalArea;
      if (totalArea > 0) {
        theUtlimateTable.push({
          Media: val.name,
          Area: totalArea,
          Rate: val.rate
        });
      }
    }

    theUtlimateTable.push({
      Media: "Total Area",
      Area: cummulativeAreaOfAllMedias,
      Rate: ""
    });
    theUtlimateTable.push({
      Media: "Hub Installation Rate @sq.ft",
      Area: "----",
      Rate: hubInstallationRate
    });
    theUtlimateTable.push({
      Media: "Hub Transportation Rate @km.",
      Area: this.props.totalDistance + " Km",
      Rate: hubTransportationRate
    });

    if (hubRecceRateIsPerShop) {
      theUtlimateTable.push({
        Media: "Hub Recce Rate Per Shop",
        Area: shopCount + " shops",
        Rate: hubRecceRate
      });
    } else {
      theUtlimateTable.push({
        Media: "Hub Recce Rate @sq. ft.",
        Area: cummulativeAreaOfAllMedias,
        Rate: hubRecceRate
      });
    }

    return theUtlimateTable;
  };

  getNonHubMediaAreaRate = (mediaWiseTasks, printerQuotation, shopCount) => {
    // first format tasks media into an array of media name and area
    let taskMediaAreaArray = [];
    for (let t of mediaWiseTasks) {
      let name = t.Media;
      let area = t.Area;
      taskMediaAreaArray.push({ name, area });
    }

    let mediaRateArr = [];
    let installationRate = 0;
    let tranportationRate = 0;
    let recceRate = 0;
    let recceRateIsPerShop = true;
    for (let a of printerQuotation) {
      installationRate = a.installationRate;
      tranportationRate = a.transportationRate;
      recceRate = a.recceRate;
      recceRateIsPerShop = a.recceRatePerShop;
      for (let b of a.mediaRates) {
        mediaRateArr.push({ name: b.media.name, rate: b.rate });
      }
    }

    // now generate the ultimate table
    let theUtlimateTable = [];
    let cummulativeAreaOfAllMedias = 0;
    for (let val of mediaRateArr) {
      let totalArea = 0;
      //check media by name in tasks, if exists then add total area
      for (let tma of taskMediaAreaArray) {
        if (val.name === tma.name) {
          totalArea += tma.area;
        }
      }
      cummulativeAreaOfAllMedias += totalArea;
      if (totalArea > 0) {
        theUtlimateTable.push({
          Media: val.name,
          Area: totalArea,
          Rate: val.rate
        });
      }
    }
    theUtlimateTable.push({
      Media: "Total Area",
      Area: cummulativeAreaOfAllMedias,
      Rate: ""
    });
    theUtlimateTable.push({
      Media: "Installation Rate @sq.ft",
      Area: "----",
      Rate: installationRate
    });
    theUtlimateTable.push({
      Media: "Transportation Rate @km.",
      Area: this.props.totalDistance + " Km",
      Rate: tranportationRate
      // Costing: this.props.totalDistance * tranportationRate
    });

    if (recceRateIsPerShop) {
      theUtlimateTable.push({
        Media: "Recce Rate Per Shop",
        Area: shopCount + " shops",
        Rate: recceRate
        // Costing: shopCount * recceRate
      });
    } else {
      theUtlimateTable.push({
        Media: "Recce Rate @sq. ft.",
        Area: cummulativeAreaOfAllMedias,
        Rate: recceRate
        // Costing: cummulativeAreaOfAllMedias * recceRate
      });
    }

    return theUtlimateTable;
  };

  getMediaNameAreaRate = (mediaWiseTasks, printerQuotation, shopCount) => {
    if (this.props.selectedCityId === this.props.printerQuotation.city.id) {
      // HUB RELATED RATES
      return this.getHubMediaNameAreaRate(
        mediaWiseTasks,
        printerQuotation,
        shopCount
      );
    }
    // NON HUB RELATED RATES
    return this.getNonHubMediaAreaRate(
      mediaWiseTasks,
      printerQuotation,
      shopCount
    );
  };

  initiateXLSXDownload = (tasks, printerQuotation, poSNo, createdAt) => {
    let mediaWiseTasks = this.formatDataForPO(tasks);
    const workbook = XLSX.utils.book_new();

    // for city start
    let offsetR = 1;
    let worksheet = XLSX.utils.json_to_sheet(
      [
        {
          City: this.props.selectedCity,
          PONumber: poSNo,
          Date: moment(createdAt)
            .utcOffset("+5:30")
            .format("DD/MM/YYYY")
        }
      ],
      {
        origin: { r: offsetR, c: 5 }
      }
    );
    // for city end

    // for tasks start
    let tRowOff = offsetR + 3;
    let tColOff = 1;
    XLSX.utils.sheet_add_json(worksheet, mediaWiseTasks, {
      origin: { r: tRowOff, c: tColOff }
    });
    // for tasks end

    // for printer quotation start
    let table = this.getMediaNameAreaRate(
      mediaWiseTasks,
      printerQuotation,
      tasks.length
    );

    // row count
    let row = mediaWiseTasks.length + 2 + tRowOff;

    XLSX.utils.sheet_add_json(worksheet, table, {
      origin: { r: row, c: tColOff + 3 }
    });
    // for printer quotation end

    // for disclaimer start
    let disclaimerRow = table.length + row + 5;
    let disclaimerTable = [
      { Note: "This is a system generated file. Discretion is advised." },
      {
        Note:
          "Use 3M Quality Material and other standards of work as per agreement."
      }
    ];
    XLSX.utils.sheet_add_json(worksheet, disclaimerTable, {
      origin: { r: disclaimerRow, c: tColOff + 2 }
    });
    // for disclaimer end

    // buiding workbook start
    XLSX.utils.book_append_sheet(workbook, worksheet, "PO");
    XLSX.writeFile(workbook, "PO.xlsx");
    // buiding workbook end
  };

  formatDataForPO = tasks => {
    // rows or json objects are decided upon number of ad spots
    let tasksTable = [];
    let serialNo = 0;
    let previousSNo = -1;
    for (let row of tasks) {
      ++serialNo;
      let dealerCode = row.store.dealerCode;
      let dealerName = row.store.dealerName;
      let dealerAddress = row.store.dealerAddress;
      if (row.adSpots.length && row.adSpots) {
        for (let ad of row.adSpots) {
          // if media is null don't consider this
          if (ad.media === null || ad.type === "COMPETITION" || !ad.approved) {
            continue;
          }
          let item = ad.name;
          let width = ad.width;
          let height = ad.height;
          let qty = 1;
          let area = (width * height) / 144;
          let media = "";
          if (ad.media.name) {
            media = ad.media.name;
          }
          let sn = "";
          if (previousSNo !== serialNo) {
            previousSNo = serialNo;
            sn = serialNo;
          }
          tasksTable.push({
            SNo: sn,
            DealerCode: dealerCode,
            DealerName: dealerName,
            DealerAddr: dealerAddress,
            Item: item,
            Width: width,
            Height: height,
            Qty: qty,
            Area: area,
            Media: media
          });
        }
      } else {
        --serialNo;
      }
    }

    return tasksTable;
  };

  renderCSVButton = (tasks, printerQuotation) => {
    return (
      <Mutation mutation={ADD_PURCHASE_ORDER}>
        {(addPurchaseOrder, { data }) => (
          <div>
            <button
              className="btn btn-primary"
              label={"Download Purchase Order"}
              type="button"
              onClick={e => {
                e.preventDefault();
                if (!this.checkData()) {
                  return;
                }
                let taskIds = [];

                for (let val of tasks) {
                  taskIds.push(val.id);
                }
                let totDist = this.props.totalDistance;
                let pqId = printerQuotation[0].id;
                addPurchaseOrder({
                  variables: {
                    taskIds: taskIds,
                    printerQuotationId: pqId,
                    totalDistance: totDist,
                    selectedCityId: this.props.selectedCityId
                  }
                })
                  .then(resp => {
                    // console.log(resp);
                    Alert.closeAll();
                    Alert.success(`Done!! Purchase Order Added`, {
                      position: "top-right",
                      effect: "slide"
                    });
                    this.initiateXLSXDownload(
                      tasks,
                      printerQuotation,
                      resp.data.addPurchaseOrder.serialNo,
                      resp.data.addPurchaseOrder.createdAt
                    );
                  })
                  .catch(err => {
                    console.log(err.message);
                    Alert.closeAll();
                    Alert.error(`Error occured : ${err.message}`, {
                      position: "top-right",
                      effect: "slide"
                    });
                  });
              }}
            >
              Download Purchase Order
            </button>
          </div>
        )}
      </Mutation>
    );
  };

  getTasks = () => {
    let t = [];
    if (!this.props.selectedTasks.length) {
      t = this.props.allTasks;
    } else {
      t = this.props.selectedTasks;
    }
    return t;
  };

  getPrinterQuotationArrJson = () => {
    let pq = [];
    pq.push(this.props.printerQuotation);
    return pq;
  };

  render() {
    return (
      <div>
        <div>
          {this.renderCSVButton(
            this.getTasks(),
            this.getPrinterQuotationArrJson()
          )}
        </div>
      </div>
    );
  }
}

const ADD_PURCHASE_ORDER = gql`
  mutation addPurchaseOrder(
    $taskIds: [ID!]
    $printerQuotationId: ID!
    $totalDistance: Float!
    $selectedCityId: ID!
  ) {
    addPurchaseOrder(
      taskIds: $taskIds
      printerQuotationId: $printerQuotationId
      totalDistance: $totalDistance
      selectedCityId: $selectedCityId
    ) {
      id
      tasks {
        id
      }
      printerQuotation {
        id
      }
      totalDistance
      createdAt
      serialNo
      createdAt
    }
  }
`;
