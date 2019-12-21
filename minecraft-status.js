const Discord = require("discord.js");
const  client = new Discord.Client();

//Reference to config.json
const config = require("./config.json");

//Prefix used by the bot
const prefix = config.prefix;

client.on("ready", () => {
   console.log("Im ready!");
});
client.on("message", (message) => {
  if (message.content.startsWith(prefix + "help")) {
    message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Lista de comandos disponibles",
        fields: [{
            name: prefix + "set",
            value: "Comando usado para configurar la ip que usará el bot"
          },
          {
            name: prefix + "status",
            value: "Comando con el que se mostrará información sobre el estado del servidor"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
        }
      }
    });
  }
});
client.login(config.token);   