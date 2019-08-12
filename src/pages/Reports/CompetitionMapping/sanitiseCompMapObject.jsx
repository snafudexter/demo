const getCompStoreInfo = store => {
  let adspotCount = 0,
  adspotName = "";
  for (let t of store.tasks) {
    for (let ad of t.adSpots) {
      if (ad.type === "COMPETITION") {
        adspotCount++;
        adspotName += ad.name + " , ";
      }
    }
  }

  return {
    adspotCount,
    adspotName,
    dealerCode: store.dealerCode,
    dealerAddress: store.dealerAddress
  };
};

const sanitizeCompMapObject = stores => {
  const sanitizedStores = [];
  if (stores.length > 0) {
    stores.map(store => {
      let obj = getCompStoreInfo(store);
      sanitizedStores.push(obj);
    });
  }
  return sanitizedStores;
};

export default sanitizeCompMapObject;
