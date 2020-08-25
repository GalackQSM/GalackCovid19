const Discord = require('discord.js');
const prefix1 = "+";
const botname = "GalackCovid19";

module.exports = {
    name: "help",
    description: "Fournit des informations sur toutes les fonctions de GalackCovid19",
    async execute(message, args){
        
        if (!args.length){
            const helpMenuEmbed = new Discord.MessageEmbed()
                .setTitle("Panel d'aide de " + botname + "")
                .setColor("#990000")
                .setFooter("Crée par GalackQSM#7926")
                .setTimestamp(message.createdAt)
                .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                .addFields(
                    { name: "Besoin d'aide? faite " + prefix1 + "help [commande] pour plus d\'informations!", value: "\u200b" },
                    { name: "```" + "" + prefix1 + "deaths" + "```", value: 'Fournit des informations sur les décès dus au COVID-19' },
                    { name: "```" + "" + prefix1 + "recovered" + "```", value: 'Fournit des informations sur les récupérations de COVID-19' },
                    { name: "```" + "" + prefix1 + "cases" + "```", value: 'Fournit des informations sur les cas de COVID-19'},
                    { name: "```" + "" + prefix1 + "leaderboard" + "```", value: 'Affiche les 10 principaux pays de chaque catégorie statistique'}
                    );

            return message.channel.send(helpMenuEmbed);
        }
        else if (args.length == 1) {
            if (args[0] === "deaths"){
                const deathHelpEmbed = new Discord.MessageEmbed()
                .setTitle("Panel d'aide sur la commande " + prefix1 + "deaths")
                .setColor("#990000")
                .setFooter("Crée par GalackQSM#7926")
                .setTimestamp(message.createdAt)
                .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                .addFields(
                    { name: "Voici les informations sur la commande " + prefix1 + "deaths !", value: "\u200b" },
                    { name: "```" + "" + prefix1 + "deaths" + "```", value: 'Renvoie le nombre total de décès dans le monde' },
                    { name: "```" + "" + prefix1 + "deaths [aujourd'hui/td]" + "```", value: 'Renvoie le nombre total de décès aujourd`\'hui dans le monde' },
                    { name: "```" + "" + prefix1 + "deaths [aujourd'hui/td] [Pays]" + "```", value: 'Renvoie le nombre total de décès aujourd\'hui dans un pays spécifié'},
                    { name: "```" + "" + prefix1 + "deaths [hier/ytd]" + "```", value: 'Renvoie le nombre total de décès d\'hier dans le monde' },
                    { name: "```" + "" + prefix1 + "deaths [hier/ytd] [Pays]" + "```", value: 'Renvoie le nombre total de décès d\'hier dans un pays spécifié'},
                    { name: "```" + "" + prefix1 + "deaths [historique/hs]" + "```", value: 'Renvoie le graphique des nombres de décès historiques des 30 derniers jours dans le monde' },
                    { name: "```" + "" + prefix1 + "deaths [historique/hs] [nombre de jours]" + "```", value: 'Renvoie le graphique des nombres de décès historiques pour les derniers [nombre de jours] dans le monde'},
                    { name: "```" + "" + prefix1 + "deaths [historique/hs] [nombre de jours] [Pays]" + "```", value: 'Renvoie le graphique des nombres de décès historiques pour les [nombre de jours] passés dans un pays spécifié'}
                    );

                return message.channel.send(deathHelpEmbed);
            }
            else if (args[0] === "recovered"){
                const recoveredHelpEmbed = new Discord.MessageEmbed()
                .setTitle("informations sur la commande " + prefix1 + "recovered !")
                .setColor("#990000")
                .setFooter("Crée par GalackQSM#7926")
                .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                .setTimestamp(message.createdAt)
                .addFields(
                    { name: "```" + "" + prefix1 + "recovered" + "```", value: 'Renvoie le nombre total de récupérations de cas COVID-19 dans le monde' },
                    { name: "```" + "" + prefix1 + "recovered [aujourd'hui/td]" + "```", value: 'Renvoie le nombre total de récupérations de cas de COVID-19 aujourd\'hui dans le monde' },
                    { name: "```" + "" + prefix1 + "recovered [aujourd'hui/td] [Pays]" + "```", value: 'Renvoie le nombre total de récupérations de cas de COVID-19 aujourd\'hui dans un pays spécifié'},
                    { name: "```" + "" + prefix1 + "recovered [hier/ytd]" + "```", value: 'Renvoie le nombre total de récupérations de cas COVID-19 dans le monde' },
                    { name: "```" + "" + prefix1 + "recovered [hier/ytd] [Pays]" + "```", value: 'Renvoie le nombre total de récupérations de cas COVID-19 dans un pays spécifié'},
                    { name: "```" + "" + prefix1 + "recovered [historique/hs]" + "```", value: 'Renvoie le graphique des chiffres de récupération historiques des 30 derniers jours dans le monde' },
                    { name: "```" + "" + prefix1 + "recovered [historique/hs] [nombre de jours]" + "```", value: 'Renvoie le graphique des chiffres de récupération historiques pour le passé [nombre de jours] dans le monde'},
                    { name: "```" + "" + prefix1 + "recovered [historique/hs] [nombre de jours] [Pays]" + "```", value: 'Renvoie le graphique des chiffres de récupération historiques pour le [nombre de jours] passé dans un pays spécifié'}
                    );

                return message.channel.send(recoveredHelpEmbed);
            }
            else if (args[0] === "cases"){
                const casesHelpEmbed = new Discord.MessageEmbed()
                .setTitle("informations sur la commande " + prefix1 + "cases !")
                .setColor("#990000")
                .setFooter("Crée par GalackQSM#7926")
                .setTimestamp(message.createdAt)
                .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                .addFields(
                    { name: "```" + "" + prefix1 + "cases" + "```", value: 'Renvoie le nombre total de cas COVID-19 dans le monde' },
                    { name: "```" + "" + prefix1 + "cases [aujourd'hui/td]" + "```", value: 'Renvoie le nombre total de nouveaux cas de COVID-19 aujourd\'hui dans le monde' },
                    { name: "```" + "" + prefix1 + "cases [aujourd'hui/td] [Pays]" + "```", value: 'Renvoie le nombre total de nouveaux cas de COVID-19 aujourd\'hui dans un pays spécifié'},
                    { name: "```" + "" + prefix1 + "cases [hier/ytd]" + "```", value: 'Renvoie le nombre total de nouveaux cas COVID-19 dans le monde' },
                    { name: "```" + "" + prefix1 + "cases [hier/ytd] [Pays]" + "```", value: 'Renvoie le nombre total de nouveaux cas COVID-19 plus élevé dans un pays spécifié'},
                    { name: "```" + "" + prefix1 + "cases [historique/hs]" + "```", value: 'Renvoie le graphique des nombres de cas des 30 derniers jours dans le monde' },
                    { name: "```" + "" + prefix1 + "cases [historique/hs] [nombre de jours]" + "```", value: 'Renvoie le graphique des nombres de cas pour le passé [nombre de jours] globalement'},
                    { name: "```" + "" + prefix1 + "cases [historique/hs] [nombre de jours] [Pays]" + "```", value: 'Renvoie le graphique des nombres de cas pour le [nombre de jours] passé dans un pays spécifié'}
                    );

                return message.channel.send(casesHelpEmbed);
            }
            else if (args[0] === "leaderboard"){
                const leaderboardHelpEmbed = new Discord.MessageEmbed()
                .setTitle("informations sur la commandes " + prefix1 + "leaderboard !")
                .setColor("#990000")
                .setImage("https://www.ovpm.org/wp-content/uploads/2020/03/chla-what-you-should-know-covid-19-1200x628-01.jpg")
                .setFooter("Crée par GalackQSM#7926")
                .setTimestamp(message.createdAt)
                .addFields(
                    { name: "```" + "" + prefix1 + "leaderboard" + "```", value: 'Renvoie une liste des 10 premiers pays en tête du nombre de cas de COVID-19, de décès liés au COVID-19 et de récupérations de cas de COVID-19' }
                );

                return message.channel.send(leaderboardHelpEmbed);
            } else {
                return message.channel.send("Commande inconnue. Veuillez taper `" + prefix1 + "help` pour afficher toutes les commandes disponibles.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
            }
        }
        else if (args.length > 1){
            return message.channel.send("Trop d'arguments, faite `" + prefix1 + "help [commande]` pour obtenir plus d'informations sur une commande spécifique.").then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
        }
    }
}