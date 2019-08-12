import React, { Component } from "react";
import * as XLSX from "xlsx";

export default class CostingCSVButton extends Component {
  mediaZoneRateArr = [];
  normalInstallationCharge = 13;
  wbInstallationCharge = 15.50;
  westBengalStateIdFromDB = "cj7640hxw1e200134kkhew531";

  populateMediaZoneRateArr = (mediaId, mediaName, zoneId, zoneName, rate) => {
    this.mediaZoneRateArr.push({ mediaId, mediaName, zoneId, zoneName, rate });
  };

  componentDidMount = () => {
    let northId = "cj765p3mb1gva0134u2ov94no";
    let northName = "North";

    let westId = "cj765p82e1gvn01345a77p89k";
    let westName = "West";

    let centralId = "cj765pacv1gvt0134dpih1smu";
    let centralName = "Central";

    let eastId = "cj765p50o1gvd013446vsvvv1";
    let eastName = "East";

    let southId = "cj765p6lc1gvj0134eyem69tl";
    let southName = "South";

    // WSB
    let mediaId = "cj6hmdl1g237g0152ol37p8li";
    let mediaName = "WSB";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      140.91
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 140.91);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      140.91
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 147.84);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      147.84
    );
    // SAV
    mediaId = "cj6hmdrdf237m0152k9giet5l";
    mediaName = "SAV";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      103.95
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 103.95);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      103.95
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 117.81);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      117.81
    );
    // OWV
    mediaId = "cj6hme3x9237w0152k506zge4";
    mediaName = "OWV";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      147.84
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 147.84);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      147.84
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 155.93);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      155.93
    );

    // Flex
    mediaId = "cj6hme6z7238101527ewu1noe";
    mediaName = "Flex";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      38.12
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 38.12);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      38.12
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 40.43);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      40.43
    );

    // FWF
    mediaId = "cj6hmeeuo238f0152obvtqr4i";
    mediaName = "FWF";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      144.38
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 144.38);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      144.38
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 150.15);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      150.15
    );

    // Backlit Boxes
    mediaId = "cj764w47d1fhn013433zt1bwy";
    mediaName = "Backlit Box";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      321.09
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 321.09);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      321.09
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 336.11);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      336.11
    );

    // Clear Film
    mediaId = "cj764wz6f1fjw0134if1psigu";
    mediaName = "Clear Film";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      127.05
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 127.05);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      127.05
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 131.67);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      131.67
    );

    // Translight
    mediaId = "cj764x9xl1fk60134ziipansz";
    mediaName = "Translit";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      127.05
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 127.05);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      127.05
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 131.67);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      131.67
    );

    // Acrylic Sandwich
    mediaId = "cj764vmti1fgc0134uh1zja26";
    mediaName = "Acrylic Sandwitch";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      386.93
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 386.93);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      386.93
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 391.55);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      391.55
    );

    // Acrylic Sheet
    mediaId = "cj764uxuv1feq01345iu9pzwv";
    mediaName = "Acrylic Sheet";
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      northId,
      northName,
      386.93
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 386.93);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      386.93
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 391.55);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      southId,
      southName,
      391.55
    );

    // ACP Sheet
    // --- not in database

    // BACKLIT-Flex
    // {
    //   "id": "cj764wjsi1fiy0134wqbuws6d",
    //   "name": "Backlit Flex"
    // },
    mediaId = "cj764wjsi1fiy0134wqbuws6d";
    mediaName = "Backlit Flex";
    this.populateMediaZoneRateArr(mediaId, mediaName, northId, northName, 54);
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 54);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      54
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 62);
    this.populateMediaZoneRateArr(mediaId, mediaName, southId, southName, 62);

    // CLIP ON BOARD
    //  "id": "cjofnv9um72ln0832r4t4hqcz",
    //   "name": "Clip-On Board"
    mediaId = "cjofnv9um72ln0832r4t4hqcz";
    mediaName = "Clip-On Board";
    this.populateMediaZoneRateArr(mediaId, mediaName, northId, northName, 1200);
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 1200);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      1200
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 1200);
    this.populateMediaZoneRateArr(mediaId, mediaName, southId, southName, 1200);

    //  "id": "cjq2aryz8ca1q08328yh35ut8",
    // "name": "Clip-on-board"
    mediaId = "cjq2aryz8ca1q08328yh35ut8";
    mediaName = "Clip-on-board";
    this.populateMediaZoneRateArr(mediaId, mediaName, northId, northName, 1200);
    this.populateMediaZoneRateArr(mediaId, mediaName, westId, westName, 1200);
    this.populateMediaZoneRateArr(
      mediaId,
      mediaName,
      centralId,
      centralName,
      1200
    );
    this.populateMediaZoneRateArr(mediaId, mediaName, eastId, eastName, 1200);
    this.populateMediaZoneRateArr(mediaId, mediaName, southId, southName, 1200);
  };

  getRateByMediaZone = (mediaId, zoneId) => {
    let rate = 0;
    for (let val of this.mediaZoneRateArr) {
      if (val.mediaId === mediaId && val.zoneId === zoneId) {
        rate = val.rate;
      }
    }
    return rate;
  };

  getMediaTotalAreaTable = mediaIdNameAreaTable => {
    // console.log(mediaIdNameAreaTable);
    let perMediaTotalArea = []; // id, name, totalArea
    // start by traversing every media present in this array
    for (let val of mediaIdNameAreaTable) {
      let foundOne = false;

      // traverse all elements in per media array so taht we can get previous
      // area, and then ount that elemnt with this new elemnt
      for (let i = 0; i < perMediaTotalArea.length; i++) {
        let media = perMediaTotalArea[i];
        // if found update it
        if (media.id === val.id) {
          let totalArea = media.totalArea;
          totalArea += val.area;
          perMediaTotalArea[i] = {
            id: val.id,
            name: val.name,
            totalArea,
            zoneId: val.zoneId,
            stateId: val.stateId
          };
          foundOne = true;
        }
      }

      // if not fund then add it
      if (!foundOne) {
        perMediaTotalArea.push({
          id: val.id,
          name: val.name,
          totalArea: val.area,
          zoneId: val.zoneId,
          stateId: val.stateId
        });
      }
    }
    let ultimateTable = [];
    let totArea = 0;
    let totCost = 0;
    for (let media of perMediaTotalArea) {
      let perMediaTotalArea = media.totalArea;
      totArea += perMediaTotalArea;

      let perMediaRate = this.getRateByMediaZone(media.id, media.zoneId);
      let installationRate = this.normalInstallationCharge;
      if (media.stateId === this.westBengalStateIdFromDB) {
        installationRate = this.wbInstallationCharge;
      }
      let totalMediaRate = perMediaRate + installationRate;
      let perMediaTotalRate = perMediaTotalArea * totalMediaRate;

      totCost += perMediaTotalRate;
      ultimateTable.push({
        Name: media.name,
        TotalArea: media.totalArea,
        Costing: perMediaTotalRate
      });
    }

    ultimateTable.push({
      Name: "",
      TotalArea: totArea,
      Costing: totCost
    });

    return ultimateTable;
  };

  initiateXLSXDownload = taskAndMediaAreaObject => {
    const workbook = XLSX.utils.book_new();
    let offsetR = 3;
    let offsetC = 1;
    // for tasks
    let worksheet = XLSX.utils.json_to_sheet(
      taskAndMediaAreaObject.tasksTable,
      {
        origin: { r: offsetR, c: offsetC }
      }
    );

    // for gap
    XLSX.utils.sheet_add_json(worksheet, [{}], { origin: -1 });

    let mediaTotAreaRateTable = this.getMediaTotalAreaTable(
      taskAndMediaAreaObject.mediaIdNameAreaTable
    );

    let row = taskAndMediaAreaObject.tasksTable.length + 2 + offsetR;
    XLSX.utils.sheet_add_json(worksheet, mediaTotAreaRateTable, {
      origin: { r: row, c: offsetC + 3 }
    });

    // for disclaimer start
    let row2 = row + mediaTotAreaRateTable.length + 2;
    let disclaimerTable = [
      { Note: "This is a system generated file. Discretion is advised." }
    ];
    XLSX.utils.sheet_add_json(worksheet, disclaimerTable, {
      origin: { r: row2, c: offsetC + 3 }
    });
    // for disclaimer end
    XLSX.utils.book_append_sheet(workbook, worksheet, "Costing");
    XLSX.writeFile(workbook, "Costing.xlsx");
  };

  formatDataForCosting = tasks => {
    // rows or json objects are decided upon number of ad spots
    let tasksTable = [];
    let mediaIdNameAreaTable = [];
    let serialNo = 0;
    let previousSNo = -1;
    let totalQuantity = 0;
    for (let row of tasks) {
      ++serialNo;
      let dealerCode = row.store.dealerCode;
      let dealerName = row.store.dealerName;
      let dealerAddress = row.store.dealerAddress;
      // if adspots exist and is not null
      if (row.adSpots.length && row.adSpots) {
        for (let ad of row.adSpots) {
          // if ad type is COMPETITION then ignore it
          if (ad.type === "COMPETITION") {
            continue;
          }
          let remarks = ad.remarks ? ad.remarks : "";
          let sn = "";
          if (previousSNo !== serialNo) {
            previousSNo = serialNo;
            sn = serialNo;
          }
          // if media is null don't go further
          if (ad.media === null) {
            // adding store related detail
            tasksTable.push({
              SNo: sn,
              DealerCode: dealerCode,
              DealerName: dealerName,
              DealerAddr: dealerAddress,
              Item: "",
              Width: "",
              Height: "",
              Qty: "",
              Area: "",
              Media: "",
              Category: "",
              Remarks: remarks
            });
            continue;
          }
          let item = ad.name;
          let width = ad.width;
          let height = ad.height;
          let qty = 1;
          totalQuantity += qty;
          let category = ad.category.name;
          // media handling start
          let mediaId = "";
          let mediaName = "";
          if (ad.media.id) {
            mediaId = ad.media.id;
          }
          if (ad.media.name) {
            mediaName = ad.media.name;
          }
          let area = (width * height) / 144;
          //media handling end

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
            Media: mediaName,
            Category: category,
            Remarks: remarks
          });
          mediaIdNameAreaTable.push({
            id: mediaId,
            name: mediaName,
            area,
            zoneId: row.store.city.state.zone.id,
            stateId: row.store.city.state.id
          });
        }
        // if adspots dont't exist
        // we have to decrease serial no as it was increased
      } else {
        // add a row for task information like remarks and other things
        let taskRemarks = row.remark ? row.remark.name : "No Remarks";
        tasksTable.push({
          SNo: serialNo,
          DealerCode: dealerCode,
          DealerName: dealerName,
          DealerAddr: dealerAddress,
          Item: "",
          Width: "",
          Height: "",
          Qty: "",
          Area: "",
          Media: "",
          Category: "",
          Remarks: taskRemarks
        });
        // --serialNo;
      }
    }
    //for total quantity
    tasksTable.push({
      SNo: "",
      DealerCode: "",
      DealerName: "",
      DealerAddr: "",
      Item: "Total Quantity",
      Width: "",
      Height: "",
      Qty: totalQuantity,
      Area: "",
      Media: "",
      Remarks: ""
    });
    return { tasksTable, mediaIdNameAreaTable };
  };

  checkData = () => {
    let tasks = [];
    let dataValid = true;

    if (!this.props.selectedTasks.length) {
      tasks = this.props.allTasks;
    } else {
      tasks = this.props.selectedTasks;
    }

    if (!tasks.length) {
      dataValid = false;
    }

    return {
      tasks: tasks,
      dataValid
    };
  };

  renderCSVButton = () => {
    let check = this.checkData();

    if (!check.dataValid) {
      return <div>Please Check Your Data</div>;
    }
    return (
      <div>
        <button
          className="btn btn-primary"
          label={"Download Costing"}
          onClick={e => {
            e.preventDefault();
            this.initiateXLSXDownload(this.formatDataForCosting(check.tasks));
          }}
        >
          Download Costing
        </button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>{this.renderCSVButton()}</div>
      </div>
    );
  }
}
