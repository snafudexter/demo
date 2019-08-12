import XLSX from "xlsx";

export async function uploadFile(bufferData, fileId,userId, cb) {
  // console.log(file)
  if (bufferData) {
    const url = "http://localhost:4000/uploadExcel";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        data: bufferData,
        userId,
        fileId,
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),
      headers: myHeaders
    }).then(
      async res => {
        // console.log(res);
        let status = res.status;
        if (status !== 200) {
          cb("Some Error Occured While Uploading", null);
        } else {
          cb(null, "Billing Uploaded Sucessfully");
        }
      },
      async (rej) => {
        console.log(rej);
        cb(rej, null);
      }
    );
  }
}

export async function downloadFile(fileKey, userId, cb) {
  if (fileKey) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/octet-stream");
    const url =
      "http://localhost:4000/downloadExcel?fileKey=" +
      fileKey +
      "&userId=" +
      userId;
    fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: myHeaders
    }).then(
      async res => {
        let totRes = await res.text();
        if (res.status === 200) {
          let buf = btoa(totRes);
          let wb = XLSX.read(buf, { type: "base64", WTF: false });
          XLSX.writeFile(wb, "Billing.xlsx");
          cb(null, "File Downloaded");
        } else {
          cb("Something Wrong Occured", null);
        }
      },
      async (rej) => {
        console.log(rej);
        cb("Some Error Occured " + rej, null);
      }
    );
  }
}

// function convertWbToCSV(workbook){
//   var result = [];
//   workbook.SheetNames.forEach(function(sheetName) {
//     var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
//     if(csv.length){
//       result.push("SHEET: " + sheetName);
//       result.push("");
//       result.push(csv);
//     }
//   });
//   return result.join("\n");
// }
