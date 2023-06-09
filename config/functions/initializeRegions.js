const travelRegionsRaw = require("../../travelRegionsRaw.json");

module.exports = {

  statToNum(stat) {
    switch (stat) {
      case "++":
        return 100;
      case "+":
        return 75;
      case "o":
        return 50;
      case "-":
        return 25;
      case "--":
        return 0;
      default:
        return undefined;
    }
  },

  async initializeRegions({ strapi }) {
    const travelRegions = travelRegionsRaw.map((region, index) => {
      return {
        ...region,
        id: index + 1,
        costPerWeek: region.costPerWeek === "" ? undefined : parseInt(region.costPerWeek),
        safety: statToNum(region.safety),
        nature: statToNum(region.nature),
        hiking: statToNum(region.hiking),
        beach: statToNum(region.beach),
        watersports: statToNum(region.watersports),
        entertainment: statToNum(region.entertainment),
        wintersports: statToNum(region.wintersports),
        culture: statToNum(region.culture),
        culinary: statToNum(region.culinary),
        architecture: statToNum(region.architecture),
        shopping: statToNum(region.shopping),
        jan: statToNum(region.jan),
        feb: statToNum(region.feb),
        mar: statToNum(region.mar),
        apr: statToNum(region.apr),
        may: statToNum(region.may),
        jun: statToNum(region.jun),
        jul: statToNum(region.jul),
        aug: statToNum(region.aug),
        sep: statToNum(region.sep),
        oct: statToNum(region.oct),
        nov: statToNum(region.nov),
        dec: statToNum(region.dec),
      };
    });

    for (let i = 0; i < travelRegions.length; i++) {
      const region = travelRegions[i];
      const parentRegion = travelRegions.find((r) => r.Region === region.ParentRegion);
      await strapi.db.query('api::region.region').create({ data: { ...region, ParentRegion: parentRegion?.id } });
    }
  }
}