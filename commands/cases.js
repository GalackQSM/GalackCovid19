const axios = require("axios");
const Discord = require("discord.js");
const prefix1 = "+";

module.exports = {
    name: "cases",
    description: "Fournit des données mises à jour quotidiennement sur les cas de COVID-19 dans le monde",
    async execute(message, args){
        if (!args.length) {
            let getTotalCases = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                let cases = response.data;
                return cases;
            }
            let totalCases = await getTotalCases();

            const casesEmbed = new Discord.MessageEmbed()
                .setColor("#990000")
                .setTitle(`Globalement, il y a eu ${numberWithCommas(totalCases["cases"])} cas de COVID-19.`)
                .setFooter(`Dernière mise à jour le ${new Date(totalCases["updated"]).toLocaleString()}`);

            return message.channel.send(casesEmbed);
        }
        else if ((args[0] === "aujourd'hui" || args[0] === "td")) {
            if (args.length == 1) {
                let getTodayCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    return data = response.data;
                }
                let todayCases = await getTodayCases();

                const casesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Aujourd'hui, il y a ${numberWithCommas(todayCases["todayCases"])} nouveaux cas de COVID-19.`)
                    .setFooter(`Dernière mise à jour le ${new Date(todayCases["updated"]).toLocaleString()}`);

                return message.channel.send(casesEmbed);
            }
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getTodayCountryCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=false&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Veuillez entrer un pays valide.`)
                        }
                    }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                    return data = response.data;
                }
                let todayCountryCases = await getTodayCountryCases();

                const casesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Aujourd'hui, il y a ${numberWithCommas(todayCountryCases["todayCases"])} nouveaux cas de COVID-19 en ${todayCountryCases["country"]}.`)
                    .setFooter(`Dernière mise à jour le ${new Date(todayCountryCases["updated"]).toLocaleString()}`);

                return message.channel.send(casesEmbed);
            }
        }
        else if (args[0] === "hier" || args[0] === "ytd") {
            if (args.length == 1) {
                let getYesterdayCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                    return cases = response.data;
                }
                let yesterdayCases = await getYesterdayCases();

                const casesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Hier, il y avait ${numberWithCommas(yesterdayCases["todayCases"])} nouveaux cas de COVID-19.`)
                    .setFooter(`Dernière mise à jour le ${new Date(yesterdayCases["updated"]).toLocaleString()}`);

                return message.channel.send(casesEmbed);
            }
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getYesterdayCountryCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=true&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Veuillez entrer un pays valide.`)
                        }
                    }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                    return cases = response.data;
                }
                let yesterdayCountryCases = await getYesterdayCountryCases();

                const casesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Hier, il y avait ${numberWithCommas(yesterdayCountryCases["todayCases"])} nouveaux cas de COVID-19 en ${yesterdayCountryCases["country"]}.`)
                    .setFooter(`Dernière mise à jour le ${new Date(yesterdayCountryCases["updated"]).toLocaleString()}`);

                return message.channel.send(casesEmbed);
            }
            else {
            return message.channel.send(" <@" + message.author.id +"> - Veuillez saisir un argument valide, faite `" + prefix1 + "help` pour obtenir de l'aide sur les commandes.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
            }
        }
        else if (args[0] === "historique" || args[0] === "hs") {
            if (args.length == 1) {
                let casesData = [];
                let xAxisLabels = [];

                let getHistoricCases = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                    return historicCases = response.data;
                }
                let globalHistoricCases = await getHistoricCases();
                for (day in globalHistoricCases["cases"]){
                    xAxisLabels.push("\"" + day + "\"");
                    casesData.push(globalHistoricCases["cases"][`${day}`])
                }
                const historicCasesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setFooter("Crée par GalackQSM#7926")
                    .setTimestamp(message.createdAt)
                    .setTitle("Cas quotidiens des 30 derniers jours dans le monde")
                    .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cas',data:[${casesData}],fill:true,backgroundColor:"rgba(255,160,122,0.4)",borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicCasesEmbed);
            }
            else if (args.length == 2 && typeof(parseFloat(args[1])) === 'number') {
                let numDays = args[1];

                if (!Number.isInteger(parseFloat(numDays)))
                    return message.channel.send(`<@${message.author.id}> - Le nombre de jours doit être un entier valide.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else if (numDays > 100)
                    return message.channel.send(`<@${message.author.id}> - Je ne peux afficher que les données des 100 derniers jours.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else if (numDays < 2)
                    return message.channel.send(`<@${message.author.id}> - Le nombre de jours spécifié doit être d'au moins 2.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else {
                    let dayCasesData = [];
                    let xAxisLabels = [];

                    let getDayHistoricCases = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/all?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - erreur`)
                            }
                        }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                        return data = response.data;
                    }
                    let globalDayHistoricCases = await getDayHistoricCases();
                    for (day in globalDayHistoricCases["cases"]){
                        xAxisLabels.push("\"" + day + "\"");
                        dayCasesData.push(globalDayHistoricCases["cases"][`${day}`])
                    }
                    const historicCasesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setFooter("Crée par GalackQSM#7926")
                    .setTimestamp(message.createdAt)
                    .setTitle(`Tendance des cas quotidiens pour les ${numDays} derniers jours dans le monde`)
                    .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cas',data:[${dayCasesData}],fill:true,backgroundColor:"rgba(255,160,122,0.4)",borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicCasesEmbed);
                }
            }
            else if (args.length >= 3 && typeof(parseFloat(args[1]) === 'number') && /^[a-zA-Z\s]*$/i.test(args.slice(2).join(" "))) {
                let countryName = args.slice(2).join(" ");
                let numDays = args[1];

                if (!Number.isInteger(parseFloat(numDays)) && !isNaN(numDays))
                    return message.channel.send(`<@${message.author.id}> - Le nombre de jours doit être un entier valide.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else if (numDays > 100) 
                    return message.channel.send(`<@${message.author.id}> - Je ne peux afficher que les données des 100 derniers jours.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);

                else if (numDays < 2) 
                    return message.channel.send(`<@${message.author.id}> - Le nombre de jours spécifié doit être d'au moins 2.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else {
                    let countryCasesData = [];
                    let xAxisLabels = [];

                    let getCountryHistoricCases = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - Veuillez entrer un pays valide.`)
                            }
                        }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                        return data = response.data;
                    }
                    let historicCountryCases = await getCountryHistoricCases();
                    for (day in historicCountryCases["timeline"]["cases"]){
                        xAxisLabels.push("\"" + day + "\"");
                        countryCasesData.push(historicCountryCases["timeline"]["cases"][`${day}`])
                    }
                    const historicCasesEmbed = new Discord.MessageEmbed()
                        .setTimestamp(message.createdAt)
                        .setFooter("Crée par GalackQSM#7926")
                        .setTitle(`Cas quotidiens des ${numDays} derniers jours ${historicCountryCases["country"]}`)
                        .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Cases',data:[${countryCasesData}],fill:true,backgroundColor:"rgba(255,160,122,0.4)",borderColor:"rgb(255,160,122)",pointBackgroundColor:"rgb(255,160,122)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicCasesEmbed);
                } 
            } else 
                return message.channel.send(`<@${message.author.id}> - La syntaxe de la commande est ` + "```" + "+cases [historique/hs] [nombre de jours] [pays]" + "```").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
        } else 
            return message.channel.send(" <@" + message.author.id +"> - Veuillez saisir un argument valide, faite `" + prefix1 + "help` pour obtenir de l'aide sur les commandes.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
}       
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}