const axios = require("axios");
const Discord = require("discord.js");
const prefix1 = "+";

module.exports = {
    name: "deaths",
    description: "Fournit des données mises à jour quotidiennement sur les décès liés au COVID-19 dans le monde",
    async execute(message, args){
        if (!args.length) {
            let getTotalDeaths = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                let deaths = response.data;
                return deaths;
            }
            let totalDeaths = await getTotalDeaths();

            const deathsEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Globalement, ${numberWithCommas(totalDeaths["deaths"])} des personnes sont décédées des suites du COVID-19.`)
                    .setFooter(`Dernière mise à jour le ${new Date(totalDeaths["updated"]).toLocaleString()}`);

            return message.channel.send(deathsEmbed);
        }
        // Deaths TODAY
        else if ((args[0] === "aujourd'hui" || args[0] === "td")) {
            if (args.length == 1) {
                let getDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    let deaths = response.data;
                    return deaths;
                }
                let info = await getDeaths();

                const deathsEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Aujourd'hui, ${numberWithCommas(info["todayDeaths"])} des personnes sont décédées des suites du COVID-19.`)
                    .setFooter(`Dernière mise à jour le ${new Date(info["updated"]).toLocaleString()}`);

                return message.channel.send(deathsEmbed);
            }
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=false&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Veuillez entrer un pays valide.`)
                        }
                    }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                    return deaths = response.data;
                }
                let info = await getDeaths();

                const deathsEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Aujourd'hui, ${numberWithCommas(info["todayDeaths"])} personnes sont décédées des suites du COVID-19 en ${info["country"]}.`)
                    .setFooter(`Dernière mise à jour le ${new Date(info["updated"]).toLocaleString()}`);

                return message.channel.send(deathsEmbed);
            }
        }
        else if (args[0] === "hier" || args[0] === "ytd") {
            if (args.length == 1) {
                let getDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                    return deaths = response.data;
                }
                let info = await getDeaths();

                const deathsEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Hier, ${numberWithCommas(info["todayDeaths"])} personnes sont décédées des suites du COVID-19.`)
                    .setFooter(`Dernière mise à jour le ${new Date(info["updated"]).toLocaleString()}`);

                return message.channel.send(deathsEmbed);
            }
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=true&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Veuillez entrer un pays valide.`)
                        }
                    }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                    return deaths = response.data;
                }
                let info = await getDeaths();

                const deathsEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTitle(`Hier, ${numberWithCommas(info["todayDeaths"])} personnes sont décédées des suites du COVID-19 en ${info["country"]}.`)
                    .setFooter(`Dernière mise à jour le ${new Date(info["updated"]).toLocaleString()}`);

                return message.channel.send(deathsEmbed);
            }
            else {
                return message.channel.send(`<@${message.author.id}> - Arguments non valides. faite +help pour obtenir de l'aide sur les commandes.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
            }
        }
        else if (args[0] === "historique" || args[0] === "hs") {
            if (args.length == 1) {
                let deathData = [];
                let xAxisLabels = [];

                let getHistoricDeaths = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                    return historicDeaths = response.data;
                }
                let info = await getHistoricDeaths();
                for (day in info["deaths"]){
                    xAxisLabels.push("\"" + day + "\"");
                    deathData.push(info["deaths"][`${day}`])
                }
                const historicDeathEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTimestamp(message.createdAt)
                    .setFooter("Crée par GalackQSM#7926")
                    .setTitle("Décès historiques des 30 derniers jours dans le monde")
                    .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Décès',data:[${deathData}],fill:true,backgroundColor:"rgba(178,34,34,0.4)",borderColor:"rgb(178,34,34)",pointBackgroundColor:"rgb(178,34,34)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicDeathEmbed);
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
                    let dayDeathData = [];
                    let xAxisLabels = [];

                    let getDayHistoricDeaths = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/all?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - erreur`)
                            }
                        }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                        return data = response.data;
                    }
                    let historicDayDeaths = await getDayHistoricDeaths();
                    for (day in historicDayDeaths["deaths"]){
                        xAxisLabels.push("\"" + day + "\"");
                        dayDeathData.push(historicDayDeaths["deaths"][`${day}`])
                    }
                    const historicDeathEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTimestamp(message.createdAt)
                    .setFooter("Crée par GalackQSM#7926")
                    .setTitle(`Décès historiques des derniers ${numDays} jours dans le monde`)
                    .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Décès',data:[${dayDeathData}],fill:true,backgroundColor:"rgba(178,34,34,0.4)",borderColor:"rgb(178,34,34)",pointBackgroundColor:"rgb(178,34,34)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicDeathEmbed);
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
                    let countryDeathData = [];
                    let xAxisLabels = [];

                    let getCountryHistoricDeaths = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(`<@${message.author.id}> - Veuillez entrer un pays valide.`)
                            }
                        }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                        return data = response.data;
                    }
                    let historicCountryDeaths = await getCountryHistoricDeaths();
                    for (day in historicCountryDeaths["timeline"]["deaths"]){
                        xAxisLabels.push("\"" + day + "\"");
                        countryDeathData.push(historicCountryDeaths["timeline"]["deaths"][`${day}`])
                    }
                    const historicDeathEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setTimestamp(message.createdAt)
                        .setFooter("Crée par GalackQSM#7926")
                        .setTitle(`Décès historiques des derniers ${numDays} jours en ${historicCountryDeaths["country"]}`)
                        .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Décès',data:[${countryDeathData}],fill:true,backgroundColor:"rgba(178,34,34,0.4)",borderColor:"rgb(178,34,34)",pointBackgroundColor:"rgb(178,34,34)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicDeathEmbed);
                } 
            } else 
                return message.channel.send(`<@${message.author.id}> - La syntaxe de la commande est ` + "```" + "" + prefix1 + "deaths [historique/hs] [nombre de jours] [pays]" + "```").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
        } else 
            return message.channel.send(" <@" + message.author.id +"> - Veuillez saisir un argument valide, faite `" + prefix1 + "help` pour obtenir de l'aide sur les commandes.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
}
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}