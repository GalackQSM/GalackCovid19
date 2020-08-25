const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
    name: "leaderboard",
    description: "Fournit un classement des 10 premiers pour chaque pays dans chaque catégorie respective",
    async execute(message, args){
        if (!args.length){
            let leadingDeaths = [];
            let leadingRecoveries = [];
            let leadingCases = [];

            let getCovData = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/countries?yesterday&sort");
                let data = response.data;
                return data;
            }
            let countryData = await getCovData();
            console.log(countryData);

            for (country in countryData){
                if (countryData[country]["deaths"] > 5000) leadingDeaths.push(countryData[country]);
                if (countryData[country]["recovered"] > 80000) leadingRecoveries.push(countryData[country]);
                if (countryData[country]["cases"] > 150000) leadingCases.push(countryData[country]);
            }
            leadingDeaths.sort(compareDeaths);
            leadingRecoveries.sort(compareRecovered);
            leadingCases.sort(compareCases);

            const leadingEmbed = new Discord.MessageEmbed()
                .setColor("#990000")
                .setTitle("Statistiques mondiales sur le COVID-19")
                .addField("La plupart des cas", formatData(leadingCases, "cases"), true)
                .addField("La plupart des décès", formatData(leadingDeaths, "deaths"), true)
                .addField("La plupart des récupérations", formatData(leadingRecoveries, "recovered"), true)
                .setFooter(`Dernière mise à jour le ${new Date(countryData[115]["updated"]).toLocaleString()}`);

            return message.channel.send(leadingEmbed);
        }
    }
}
let formatData = (arr, typeStr) => {
    let msg = ``;

    for (let countryNum = 0; countryNum < 10; countryNum++){
        msg += `${countryNum + 1}: ${arr[countryNum]["country"]} :flag_${arr[countryNum]["countryInfo"]["iso2"].toLowerCase()}::  ${numberWithCommas(arr[countryNum][typeStr])} \n`
    }
    return msg;
} 

let compareDeaths = (a, b) => {
    const countryA = a["deaths"]
    const countryB = b["deaths"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}

let compareRecovered= (a, b) => {
    const countryA = a["recovered"]
    const countryB = b["recovered"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}

let compareCases = (a, b) => {
    const countryA = a["cases"]
    const countryB = b["cases"]
  
    let comparison = 0;
    if (countryA > countryB) {
      comparison = -1;
    } else if (countryA < countryB) {
      comparison = 1;
    }
    return comparison;
}  

let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}