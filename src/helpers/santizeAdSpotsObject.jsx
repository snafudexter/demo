import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const sanitizeAdSpotObjects = (
  tasks,
  openModalCallback,
  openModalCallbackStore
) => {
  const sanitizedAdSpots = [];
  if (tasks.length > 0) {
    tasks.map(task => {
      sanitizedAdSpots.push({
        // Common to all tasks tables
        id: task.id,
        status: task.designDone ? "DONE" : "PENDING",
        campaign: task.campaign,
        type: task.type,
        dealerCity: task.dealerCity,
        dealerCode: task.dealerCode,
        dealerName: task.dealerName,
        dealerAddress: task.dealerAddress,
        name: task.name,
        width: task.width,
        installed: task.installed ? "YES":"NO",
        isDownloaded: task.isDownloaded ? "YES" : "NO",
        height: task.height,
        area: task.area,
        media: task.media,
        category: task.category,
        remarks: task.remarks,
        printingDone: task.printingDone ? "DONE": "Pending",

        image: task.image,
        action: (
          <button
            onClick={() => {
              openModalCallback(task);
            }}
            type="button"
            className="btn btn-sm btn-secondary float-right"
          >
            View Image
          </button>
        ),
        action_seconday: (
          <button
            onClick={() => {
              openModalCallbackStore(task);
            }}
            type="button"
            className="btn btn-sm btn-secondary float-right"
          >
            View Store Image
          </button>
        )
      });
    });
  }
  return sanitizedAdSpots;
};

export default sanitizeAdSpotObjects;
