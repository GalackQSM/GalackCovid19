const axios = require("axios");
const Discord = require("discord.js");
const prefix1 = "+";

module.exports = {
    name: "recovered",
    description: "Fournit des données mises à jour quotidiennement sur les récupérations de cas de COVID-19 dans le monde",
    async execute(message, args) {
        if (!args.length) {
            let getTotalRecovered = async () => {
                let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                return recovered = response.data;
            }
            let totalRecovered = await getTotalRecovered();

            const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                    .setFooter("Crée par GalackQSM#7926")
                    .setTitle(`Dans le monde, ${numberWithCommas(totalRecovered["recovered"])} les gens se sont remis du COVID-19.`)
                    .setFooter(`Dernière mise à jour le ${new Date(totalRecovered["updated"]).toLocaleString()}`);

            return message.channel.send(recoveredEmbed);
        }
        else if (args[0] === "aujourd'hui" || args[0] === "td"){
            if (args.length == 1) {
                let getTodayRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=false");
                    return data = response.data;
                }
                let todayRecovered = await getTodayRecovered();

                const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                    .setFooter("Crée par GalackQSM#7926")
                    .setTitle(`Aujourd'hui, ${numberWithCommas(todayRecovered["todayRecovered"])} les gens se sont remis du COVID-19.`)
                    .setFooter(`Dernière mise à jour le ${new Date(todayRecovered["updated"]).toLocaleString()}`);
                
                return message.channel.send(recoveredEmbed);
            }
            else if (args.length >= 2){
                let country = args.slice(1).join(" ");

                let getTodayRecoveredCountry = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=false&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(`<@${message.author.id}> - Veuillez entrer un pays valide.`)
                        }
                    }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                    return data = response.data;
                }
                let todayRecoveredCountry = await getTodayRecoveredCountry();

                const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                    .setFooter("Crée par GalackQSM#7926")
                    .setTitle(`Aujourd'hui, ${numberWithCommas(todayRecoveredCountry["todayRecovered"])} personnes se sont remises du COVID-19 en ${todayRecoveredCountry["country"]}.`)
                    .setFooter(`Dernière mise à jour le ${new Date(todayRecoveredCountry["updated"]).toLocaleString()}`);

                return message.channel.send(recoveredEmbed);
            }
        }
        else if (args[0] === "hier" || args[0] === "ytd") {
            if (args.length == 1) {
                let getYTDRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/all?yesterday=true");
                    return data = response.data;
                }
                let totalYTDRecovered = await getYTDRecovered();

                const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                    .setFooter("Crée par GalackQSM#7926")
                    .setTitle(`Hier, ${numberWithCommas(totalYTDRecovered["todayRecovered"])} personnes récupérées du COVID-19.`)
                    .setFooter(`Dernière mise à jour le ${new Date(totalYTDRecovered["updated"]).toLocaleString()}`);

                return message.channel.send(recoveredEmbed);
            }
            else if (args.length >= 2) {
                let country = args.slice(1).join(" ");

                let getYTDCountryRecovered = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=true&strict=true&query").catch(err =>{
                        if (err.response){
                            message.channel.send(" <@" + message.author.id + "> - Veuillez entrer un pays valide.")
                        }
                    }).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                    return data = response.data;
                }
                let totalYTDCountryRecovered = await getYTDCountryRecovered();

                const recoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                    .setFooter("Crée par GalackQSM#7926")
                    .setTitle(`Hier, ${numberWithCommas(totalYTDCountryRecovered["todayRecovered"])} personnes récupérées du COVID-19 en ${totalYTDCountryRecovered["country"]}.`)
                    .setFooter(`Veuillez entrer un pays valide ${new Date(totalYTDCountryRecovered["updated"]).toLocaleString()}`);

                return message.channel.send(recoveredEmbed);
            }
            else {
                return message.channel.send(" <@" + message.author.id + "> - Arguments non valides. faite " + prefix1 + "help pour obtenir de l'aide sur les commandes.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
            }
        }
        else if (args[0] === "historique" || args[0] === "hs") {
            if (args.length == 1) {
                let xAxisLabels = [];
                let recoveryData = [];

                let getHistoricRecoveries = async () => {
                    let response = await axios.get("https://corona.lmao.ninja/v2/historical/all");
                    return data = response.data;
                }
                let historicRecoveries = await getHistoricRecoveries();
                for (day in historicRecoveries["recovered"]){
                    xAxisLabels.push("\"" + day + "\"");
                    recoveryData.push((historicRecoveries["recovered"][`${day}`]));
                }
                const historicRecoveriesEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setTimestamp(message.createdAt)
                    .setFooter("Crée par GalackQSM#7926")
                    .setTitle("Récupérations de COVID-19 au cours des 30 derniers jours dans le monde")
                    .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Récupérations',data:[${recoveryData}],fill:true,backgroundColor:"rgba(30,144,255,0.4)",borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                return message.channel.send(historicRecoveriesEmbed);
            }
            else if (args.length == 2 && typeof(parseFloat(args[1])) === 'number') {
                let numDays = args[1];

                if (!Number.isInteger(parseFloat(numDays)))
                    return message.channel.send(" <@" + message.author.id + "> - Le nombre de jours doit être un entier valide.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else if (numDays > 100)
                    return message.channel.send(" <@" + message.author.id + "> - Je ne peux afficher que les données des 100 derniers jours.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else if (numDays < 2)
                    return message.channel.send(" <@" + message.author.id + "> - Le nombre de jours spécifié doit être d'au moins 2.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else {
                    let dayRecoveryData = [];
                    let xAxisLabels = [];

                    let getDayHistoricRecoveries = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/all?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                message.channel.send(" <@" + message.author.id + "> - erreur")
                            }
                        });
                        return data = response.data;
                    }
                    let historicDayRecoveries = await getDayHistoricRecoveries();
                    for (day in historicDayRecoveries["recovered"]){
                        xAxisLabels.push("\"" + day + "\"");
                        dayRecoveryData.push(historicDayRecoveries["recovered"][`${day}`])
                    }
                    const historicRecoveredEmbed = new Discord.MessageEmbed()
                    .setColor("#990000")
                    .setFooter("Crée par GalackQSM#7926")
                    .setTimestamp(message.createdAt)
                    .setTitle(`Décès historiques pour le passé ${numDays} Jours dans le monde`)
                    .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Récupérations',data:[${dayRecoveryData}],fill:true,backgroundColor:"rgba(30,144,255,0.4)",borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)

                    return message.channel.send(historicRecoveredEmbed);
                }
            }
            else if (args.length >= 3 && typeof(parseFloat(args[1]) === 'number') && /^[a-zA-Z\s]*$/i.test(args.slice(2).join(" "))) {
                let countryName = args.slice(2).join(" ");
                let numDays = args[1];

                if (!Number.isInteger(parseFloat(numDays)) && !isNaN(numDays))
                    return message.channel.send(" <@" + message.author.id + "> - Le nombre de jours doit être un entier valide.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else if (numDays > 100) 
                    return message.channel.send(" <@" + message.author.id + "> - Je ne peux afficher que les données des 100 derniers jours.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else if (numDays < 2) 
                    return message.channel.send(" <@" + message.author.id + "> - Le nombre de jours spécifié doit être d'au moins 2.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                else {
                    let countryRecoveryData = [];
                    let xAxisLabels = [];

                    let getCountryHistoricRecoveries = async () => {
                        let response = await axios.get("https://corona.lmao.ninja/v2/historical/" + countryName + "?lastdays=" + numDays).catch(err =>{
                            if (err.response){
                                return message.channel.send(" <@" + message.author.id + "> - Veuillez entrer un pays valide.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
                            }
                        });
                        return data = response.data;
                    }
                    let historicCountryRecoveries = await getCountryHistoricRecoveries();
                    for (day in historicCountryRecoveries["timeline"]["recovered"]){
                        xAxisLabels.push("\"" + day + "\"");
                        countryRecoveryData.push(historicCountryRecoveries["timeline"]["recovered"][`${day}`])
                    }        
                    const historicRecoveriesEmbed = new Discord.MessageEmbed()
                        .setColor("#990000")
                        .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                        .setFooter("Crée par GalackQSM#7926")
                        .setTimestamp(message.createdAt)
                        .setTitle(`Récupérations historiques pour le passé ${numDays} Days in ${historicCountryRecoveries["country"]}`)
                        .setImage(`https://quickchart.io/chart?w=500&h=350&c={type:'line',data:{labels:[${xAxisLabels}],datasets:[{label:'Recoveries',data:[${countryRecoveryData}],fill:true,backgroundColor:"rgba(30,144,255,0.4)",borderColor:"rgb(30,144,255)",pointBackgroundColor:"rgb(30,144,255)"}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{yAxes:[{ticks:{fontColor:"white",beginAtZero:false,fontSize:16}}],xAxes:[{ticks:{fontColor:"white",fontSize:16}}]}}}`)
    
                    return message.channel.send(historicRecoveriesEmbed);
                }                
            } else 
                return message.channel.send(`<@${message.author.id}> - La syntaxe de la commande est ` + "```" + "" + prefix1 + "recovered [historique/hs] [nombre de jours] [pays]" + "```").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
        } else 
            return message.channel.send(" <@" + message.author.id +"> - Veuillez saisir un argument valide, faite `" + prefix1 + "help` pour obtenir de l'aide sur les commandes.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
}
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}