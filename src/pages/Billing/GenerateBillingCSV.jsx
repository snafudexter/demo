import React, { Component } from "react";
import * as XLSX from "xlsx";
import Alert from "react-s-alert";
import moment from "moment";
import { uploadFile, downloadFile } from "../../helpers/ExcelFileHandler";

export default class GenerateBillingCSV extends Component {
  mediaZoneRateArr = [];
  normalInstallationCharge = 11.55;
  wbInstallationCharge = 17.33;
  westBengalStateIdFromDB = "cj7640hxw1e200134kkhew531";
  WSBMediaId = "cj6hmdl1g237g0152ol37p8li";
  SAVMediaId = "cj6hmdrdf237m0152k9giet5l";
  OWVMediaId = "cj6hme3x9237w0152k506zge4";
  FLEXMediaId = "cj6hme6z7238101527ewu1noe";
  FWFMediaId = "cj6hmeeuo238f0152obvtqr4i";
  BACKLITMediaId = "cj764w47d1fhn013433zt1bwy";
  CLEARFILMMediaId = "cj764wz6f1fjw0134if1psigu";
  TRANSLITMediaId = "cj764x9xl1fk60134ziipansz";
  ACRYLICMediaId = "cj764vmti1fgc0134uh1zja26";

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

  getTasks = () => {
    let t = [];
    if (!this.props.selectedTasks.length) {
      t = this.props.allTasks;
    } else {
      t = this.props.selectedTasks;
    }
    return t;
  };

  checkData = () => {
    let tasks = [];
    if (!this.props.selectedTasks.length) {
      tasks = this.props.allTasks;
    } else {
      tasks = this.props.selectedTasks;
    }
    if (!tasks.length) {
      return false;
    }
    return true;
  };

  initiateXLSXDownload = result => {
    const workbook = XLSX.utils.book_new();
    // for heading start
    let row = 0;
    let headingTable = [{ "": `${this.props.cluster}-${this.props.campaign}` }];
    let worksheet = XLSX.utils.json_to_sheet(headingTable, {
      origin: { r: row, c: 2 }
    });
    // for heading end
    let offsetR = 2 + headingTable.length;
    let offsetC = 1;
    XLSX.utils.sheet_add_json(worksheet, result.fileRows, {
      origin: { r: offsetR, c: offsetC }
    });

    // for gap
    XLSX.utils.sheet_add_json(worksheet, [{}], { origin: -1 });

    // for disclaimer start
    let row2 = offsetR + result.fileRows.length + 2;
    let disclaimerTable = [
      { Note: "This is a system generated file. Discretion is advised." }
    ];
    XLSX.utils.sheet_add_json(worksheet, disclaimerTable, {
      origin: { r: row2, c: offsetC + 2 }
    });
    // for disclaimer end
    XLSX.utils.book_append_sheet(workbook, worksheet, "Billing");
    try {
      this.props
        .addBill({
          variables: {
            campaignName: this.props.campaign,
            clusterName: this.props.cluster,
            taskIds: result.taskIds
          }
        })
        .then(resp => {
          // console.log(resp);
          Alert.closeAll();
          Alert.success(`Done!! Billing Added`, {
            position: "top-right",
            effect: "slide"
          });
          let fileName =
            "Billing " +
            resp.data.addBill.serialNo +
            " " +
            moment().format("DD/MM/YYYY");
          XLSX.writeFile(workbook, `${fileName}.xlsx`);
          // let buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
          // application / vnd.openxmlformats - officedocument.spreadsheetml.sheet;
          // let billingId = resp.data.addBill.id;
          // this.handleFileUpload(buf,billingId);
        })
        .catch(err => {
          console.log(err.message);
          Alert.closeAll();
          Alert.error(`Error occured : ${err.message}`, {
            position: "top-right",
            effect: "slide"
          });
        });
    } catch (e) {
      Alert.closeAll();
      Alert.error(`Some Error Occured`, {
        position: "top-right",
        effect: "slide"
      });
    }
  };

