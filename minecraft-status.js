const Discord = require("discord.js");
const  client = new Discord.Client();

//Reference to config.json
const config = require("./config.json");

//Prefix used by the bot
const prefix = config.prefix;

//vars used
var ip = 0;
var url = "http://mcapi.us/server/status?ip=";
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
    url += ip;
    message.channel.send("se ha configurado la ip "+ ip + url + " al bot 👍");
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
        .setFooter(client.user.avatarURL, client.user.username)
        .addField("Estado del servidor: Online :white_check_mark:", true)
        .addBlankField(true)
        .addField("Nombre del servidor: " + body.motd, true)
        .addBlankField(true)
        .addField("Hay " + body.players.now + " jugando de " + body.players.max, true)
        message.channel.send({embed});
      }
      else{
        message.channel.send("El servidor no se encuentra disponible...")
      }
    })
  }
  

  
});
client.login(config.token);   