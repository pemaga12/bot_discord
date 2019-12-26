const Discord = require("discord.js");
const  client = new Discord.Client();

//Reference to config.json
const config = require("./config.json");

//Prefix used by the bot
const prefix = config.prefix;

//vars used
var ip = 0;
var url = "https://mcapi.us/server/status?ip=";
var request = require('request');

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
  
  else if (message.content.startsWith(prefix + "set")) {
    var messagesp = message.content.split(" ");
    ip = messagesp[1];
    url = "https://mcapi.us/server/status?ip=" + ip;
    message.channel.send("se ha configurado la ip "+ ip + " al bot 👍");
  }

  else if (message.content.startsWith(prefix + "status")) {
    request(url, function(err, response, body){
      if(err) {
        console.log(err);
      }
      body = JSON.parse(body);
      if(body.online){
        const embed = new Discord.RichEmbed() 
        .setTitle("Estado del servidor")
        .setColor(0x00AE86)
        .setFooter(client.user.username, client.user.avatarURL)
        .addField("Estado del servidor:", "Online :white_check_mark:")
        .addField("Nombre del servidor:", body.motd)
        .addField("Versión del servidor:", body.server.name)
        .addField("Numero de jugadores:", "hay " + body.players.now + " jugando de " + body.players.max,)
        message.channel.send({embed});
      }
      else if (!body.online){
        message.channel.send("El servidor no se encuentra disponible...")
      }
    })
  }
  

  
});
client.login(config.token);   