  // handleFileUpload = async (bufferData,billingId) => {
  //   await uploadFile(bufferData, billingId,this.props.userId,(err, result) => {
  //     if (err) {
  //       console.log(err);
  //       Alert.closeAll();
  //       Alert.error(`Error occured while uploading`, {
  //         position: "top-right",
  //         effect: "slide"
  //       });
  //     } else {
  //       console.log(result);
  //       Alert.closeAll();
  //       Alert.success(`Done!! Billing Uploaded`, {
  //         position: "top-right",
  //         effect: "slide"
  //       });
  //     }
  //   });
  // }
  // return data like media total area, prntin cosst and installation cost and other
  // remaining fields
  getRequiredAdspotData = (task, stateId, zoneId) => {
    // console.log(task.adSpots);
    // and array of objects  {mediaId, mediaName,recceArea,installedArea,approvedArea}
    let mediaDetailArray = [];
    let totalInstallationCost = 0;
    let installationRate = this.normalInstallationCharge;
    if (stateId === this.westBengalStateIdFromDB) {
      installationRate = this.wbInstallationCharge;
    }
    let totalInstalledArea = 0;
    let totalRecceArea = 0;
    let printingCost = 0;
    if (task.adSpots && task.adSpots.length) {
      for (let ad of task.adSpots) {
        if (ad.media === null || !ad.approved || ad.type === "COMPETITION") {
          continue;
        }
        let foundOne = false;
        for (let media of mediaDetailArray) {
          if (media.mediaId === ad.media.id) {
            foundOne = true;
            let currentArea = (ad.width * ad.height) / 144;
            // currentArea = Math.ceil(currentArea);
            // for updating object
            media.area += currentArea;

            // if adspot is installed then update total installed area
            if (ad.installed) {
              totalInstalledArea += currentArea;
            }

            // if ad is approved we will consider that adspot for total printing cost
            // if (ad.approved) {
            let mediaRateByZone = this.getRateByMediaZone(ad.media.id, zoneId);
            // printing cost of media = rate of that media  *  area of that media
            printingCost += mediaRateByZone * currentArea;
            // }
            // total recce are will be updated irrepsective of installed flag
            totalRecceArea += currentArea;
          }
        }

        if (!foundOne) {
          let area = (ad.width * ad.height) / 144;
          // area = Math.ceil(area);
          // if adspot is installed then update total installed area
          if (ad.installed) {
            totalInstalledArea += area;
          }

          // if ad is approved we will consider that adspot for total printing cost
          // if (ad.approved) {
          let mediaRateByZone = this.getRateByMediaZone(ad.media.id, zoneId);
          // printing cost of media = rate of that media  *  area of that media
          printingCost += mediaRateByZone * area;
          // }

          // total recce are will be updated irrepsective of installed flag
          totalRecceArea += area;

          mediaDetailArray.push({
            mediaId: ad.media.id,
            mediaName: ad.media.name,
            area
          });
        }
      }
    }
    totalInstallationCost = totalInstalledArea * installationRate;
    return {
      mediaDetailArray,
      totalRecceArea,
      totalInstalledArea,
      installationRate,
      totalInstallationCost,
      printingCost
    };
  };

  formatDataForBilling = tasks => {
    // console.log(tasks);
    let fileRows = [];
    let taskIds = [];
    for (let t of tasks) {
      taskIds.push(t.id);
      let zone = t.store.city.state.zone.name;
      let stateId = t.store.city.state.id;
      let zoneId = t.store.city.state.zone.id;
      let state = t.store.city.state.name;
      let cluster = t.store.city.cluster.name;
      let campaign = t.campaign.name;
      let campaignMonth = moment(t.campaign.createdAt)
        .utcOffset("+5:30")
        .format("MMMM");
      let city = t.store.city.name;
      let freshOrRepeat = "??";
      let dealerCode = t.store.dealerCode;
      let type = t.store.category.type.name;
      let dealerName = t.store.dealerName;

      let result = this.getRequiredAdspotData(t, stateId, zoneId);
      let obj = {
        Month: campaignMonth,
        Zone: zone,
        State: state,
        Campaign: campaign,
        Cluster: cluster,
        City: city,
        FreshOrRepeat: freshOrRepeat,
        DealerCode: dealerCode,
        Type: type,
        DealerName: dealerName
      };
      for (let media of result.mediaDetailArray) {
        obj[media.mediaName] = media.area;
      }
      obj["RecceArea"] = result.totalRecceArea;
      obj["InstallationArea"] = result.totalInstalledArea;
      obj["PrintingCost"] = result.printingCost;
      obj["InstallationRate"] = result.installationRate;
      obj["InstallationCost"] = result.totalInstallationCost;

      fileRows.push(obj);
    }

    return { fileRows, taskIds };
  };

  renderCSVButton = () => {
    if (!this.checkData()) {
      return <div>Please Check Your Data</div>;
    }
    return (
      <div>
        <button
          className="btn btn-primary"
          label={"Download Billing"}
          onClick={e => {
            e.preventDefault();
            this.initiateXLSXDownload(
              this.formatDataForBilling(this.getTasks())
            );
          }}
        >
          Download Billing
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
