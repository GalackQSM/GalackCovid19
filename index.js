require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const { readdirSync } = require('fs');
const chalk = require('chalk');
const prefix1 = "+";

client.commands = new Discord.Collection();
const commandFiles = readdirSync('./commands/').filter(file => file.endsWith(".js"));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(file);
}

  client.on('ready', msg => {
  console.log("");                                   
  console.log((chalk.cyan(`                                 #####                                      #####                           #    #####  `)));
  console.log((chalk.cyan(`                                #     #   ##   #        ##    ####  #    # #     #  ####  #    # # #####   ##   #     #  `)));
  console.log((chalk.cyan(`                                #        #  #  #       #  #  #    # #   #  #       #    # #    # # #    # # #   #     # `)));
  console.log((chalk.cyan(`                                #  #### #    # #      #    # #      ####   #       #    # #    # # #    #   #    ###### `)));
  console.log((chalk.cyan(`                                #     # ###### #      ###### #      #  #   #       #    # #    # # #    #   #         # `)));
  console.log((chalk.cyan(`                                #     # #    # #      #    # #    # #   #  #     # #    #  #  #  # #    #   #   #     # `)));
  console.log((chalk.cyan(`                                 #####  #    # ###### #    #  ####  #    #  #####   ####    ##   # #####  #####  #####  `)));
  console.log("");                                  
  console.log((chalk.yellow(`                                                               Crée par GalackQSM#7926 !`)));  
  console.log((chalk.yellow(`                                                                © 2020 GalackQSM, Inc.`))); 
  console.log("");                                   
  console.log((chalk.red(`                                                         Discord: https://discord.gg/XH7zQ8s`)));   
  console.log((chalk.red(`                                                       Twitter: https://twitter.com/Galack_QSM`)));   
  console.log((chalk.red(`                                                        Github: https://github.com/GalackQSM`)));   
  console.log("");                                  

  console.log(`Statistiques globales : \n\nLe bot a un total de ${client.guilds.cache.size} serveurs. \nPour un total de ${client.users.cache.size} membres.`)
  console.log("Connecté en tant que " + client.user.id + " | Prefix : " + prefix1 + " | Nombre de Serveurs "+ client.guilds.cache.size +" | Nombres de salons "+ client.channels.cache.size +" | Utilisateur totaux "+ client.users.cache.size +" | Nombre d'emojis totaux "+ client.emojis.cache.size +'');
  client.user.setActivity("+help - GalackCovid19");
});

client.on("message", async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.toLowerCase().slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "deaths") {
        client.commands.get("deaths").execute(message, args);
    }
    else if (command === "recovered") {
        client.commands.get("recovered").execute(message, args);
    }
    else if (command === "cases") {
        client.commands.get("cases").execute(message, args);
    }
    else if (command === "leaderboard") {
        client.commands.get("leaderboard").execute(message, args);
    }
    else if (command === "help") {
        client.commands.get("help").execute(message, args);
    }
});

client.login("Token");