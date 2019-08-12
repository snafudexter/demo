import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const sanitizeFilterTasksObject = (tasks, display, tracker) => {
  const sanitizedTasks = [];
  if (tasks) {
    if (tasks.length > 0) {
      tasks.map(task => {
        if (task.store) {
          if(tracker){
            if (task.status ===display.find(e => (e===task.status)) || display === "ALL")
            sanitizedTasks.push({
              // Common to all tasks tables
              zone: task.store.city.state.zone.name,
              state: task.store.city.state.name,
              cluster: task.store.city.cluster.name,
              campaign: task.campaign ? task.campaign.name : "",
              city: task.store.city.name,
              dealerCode: task.store.dealerCode,
              type: task.store.category.type.name,
              category: task.store.category.name,
              // adspots_count: task.adspots_count,
              // total_area: parseFloat(parseFloat(task.total_area).toFixed(2)),
              // installed_area: parseFloat(
              //   parseFloat(task.installed_area).toFixed(2)
              // ),
              // rejected_area: parseFloat(parseFloat(task.rejected_area).toFixed(2)),
              // id: task.id,
              //installation tracker columns
              dealerName: task.store.dealerName,
              dealerAddress: task.store.dealerAddress,
              wsb: parseFloat(parseFloat(task.totalwsb).toFixed(2)), 
              sav: parseFloat(parseFloat(task.totalsav).toFixed(2)), 
              owv: parseFloat(parseFloat(task.totalowv).toFixed(2)), 
              flex: parseFloat(parseFloat(task.totalflex).toFixed(2)),
              fwf: parseFloat(parseFloat(task.totalfwf).toFixed(2)),
              acrylicsheet: parseFloat(parseFloat(task.totalacrylicsheet).toFixed(2)),
              backlitbox: parseFloat(parseFloat(task.totalbacklitbox).toFixed(2)),
              backlitflex: parseFloat(parseFloat(task.totalbacklitflex).toFixed(2)),
              clearfilm: parseFloat(parseFloat(task.totalclearfilm).toFixed(2)),
              translit: parseFloat(parseFloat(task.totaltranslit).toFixed(2)),
              mdfstandee: parseFloat(parseFloat(task.totalmdf).toFixed(2)),
              cliponboard: parseFloat(parseFloat(task.totalclipon).toFixed(2)),
              fabwithframe: parseFloat(parseFloat(task.totalfab).toFixed(2)),
              acpledsignage: parseFloat(parseFloat(task.totalacp).toFixed(2)),
              recarea: parseFloat(parseFloat(task.recarea).toFixed(2)),              
              apparea: parseFloat(parseFloat(task.apparea).toFixed(2)),
              insarea: parseFloat(parseFloat(task.insarea).toFixed(2)),
              startDate: moment(task.startDate).format("DD/MM/YYYY"),
              recceOnDate: task.recceOnDate
                ? moment(task.recceOnDate).format("DD/MM/YYYY")
                : "",
                approvalSentDate: task.approvalSentDate
                ? moment(task.approvalSentDate).format("DD/MM/YYYY")
                : "",
              bajajReviewDate: task.bajajReviewDate
                ? moment(task.bajajReviewDate).format("DD/MM/YYYY")
                : "",
              installedDate: task.installedDate
                ? moment(task.installedDate).format("DD/MM/YYYY")
                : "",
              // remark: task.remark?task.remark.name:'',
              status:
              task.status === "RECCE"
                ? "RECCE ON"
                : task.status === "RECCEDONE"
                ? "RECCE DONE"
                : task.status,
              printingCost: parseFloat(parseFloat(task.printingCharge).toFixed(2)),
              installationcost: parseFloat(parseFloat(task.installationCharge).toFixed(2)),
              //
              // recceUser: task.recceUser ? task.recceUser.name : "",
              // printerUser: task.printerUser? task.printerUser.name : '',
              // designUser: task.designUser ? task.designUser.name : "",
              // billed: task.bill ? "YES" : "NO",
              // installCertImage: task.installCertImage? "YES": "NO",
              // name: task.store.dealerName,
              // address: task.store.dealerAddress,
              
              // 
              // adspots: task.adSpots,
              // Optional on task tables, must have a ternary if else operator
              // Recce Info

              // recceDoneDate: task.recceDoneDate
              //   ? moment(task.recceDoneDate).format("DD/MM/YYYY")
              //   : "",
              // designOnDate: task.designOnDate
              //   ? moment(task.designOnDate).format("DD/MM/YYYY")
              //   : "",
              // designDoneDate: task.designDoneDate
              //   ? moment(task.designDoneDate).format("DD/MM/YYYY")
              //   : "",
              // printOnDate: task.printOnDate
              //   ? moment(task.printOnDate).format("DD/MM/YYYY")
              //   : "",

              // 
              // action: (
              //   <Link
              //     to={`/branding/task/${task.id}`}
              //     style={{
              //       padding: "5px 9px"
              //     }}
              //     className="btn btn-sm btn-secondary"
              //   >
              //     View Details
              //   </Link>
              // )
            });
          }
          else {
            if (task.status ===display.find(e => (e===task.status)) || display === "ALL")
            sanitizedTasks.push({
              // Common to all tasks tables
              campaign: task.campaign ? task.campaign.name : "",
              adspots_count: task.adspots_count,
              total_area: parseFloat(parseFloat(task.total_area).toFixed(2)),
              installed_area: parseFloat(
                parseFloat(task.installed_area).toFixed(2)
              ),
              rejected_area: parseFloat(parseFloat(task.rejected_area).toFixed(2)),
              id: task.id,
              city: task.store.city.name,
              dealerCode: task.store.dealerCode,
              recceUser: task.recceUser ? task.recceUser.name : "",
              printerUser: task.printerUser? task.printerUser.name : '',
              designUser: task.designUser ? task.designUser.name : "",
              billed: task.bill ? "YES" : "NO",
              installCertImage: task.installCertImage? "YES": "NO",
              name: task.store.dealerName,
              address: task.store.dealerAddress,
              remark: task.remark?task.remark.name:'',
              state: task.store.city.state.name,
              zone: task.store.city.state.zone.name,
              cluster: task.store.city.cluster.name,
              category: task.store.category.name,
              type: task.store.category.type.name,
              status:
                task.status === "RECCE"
                  ? "RECCE ON"
                  : task.status === "RECCEDONE"
                  ? "RECCE DONE"
                  : task.status,
              startDate: moment(task.startDate).format("DD/MM/YYYY"),
              adspots: task.adSpots,
              // Optional on task tables, must have a ternary if else operator
              // Recce Info
              recceOnDate: task.recceOnDate
                ? moment(task.recceOnDate).format("DD/MM/YYYY")
                : "",
              recceDoneDate: task.recceDoneDate
                ? moment(task.recceDoneDate).format("DD/MM/YYYY")
                : "",
              approvalSentDate: task.approvalSentDate
                ? moment(task.approvalSentDate).format("DD/MM/YYYY")
                : "",
              designOnDate: task.designOnDate
                ? moment(task.designOnDate).format("DD/MM/YYYY")
                : "",
              designDoneDate: task.designDoneDate
                ? moment(task.designDoneDate).format("DD/MM/YYYY")
                : "",
              printOnDate: task.printOnDate
                ? moment(task.printOnDate).format("DD/MM/YYYY")
                : "",
              bajajReviewDate: task.bajajReviewDate
                ? moment(task.bajajReviewDate).format("DD/MM/YYYY")
                : "",
              installedDate: task.installedDate
                ? moment(task.installedDate).format("DD/MM/YYYY")
                : "",
              action: (
                <a
                  target="_blank"
                  href={`/branding/task/${task.id}`}
                  style={{
                    padding: "5px 9px"
                  }}
                  className="btn btn-sm btn-secondary"
                >
                  View Details
                </a>
              )
            });
          }
        }
      });
    }
  }
  return sanitizedTasks;
};

export default sanitizeFilterTasksObject;
