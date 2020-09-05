const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const client = new Discord.Client();
const config = require("./package.json");

var userData = JSON.parse(fs.readFileSync('userData.json'));
var extraVars = JSON.parse(fs.readFileSync('extraVars.json'));

var moneyfrommessages = 100; // how much money you earn for 'messagesformoney' messages (50)
var messagesformoney = 10; // how much messages you need to send to earn 'moneyfrommessages' money
var increaseperlevel = 15; // how many extra messages you need to level up to next level
var maxmessages = 200; // limit of messaging for leveling up, or else it keeps doubling onwards
var collecttime = 300000; // amount of time you will get $ in, is in ticks so every 1000 is 1 second (225000)
var collectamount = 1; // amount of money you get every (collecttime) time
var reacttime = 21600000; // time between quick react games
var secretwords = ["today's going to be a great day", "pls no taser me", "quick reacts dont allow emojis :(", "baby shark dododododododo", "a new bot, a new world", "give me the p l a n t.", "#teamtrees - go donate to teamtrees.org dammit", "save the trees and you keep your knees"];
var secretrewards = ["$50", "$75", "$75", "$100", "$150", "a common bomb", "a common ricochet", "a rare taser", "an epic gun", "1:trophy:"]
const reason = "REG";

const commonboxprice = 130; // 125
const rareboxprice = 180; // 175
const epicboxprice = 260; // 275
const legendaryboxprice = 400; // 450
const petboxprice = 100; // amount pet boxes are
const petboxincrement = 30; // amount pet boxes get more expensive by
// maximum price for pet boxes = 100 + (30 * 15) = $550
const maxpetlevels = 16; // max pet levels for all pets, keep in mind they start at level 1 (ex: 11 means 10 level ups)

const noteam = "fi0vaj38al3n1mf";

var commonboxitemrarity = ["common", "common", "common", "common", "common", "common", "common", "common", "common", "rare"]; // Types of items you can get from common box or a kill.
var rareboxitemrarity = ["rare", "rare", "rare", "rare", "rare", "rare", "rare", "rare", "rare", "rare", "epic"];
var epicboxitemrarity = ["epic", "epic", "epic", "epic", "epic", "epic", "epic", "epic", "epic", "epic", "legendary"]
var legendaryboxitemrarity = ["legendary"];
var killchances = ["common", "common", "rare", "rare", "rare", "epic", "epic", "epic", "legendary", "legendary"];

var commonchances = ["dagger", "bomb", "ricochet"]; // If you pull a common box.
var rarechances = ["taser", "molotov", "bow"]; // If you pull a rare box.
var epicchances = ["gun", "staff", "shield"]; // If you pull an epic box.
var legendarychances = ["flamethrower", "whirlwind"]; // If you pull a legendary box.
var petboxchances = ["Akira", "Waltz", "Lupin", "Flipp", "Raive", "Byte"]; // If you unlock a pet box.

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://future-bot-2.glitch.me/`);
}, 280000);

function setstats() {
  var Count;
  for (Count in client.users.array()) {
    var User = client.users.array()[Count];
    if (!User.bot) {
      if (!userData[User.id]) userData[User.id] = {};
      if (!userData[User.id].money) userData[User.id].money = 500;
      if (!userData[User.id].dailyWord) userData[User.id].dailyWord = "None";
      if (!userData[User.id].messages) userData[User.id].messages = 0;
      if (!userData[User.id].kills) userData[User.id].kills = 0;
      if (!userData[User.id].bombs) userData[User.id].bombs = 0;
      if (!userData[User.id].daggers) userData[User.id].daggers = 0;
      if (!userData[User.id].ricochets) userData[User.id].ricochets = 0;
      if (!userData[User.id].bows) userData[User.id].bows = 0;
      if (!userData[User.id].tasers) userData[User.id].tasers = 0;
      if (!userData[User.id].molotovs) userData[User.id].molotovs = 0;
      if (!userData[User.id].crowbars) userData[User.id].crowbars = 0;
      if (!userData[User.id].guns) userData[User.id].guns = 0;
      if (!userData[User.id].staffs) userData[User.id].staffs = 0;
      if (!userData[User.id].shields) userData[User.id].shields = 0;
      if (!userData[User.id].flamethrowers) userData[User.id].flamethrowers = 0;
      if (!userData[User.id].whirlwinds) userData[User.id].whirlwinds = 0;
      if (!userData[User.id].shieldactivated) userData[User.id].shieldactivated = 0;
      if (!userData[User.id].tasertime) userData[User.id].tasertime = "None";
      if (!userData[User.id].health) userData[User.id].health = 100;
      if (!userData[User.id].selectedpet) userData[User.id].selectedpet = "None";
      if (!userData[User.id].akira) userData[User.id].akira = 0;
      if (!userData[User.id].waltz) userData[User.id].waltz = 0;
      if (!userData[User.id].lupin) userData[User.id].lupin = 0;
      if (!userData[User.id].flipp) userData[User.id].flipp = 0;
      if (!userData[User.id].raive) userData[User.id].raive = 0;
      if (!userData[User.id].byte) userData[User.id].byte = 0;
      if (!userData[User.id].maxhealth) userData[User.id].maxhealth = 100;
      if (!userData[User.id].extrastrength) userData[User.id].extrastrength = 0;
      if (!userData[User.id].dodgechance) userData[User.id].dodgechance = 0;
      if (!userData[User.id].luckchance) userData[User.id].luckchance = 0;
      if (!userData[User.id].petboxes) userData[User.id].petboxes = 0;
      if (!userData[User.id].team) userData[User.id].team = noteam;
      if (!userData[User.id].teamrole) userData[User.id].teamrole = "member";
      if (!userData[User.id].teaminvite) userData[User.id].teaminvite = noteam;
      if (!userData[User.id].teaminvitetime) userData[User.id].teaminvitetime = "none";
      if (!userData[User.id].daily) userData[User.id].daily = "none";
      if (!userData[User.id].teamdamage) userData[User.id].teamdamage = 0;
      if (!userData[User.id].level) userData[User.id].level = 1;
      if (!userData[User.id].levelmessages) userData[User.id].levelmessages = 0;
      if (!userData[User.id].nextlevel) userData[User.id].nextlevel = 15;
      if (!userData[User.id].trophies) userData[User.id].trophies = 0;
      if (!userData[User.id].dailyreward) userData[User.id].dailyreward = 75;
      if (!userData[User.id].discount) userData[User.id].discount = 0;
      if (!userData[User.id].discounttime) userData[User.id].discounttime = moment().format('L');
      if (!userData[User.id].storedmoney) userData[User.id].storedmoney = 0;
      if (!userData[User.id].maxcollectamount) userData[User.id].maxcollectamount = 150;
      if (!userData[User.id].extrafillamount) userData[User.id].extrafillamount = 0;
      if (!userData[User.id].teamlimit) userData[User.id].teamlimit = 3;
      if (!userData[User.id].missionnumber) userData[User.id].missionnumber = 1;
      if (!userData[User.id].boxesopened) userData[User.id].boxesopened = 0;
      if (!userData[User.id].weaponsused) userData[User.id].weaponsused = 0;
      if (!userData[User.id].questkills) userData[User.id].questkills = 0;
      if (!userData[User.id].legendaryboxesopened) userData[User.id].legendaryboxesopened = 0;
      if (!userData[User.id].overkill) userData[User.id].overkill = false;
      if (!userData[User.id].daggerrob) userData[User.id].daggerrob = 0;
      if (!userData[User.id].shieldsused) userData[User.id].shieldsused = 0;
      if (!userData[User.id].missedshots) userData[User.id].missedshots = 0;
      if (!userData[User.id].redemptions) userData[User.id].redemptions = 0;
      if (!userData[User.id].superoverkill) userData[User.id].superoverkill = false;
      if (!userData[User.id].petboxesopened) userData[User.id].petboxesopened = 0;
      if (!userData[User.id].flippmoney) userData[User.id].flippmoney = 0;
      if (!userData[User.id].roulettedmoney) userData[User.id].roulettedmoney = 0;
      if (!userData[User.id].quickreactsanswered) userData[User.id].quickreactsanswered = 0;
      if (!userData[User.id].lifesteal) userData[User.id].lifesteal = false;
      if (!userData[User.id].kamikaze) userData[User.id].kamikaze = false;
      if (!userData[User.id].supershopper) userData[User.id].supershopper = false;
      if (!userData[User.id].armed) userData[User.id].armed = false;
      if (!userData[User.id].bombsused) userData[User.id].bombsused = 0;
      if (!userData[User.id].megaoverkill) userData[User.id].megaoverkill = false;
      if (!userData[User.id].teamjoined) userData[User.id].teamjoined = false;
      if (!userData[User.id].nukes) userData[User.id].nukes = 0;
      if (!userData[User.id].dailiesclaimed) userData[User.id].dailiesclaimed = 0;
      if (!userData[User.id].truewinner) userData[User.id].truewinner = false;
      if (!userData[User.id].joshuapinged) userData[User.id].joshuapinged = 0;
    }
  }
}

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Use f!help.`);
  setstats();
  function loop() {
     setTimeout(function() {
      var Count;
      for (Count in client.users.array()) {
        var User = client.users.array()[Count];
        if (!User.bot) {
          if (userData[User.id].storedmoney < userData[User.id].maxcollectamount) {
            if (userData[User.id].health < 100) { userData[User.id].health += 1; }
            userData[User.id].storedmoney += collectamount + userData[User.id].extrafillamount;
            if (userData[User.id].selectedpet === "Raive") {
              userData[User.id].storedmoney += 0.15 + (userData[User.id].raive * 0.05)
            }
            if (userData[User.id].storedmoney > userData[User.id].maxcollectamount) {
              userData[User.id].storedmoney = userData[User.id].maxcollectamount; 
            }
          }
        }
      }
      loop();
    }, collecttime);
  }
  function quickreact() {
     setTimeout(function() {
      var secretword = secretwords[Math.floor(Math.random()*secretwords.length)];
      extraVars["secretword"] = secretword;
      client.channels.get('545028921259851776').send("**Quick React!**\nThe first person to say ''*" + secretword + "*'' in the chat (case sensitive) will earn a special reward! Will expire in around an hour.");
      quickreact();
    }, reacttime);
  }
  loop();
  if (extraVars["reactions"]) {
    quickreact();
  }
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  setstats();
});

client.on("guildMemberAdd", guild => {
  setstats();
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id}).`);
  setstats();
});

client.on("message", async message => {
    
  // Returns if it is a bot.
  if (message.author.bot) return;
  
  if (!message.guild) {
    console.log(message.author.username + " pmed the bot: '" + message.content + "'")
    return
  }

  // say hello there is this the real life ==> args = ["hello","there","is","this","the","real","life?"]
  // args[0] = "hello" ; args[1] = "there" ; args[2] = "is" (etc...)
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g); // This is a list.
  var command = args.shift().toLowerCase(); // Gets the command name.

  const serverinfo = "(" + message.guild.name + ") "
  const prefix = config.prefix;
  var consolelog = serverinfo + message.author.username + ": " + prefix;

  var sender = message.author;
  var msg = message.content;

  var mentioned = message.mentions.members.first();
  var mentioneduser = message.mentions.users.first();
  var userCount = message.guild.members.filter(member => !member.user.bot).size;
  
  fs.writeFile('userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  })

  fs.writeFile('extraVars.json', JSON.stringify(extraVars), (err) => {
    if (err) console.error(err);
  })

  if (userData[sender.id]) {
    if (userData[sender.id].missionnumber == 34 && "<@!491723804901507084>" == message.content) {
      userData[sender.id].joshuapinged += 1;
    }
    userData[sender.id].messages++;
    userData[sender.id].levelmessages++;
    if (message.content == extraVars["secretword"]) {
      var secretreward = secretrewards[Math.floor(Math.random()*secretrewards.length)];
      message.channel.send("<@!" + sender.id + "> was the first person to say the secret word and has earned " + secretreward + "!");
      extraVars["secretword"] = "feuhawuehf984a89nvna9o";
      userData[sender.id].quickreactsanswered += 1;
      if (secretreward == "$50") {
        userData[sender.id].money += 50;
      }
      if (secretreward == "$75") {
        userData[sender.id].money += 75;
      }
      if (secretreward == "$100") {
        userData[sender.id].money += 100;
      }
      if (secretreward == "$150") {
        userData[sender.id].money += 150;
      }
      if (secretreward == "a common bomb") {
        userData[sender.id].bombs += 1;
      }
      if (secretreward == "a common ricochet") {
        userData[sender.id].ricochets += 1;
      }
      if (secretreward == "a rare taser") {
        userData[sender.id].tasers += 1;
      }
      if (secretreward == "an epic gun") {
        userData[sender.id].guns += 1;
      }
      if (secretreward == "1:trophy:") {
        userData[sender.id].trophies += 1;
      }
    }
    if (userData[sender.id].messages % messagesformoney === 0) {
      userData[sender.id].money += moneyfrommessages;
    }
    if (userData[sender.id].levelmessages % userData[sender.id].nextlevel === 0) {
      userData[sender.id].health += 10;
      userData[sender.id].money += 100;
      userData[sender.id].level += 1;
      userData[sender.id].levelmessages = 0;
      userData[sender.id].nextlevel += increaseperlevel;
      if (userData[sender.id].nextlevel > maxmessages) {
      	userData[sender.id].nextlevel = maxmessages;
      }
      console.log(sender.username + " leveled up to level " + userData[sender.id].level + "!")
      message.channel.send({"embed": {
    	"title": "Level Up! :arrow_up:",
    	"description": "**Congratulations!** \n" + sender.username + " leveled up to level " + userData[sender.id].level + ".\nYou got $100 and +10♡!\n*" + userData[sender.id].nextlevel + " messages to next level.*",
    	"color": 9357965,
    	"thumbnail": {
    	  "url": message.author.avatarURL
    	}
      }})
      checkforrewards();
    }
  }
  
  function discount(playerid, amount) {
    if (userData[playerid].discount < amount) {
      userData[playerid].discount = amount;
      userData[playerid].discounttime = moment().format('L') 
    }
  }
  
  function checkforrewards() {
    if (userData[sender.id].level === 2) {
      grantreward("Three common bombs!", 2, "Do " + prefix + "inv to see all your items!");
      userData[sender.id].bombs += 3;
    }
    if (userData[sender.id].level === 3) {
      grantreward("+$25 from all daily gifts!", 3, "Claim one everyday with " + prefix + "daily!");
      userData[sender.id].dailyreward += 25;
    }
    if (userData[sender.id].level === 4) {
      grantreward("A 15% one day discount!", 4, "Check the cheaper shop with " + prefix + "shop!");
      discount(sender.id, 0.15);
    }
    if (userData[sender.id].level === 5) {
      grantreward("Three hundred dollars!", 5, "See your money with " + prefix + "bal!");
      userData[sender.id].money += 300;
    }
    if (userData[sender.id].level === 6) {
      grantreward("+$25 from all daily gifts!", 6, "Claim one everyday with " + prefix + "daily!");
      userData[sender.id].dailyreward += 25;
    }
    if (userData[sender.id].level === 7) {
      grantreward("Three epic guns!", 7, "Do " + prefix + "inv to see all your items!");
      userData[sender.id].guns += 3;
    }
    if (userData[sender.id].level === 8) {
      grantreward("+$50 collect storage!", 8, "Collect money every now and then with " + prefix + "collect!");
      userData[sender.id].maxcollectamount += 50;
    }
    if (userData[sender.id].level === 9) {
      grantreward("Five hundred dollars!", 9, "See your money with " + prefix + "bal!");
      userData[sender.id].money += 500;
    }
    if (userData[sender.id].level === 10) {
      grantreward("+$100 from all daily gifts!", 10, "Claim one everyday with " + prefix + "daily!");
      userData[sender.id].dailyreward += 100;
    }
    if (userData[sender.id].level === 11) {
      grantreward("+$50 collect storage!", 11, "Collect money every now and then with " + prefix + "collect!");
      userData[sender.id].maxcollectamount += 50;
    }
    if (userData[sender.id].level === 12) {
      grantreward("Five hundred dollars!", 12, "See your money with " + prefix + "bal!");
      userData[sender.id].money += 500;
    }
    if (userData[sender.id].level === 13) {
      grantreward("Three legendary flamethrowers!", 13, "Do " + prefix + "inv to see all your items!");
      userData[sender.id].flamethrowers += 3;
    }
    if (userData[sender.id].level === 14) {
      grantreward("A 40% one day discount!", 14, "Check the cheaper shop with " + prefix + "shop!");
      discount(sender.id, 0.4);
    }
    if (userData[sender.id].level === 15) {
      grantreward("An extra team member!", 15, "You can now invite 4 people to a team!");
      userData[sender.id].teamlimit = 4;
    }
    if (userData[sender.id].level === 16) {
      grantreward("Two trophies!", 16, "Redeem your trophies with " + prefix + "redeem!"); 
      userData[sender.id].trophies += 2;
    }
    if (userData[sender.id].level === 17) {
      grantreward("+$50 collect storage!", 17, "Collect money every now and then with " + prefix + "collect!");
      userData[sender.id].maxcollectamount += 50;
    }
    if (userData[sender.id].level === 18) {
      grantreward("Five hundred dollars!", 18, "See your money with " + prefix + "bal!" )
      userData[sender.id].money += 500;
    }
    if (userData[sender.id].level === 19) {
      grantreward("+$50 from collect storage!", 19, "Collect money every now and then with " + prefix + "collect!");
      userData[sender.id].maxcollectamount += 50;
    }
    if (userData[sender.id].level === 20) {
      grantreward("An extra team member!", 20, "You can now invite 5 people to a team!");
      userData[sender.id].teamlimit = 5;
    }
    if (userData[sender.id].level === 21) {
      grantreward("A 40% one day discount!", 21, "Check the cheaper shop with " + prefix + "shop!");
      discount(sender.id, 0.4);
    }
    if (userData[sender.id].level === 22) {
      grantreward("+$25 from all daily gifts!", 22, "Claim one everyday with " + prefix + "daily!");
      userData[sender.id].dailyreward += 25;
    }
    if (userData[sender.id].level === 23) {
      grantreward("Five hundred dollars!", 23, "See your money with " + prefix + "bal!");
      userData[sender.id].money += 500;
    }
    if (userData[sender.id].level === 24) {
      grantreward("Three legendary whirlwinds!", 24, "Do " + prefix + "inv to see all your items!");
      userData[sender.id].whirlwinds += 3;
    }
    if (userData[sender.id].level === 25) {
      grantreward("Three trophies!", 25, "Redeem your trophies with " + prefix + "redeem!");
      userData[sender.id].trophies += 3;
    }
  }
  
  function grantreward(reward, level, extra) {
    message.channel.send({
      "embed": {
      "title": "Level Up Reward :gift:",
      "description": "You leveled up to level " + level + "!\nAs a free reward, you got:\n**" + reward + "**\n" + extra,
      "color": 3705475
      }
    });
  }
  
  userData[sender.id].maxedpets = 0;
  if (userData[sender.id].akira = 15) { userData[sender.id].maxedpets++ };
  if (userData[sender.id].byte = 15) { userData[sender.id].maxedpets++ };
  if (userData[sender.id].waltz = 15) { userData[sender.id].maxedpets++ };
  if (userData[sender.id].raive = 15) { userData[sender.id].maxedpets++ };
  if (userData[sender.id].lupin = 15) { userData[sender.id].maxedpets++ };
  if (userData[sender.id].flipp = 15) { userData[sender.id].maxedpets++ };

  const secretword = "i love you";
  const wordreward = "$75";
  if (message.content.includes(secretword) && userData[sender.id].dailyWord != moment().format('L')) {
    userData[sender.id].dailyWord = moment().format('L');
    console.log("(" + message.guild.name + ") " + message.author.username + " found the secret word!");
    message.delete();
    message.channel.send(sender.username + " found the special secret word!");
    sender.send({embed: {
        title: "Secret Word :gift:",
        description: "You found the secret word '" + secretword + "' and have earned " + wordreward + "!"
      }})
    userData[sender.id].money += 75;
  }
  
  // Returns if doesn't start with prefix.
  if (message.content.indexOf(config.prefix) !== 0) return;
  
  if (args[0] === "sudo") {
    if (client.users.get("282319071263981568") === sender) {
      var sender = client.users.find(u => u.username === args[1]);
      args = args.slice(2);
      message.delete();
    }
  }
  
  if (command === "togglereact" || command === "togglereactions" || command === "togglereaction") {
    extraVars["reactions"] = !extraVars["reactions"];
    return message.reply("Toggled reaction messages to: " + extraVars["reactions"] + "!")
  }
  
  if (command === "start") {
    if (!userData[sender.id]) userData[sender.id] = {};
    if (!userData[sender.id].messages) userData[sender.id].messages = 0;
    if (!userData[sender.id].dailyWord) userData[sender.id].dailyWord = "None";
    if (!userData[sender.id].money) userData[sender.id].money = 500;
    if (!userData[sender.id].kills) userData[sender.id].kills = 0;
    if (!userData[sender.id].bombs) userData[sender.id].bombs = 0;
    if (!userData[sender.id].daggers) userData[sender.id].daggers = 0;
    if (!userData[sender.id].ricochets) userData[sender.id].ricochets = 0;
    if (!userData[sender.id].bows) userData[sender.id].bows = 0;
    if (!userData[sender.id].tasers) userData[sender.id].tasers = 0;
    if (!userData[sender.id].molotovs) userData[sender.id].molotovs = 0;
    if (!userData[sender.id].crowbars) userData[sender.id].crowbars = 0;
    if (!userData[sender.id].guns) userData[sender.id].guns = 0;
    if (!userData[sender.id].staffs) userData[sender.id].staffs = 0;
    if (!userData[sender.id].shields) userData[sender.id].shields = 0;
    if (!userData[sender.id].flamethrowers) userData[sender.id].flamethrowers = 0;
    if (!userData[sender.id].whirlwinds) userData[sender.id].whirlwinds = 0;
    if (!userData[sender.id].selectedpet) userData[sender.id].selectedpet = "None";
    if (!userData[sender.id].shieldactivated) userData[sender.id].shieldactivated = 0;
    if (!userData[sender.id].tasertime) userData[sender.id].tasertime = "None";
    if (!userData[sender.id].health) userData[sender.id].health = 100;
    if (!userData[sender.id].akira) userData[sender.id].akira = 0;
    if (!userData[sender.id].waltz) userData[sender.id].waltz = 0;
    if (!userData[sender.id].lupin) userData[sender.id].lupin = 0;
    if (!userData[sender.id].flipp) userData[sender.id].flipp = 0;
    if (!userData[sender.id].raive) userData[sender.id].raive = 0;
    if (!userData[sender.id].byte) userData[sender.id].byte = 0;
    if (!userData[sender.id].maxhealth) userData[sender.id].maxhealth = 100;
    if (!userData[sender.id].extrastrength) userData[sender.id].extrastrength = 0;
    if (!userData[sender.id].dodgechance) userData[sender.id].dodgechance = 0;
    if (!userData[sender.id].luckchance) userData[sender.id].luckchance = 0;
    if (!userData[sender.id].petboxes) userData[sender.id].petboxes = 0;
    if (!userData[sender.id].team) userData[sender.id].team = noteam;
    if (!userData[sender.id].teamrole) userData[sender.id].teamrole = "member";
    if (!userData[sender.id].teaminvite) userData[sender.id].teaminvite = noteam;
    if (!userData[sender.id].teaminvitetime) userData[sender.id].teaminvitetime = "none";
    if (!userData[sender.id].daily) userData[sender.id].daily = "none";
    if (!userData[sender.id].teamdamage) userData[sender.id].teamdamage = 0;
    if (!userData[sender.id].level) userData[sender.id].level = 1;
    if (!userData[sender.id].levelmessages) userData[sender.id].levelmessages = 0; // difference: these reset for each level up
    if (!userData[sender.id].nextlevel) userData[sender.id].nextlevel = 15;
    if (!userData[sender.id].trophies) userData[sender.id].trophies = 0;
    if (!userData[sender.id].dailyreward) userData[sender.id].dailyreward = 75;
    if (!userData[sender.id].discount) userData[sender.id].discount = 0;
    if (!userData[sender.id].discounttime) userData[sender.id].discounttime = moment().format('L');
    if (!userData[sender.id].storedmoney) userData[sender.id].storedmoney = 0;
    if (!userData[sender.id].maxcollectamount) userData[sender.id].maxcollectamount = 150;
    if (!userData[sender.id].extrafillamount) userData[sender.id].extrafillamount = 0;
    if (!userData[sender.id].teamlimit) userData[sender.id].teamlimit = 3;
    if (!userData[sender.id].missionnumber) userData[sender.id].missionnumber = 1;
    if (!userData[sender.id].boxesopened) userData[sender.id].boxesopened = 0;
    if (!userData[sender.id].weaponsused) userData[sender.id].weaponsused = 0;
    if (!userData[sender.id].questkills) userData[sender.id].questkills = 0;
    if (!userData[sender.id].legendaryboxesopened) userData[sender.id].legendaryboxesopened = 0;
    if (!userData[sender.id].overkill) userData[sender.id].overkill = false;
    if (!userData[sender.id].daggerrob) userData[sender.id].daggerrob = 0;
    if (!userData[sender.id].shieldsused) userData[sender.id].shieldsused = 0;
    if (!userData[sender.id].missedshots) userData[sender.id].missedshots = 0;
    if (!userData[sender.id].redemptions) userData[sender.id].redemptions = 0;
    if (!userData[sender.id].superoverkill) userData[sender.id].superoverkill = false;
    if (!userData[sender.id].petboxesopened) userData[sender.id].petboxesopened = 0;
    if (!userData[sender.id].flippmoney) userData[sender.id].flippmoney = 0;
    if (!userData[sender.id].roulettedmoney) userData[sender.id].roulettedmoney = 0;
    if (!userData[sender.id].quickreactsanswered) userData[sender.id].quickreactsanswered = 0;
    if (!userData[sender.id].lifesteal) userData[sender.id].lifesteal = false;
    if (!userData[sender.id].kamikaze) userData[sender.id].kamikaze = false;
    if (!userData[sender.id].supershopper) userData[sender.id].supershopper = false;
    if (!userData[sender.id].armed) userData[sender.id].armed = false;
    if (!userData[sender.id].bombsused) userData[sender.id].bombsused = 0;
    if (!userData[sender.id].megaoverkill) userData[sender.id].megaoverkill = false;
    if (!userData[sender.id].teamjoined) userData[sender.id].teamjoined = false;
    if (!userData[sender.id].nukes) userData[sender.id].nukes = 0;
    if (!userData[sender.id].dailiesclaimed) userData[sender.id].dailiesclaimed = 0;
    if (!userData[sender.id].truewinner) userData[sender.id].truewinner = false;
    if (!userData[sender.id].joshuapinged) userData[sender.id].joshuapinged = 0;
    message.channel.send({
      "embed": {
        "title": "Thanks for Setting Up Your Account!",
        "description": "Try doing some of the commands below and start your adventure!",
        "color": 1102130,
        "thumbnail": {
          "url": message.author.avatarURL
        },
        "fields": [
          {
            "name": "f!help",
            "value": "Learn the commands!",
            "inline": true
          },
          {
            "name": "f!bal",
            "value": "Check your balance!",
            "inline": true
          },
          {
            "name": "f!team create <name>",
            "value": "Create your own team!",
            "inline": true
          },
          {
            "name": "f!shop",
            "value": "Check items in the shop!",
            "inline": true
          }
        ]
      }
    });
    console.log(consolelog + "start => Success!");
    return
  }

  if (command === "startall") {
    setstats();
    message.reply("All accounts on the database have been set up!");
    console.log(consolelog + "startall => Success!")
  }

  if (!userData[sender.id]) {
    message.reply("Set up your account using " + prefix + "start!");
    return
  }

  if (userData[sender.id].money > 199999) {
    userData[sender.id].money = 199999;
  }
  
  if (userData[sender.id].discounttime != moment().format('L')) {
    userData[sender.id].discount = 0;
  }

  if (userData[sender.id].petboxes > 20) {
    userData[sender.id].petboxes = 19;
  }

  var random_player = message.guild.members.random().user;
  var random_player2 = message.guild.members.random().user;
  var random_player3 = message.guild.members.random().user;
  
  if (userCount >= 2) {
    while (client.users.get(random_player.id).bot || random_player.id === sender.id || !userData[random_player.id]) {
      var random_player = message.guild.members.random().user;
    }
  } else {
    random_player = sender;
  }

  if (userCount >= 3) {
    while (client.users.get(random_player2.id).bot || random_player2.id === sender.id || !userData[random_player2.id]) {
      var random_player2 = message.guild.members.random().user;
    }
  } else {
    random_player2 = random_player;
  }

  if (userCount >= 4) {
    while (client.users.get(random_player3.id).bot || random_player3.id === sender.id || !userData[random_player3.id]) {
      var random_player3 = message.guild.members.random().user;
    }
  } else {
    random_player3 = random_player2;
  }
  
  if (command === "resetseason") {
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "resetseason " + sayMessage + " => Failure!");
      return
    }
    message.delete();
    message.channel.send("@everyone The killing season has been reset! All kills, health, weapons, and shields have been removed! Pets have also dropped to half their level and boxes have went to their original price! Everything else has stayed the same!")
    var Count;
    var PlayerId = sender.id;
    var PlayerUsername = "";
    var Player2Id = sender.id;
    var Player2Username = "";
    var Player3Id = sender.id;
    var Player3Username = "";
    for(Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        if (userData[User.id].kills >= userData[PlayerId].kills) {
          PlayerId = User.id;
          PlayerUsername = User.username;
        }
      }
    }
    for(Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        if (userData[User.id].kills >= userData[Player2Id].kills && User.id != PlayerId) {
          Player2Id = User.id;
          Player2Username = User.username;
        }
      }
    }
    for(Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        if (userData[User.id].kills >= userData[Player3Id].kills && User.id != PlayerId && User.id != Player2Id) {
          Player3Id = User.id;
          Player3Username = User.username;
        }
      }
    }
    userData[PlayerId].trophies += 3;
    userData[Player2Id].trophies += 2;
    userData[Player3Id].trophies += 1;
    for(Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        if (userData[User.id].kills >= 0) {
          if (userData[User.id].truewinner) {
            userData[User.id].trophies += 1;
          }
          if (Math.round(userData[User.id].kills/10) > 5) {
            userData[User.id].trophies += 5;
          } else {
            userData[User.id].trophies += Math.round(userData[User.id].kills/10);
          }
        }
      }
    }
    console.log(sender.username + " reset the season! The winners for first, second, and third were: " + PlayerUsername, Player2Username, Player3Username);
    message.channel.send("**SEASON " + extraVars["seasonnumber"] + " REWARDS:**");
    message.channel.send("<@!" + PlayerId + "> got first place! As a reward, they got an additional 3 🏆!");
    message.channel.send("<@!" + Player2Id + "> got second place! As a reward, they got an additional 2 🏆!");
    message.channel.send("<@!" + Player3Id + "> got third place! As a reward, they got an additional 1 🏆!");
    message.channel.send("Everyone got 1🏆 for *each* 10 kills they got before the season reset!")
    extraVars["seasonnumber"] += 1;
    var Count;
    for(Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        userData[User.id].bombs = 0;
        userData[User.id].tasers = 0;
        userData[User.id].staffs = 0;
        userData[User.id].daggers = 0;
        userData[User.id].flamethrowers = 0;
        userData[User.id].guns = 0;
        userData[User.id].shields = 0;
        userData[User.id].shieldactivated = 0;
        userData[User.id].ricochets = 0;
        userData[User.id].bows = 0;
        userData[User.id].health = userData[User.id].maxhealth;
        userData[User.id].kills = 0;
        userData[User.id].petboxes = 0;
        userData[User.id].molotovs = 0;
        userData[User.id].whirlwinds = 0;
        userData[User.id].crowbars = 0;
        userData[User.id].akira = Math.round(userData[User.id].akira/2);
        userData[User.id].waltz = Math.round(userData[User.id].waltz/2);
        userData[User.id].lupin = Math.round(userData[User.id].lupin/2);
        userData[User.id].flipp = Math.round(userData[User.id].flipp/2);
        userData[User.id].raive = Math.round(userData[User.id].raive/2);
        if (userData[User.id].selectedpet === "Akira") {
          userData[User.id].health += 5+((userData[User.id].akira-1)*3);
        }
        if (userData[User.id].armed) {
          userData[User.id].guns = 1;
        }
      }
    }
    return
  }
  
  if (command === "help") {
    if (!args[0]) {
      message.channel.send({"embed":{
      title: "**Help Desk :question:**",
      fields: [{
        name: "General Commands",
        value: "Do " + prefix + "help general to see these."
      },
      {
        name: "Economy Commands",
        value: "Do " + prefix + "help eco to see these."
      },
      {
        name: "Season Commands",
        value: "Do " + prefix + "help season to see these."
      },
      {
        name: "Team Commands",
        value: "Do " + prefix + "help team to see these."
      }
      ]
      }})
      return
    }
    if (args[0].toLowerCase() === "gen" || args[0].toLowerCase() === "general") {
      message.reply("A DM has been sent to you displaying commands for the bot!");
      sender.send({"embed":{
      title: "**Help Desk :question:**",
      fields: [{
        name: prefix + "help",
        value: "Show the 'help' GUI!"
      },
      {
        name: prefix + "say <text>",
        value: "Make the bot say anything you want!"
      },
      {
        name: prefix + "purge <number>",
        value: "Deletes an amount of messages in the channel (excludes the message you send)!"
      },
      {
        name: prefix + "daily",
        value: "Claims a daily reward! Resets every 12AM!"
      },
      {
        name: prefix + "invite",
        value: "Shows invite link to add the bot to another server!"
      },
      {
        name: prefix + "makecommand <commandname> <message>",
        value: "Create a command! Call it using f!call <commandname>! Modifiers (put these in the message to change certain text): {sender} caller's name; {level} caller's level; {money} caller's balance; {delete} deletes caller's message when called; {delay} deletes sent message after 5secs."
      }
      ]
      }})
      return
    }
    if (args[0].toLowerCase() === "eco" || args[0].toLowerCase() === "economy") {
      message.reply("A DM has been sent to you displaying commands for the bot!");
      sender.send({"embed":{
      title: "**Help Desk :question:**",
      fields: [{
        name: prefix + "bal <player (optional)>",
        value: "Show your balance! Add a player after it to show that player's balance!"
      },
      {
        name: prefix + "stats <player (optional)>",
        value: "Show your stats! Add a player after it to show that player's stats!"
      },
      {
        name: prefix + "baltop",
        value: "Find the top three richest players in the database!"
      },
      {
        name: prefix + "shop <name (optional)>",
        value: "Open the shop GUI and see what you can purchase!"
      },
      {
        name: prefix + "buy <item>",
        value: "Buy something from the shop! Type in the item name after the command!"
      },
      {
        name: prefix + "pay <amount> <player>",
        value: "Pay a specific amount to a player! This action is not reversible!"
      },
      { 
        name: prefix + "bet <amount>",
        value: "Bet an amount of money and either gain double it or lose it all!"
      },
      {
        name: prefix + "collect",
        value: "Collect money that stores overtime in your private vault!"
      },
      {
        name: prefix + "missions",
        value: "View active mission! Complete missions to earn rewards!"
      }
      ]
      }})
      return
    }
    if (args[0].toLowerCase() === "season" || args[0].toLowerCase() === "fighting") {
      message.reply("A DM has been sent to you displaying commands for the bot!");
      sender.send({"embed":{
      title: "**Help Desk :question:**",
      fields: [{
        name: prefix + "inv",
        value: "Show your inventory! Get items at the shop (check eco commands)!"
      },
      {
        name: prefix + "health <player (optional)>",
        value: "Find your health! Add a player after it to show that player's health!"
      },
      {
        name: prefix + "healthall",
        value: "Finds every player's health on the server! Will be sent in a DM."
      },
      {
        name: prefix + "top",
        value: "Find the top three players with the most kills in the database!"
      },
      {
        name: prefix + "kills <player (optional)>",
        value: "Find the amount of kills you have! Add a player to show that player's kills!"
      },
      {
        name: prefix + "attack <weapon> <player (optional)>",
        value: "Attack a player using a weapon! Find weapons in your inventory using " + prefix + "inv."
      },
      {
        name: prefix + "pets <player (optional)>",
        value: "Find your pet levels! Add a player after it to show their pets!"
      },
      {
        name: prefix + "select <petname>",
        value: "Select a pet to use! Find their stats at " + prefix + "pets or " + prefix + "info <petname>!"
      },
      {
        name: prefix + "redeem",
        value: "Use trophies from seasons to gain permanent rewards!"
      }
      ]
      }})
      return
    }
    if (args[0].toLowerCase() === "team" || args[0].toLowerCase() === "teams") {
      message.reply("A DM has been sent to you displaying commands for the bot!");
      sender.send({"embed":{
      title: "**Help Desk :question:**",
      fields: [{
        name: prefix + "team <player (optional)>",
        value: "See the team you are in, as well as whether you are a member or leader! Add a player to show that player's team!"
      },
      {
        name: prefix + "team members",
        value: "See all of your fellow team members and their roles!"
      },
      {
        name: prefix + "team create <name>",
        value: "Create a team! Include a name that has no spaces, is original, and is less than 16 chars."
      },
      {
        name: prefix + "team leave",
        value: "Leave your team! If you are the leader, it will kick your entire team unless a new player is chosen!"
      },
      {
        name: prefix + "team invite <name>",
        value: "Invite somebody to your team! You must be an officer or higher."
      },
      {
        name: prefix + "team accept <teamname>",
        value: "Accept an invite from a team you were invited to! Only accepts the most recently invited team."
      },
      {
        name: prefix + "team kick <name>",
        value: "Kick somebody from your team! You must be the leader to do this command."
      },
      {
        name: prefix + "team promote <name>",
        value: "Promote somebody to officer rank in your team! Gives them the ability to invite others but not kick."
      },
      {
        name: prefix + "team makeleader <name>",
        value: "Makes somebody else the leader of the team! Only available to the leader of the team, not reversible."
      },
      {
        name: prefix + "team attack <item>",
        value: "If there is a boss raid event going on, you can attack the boss using an item with this command!"
      }
      ]
      }})
      return
    }
  }

  if (command === "tell") {
    var teller = client.users.find(u => u.username === args[0]);
    var saying = args.slice(1);
    teller.send(saying.join(" "));
    console.log(consolelog + "tell " + args[0] + " " + saying.join(" "));
    message.delete();
    return
  }
  
  if (command === "makecommand") {
    if (!args[0]) {
      message.reply("Please include a command name to call the function!");
      return
    }
    if (!args[1]) {
      message.reply("Please include what you want the command to say when called!");
      return
    }
    let commandname = args[0];
    let msg = args.slice(1);
    console.log(msg.join(" ").length)
    if (msg.join(" ").length >= 1000) {
      message.reply("Keep the command at or under 1,000 characters, please!");
      return
    }
    console.log(consolelog + "makecommand " + commandname + " which gives out: " + msg.join(" "));
    message.reply("Command created called '" + commandname + "' which gives an output: '" + msg.join(" ") + "'.");
    extraVars[commandname] = msg.join(" ");
    return
  }
  
  if (command === "call") {
    let commandname = args[0];
    if (!extraVars[commandname]) {
      message.reply("That is not a valid command!");
      return
    }
    let str = extraVars[commandname];
    if (str.includes("{delete}")) {
      message.delete();
    }
    let msg = str.replace(/{sender}/g, sender.username).replace(/{money}/g, userData[sender.id].money).replace(/{level}/g, userData[sender.id].level).replace(/{random}/g, Math.floor(Math.random()*100)).replace(/{delete}/g, "").replace(/{delay}/g, "");
    if (str.includes("{delay}")) {
      message.channel.send(msg)
      .then(sentMessage => {sentMessage.delete(5000)});
    } else {
      message.channel.send(msg);
    }
    return
  }

  if(command === "grantall") {
    const grantedamount = Number(args[0]);
    message.delete();
    if (Number.isNaN(grantedamount)) {
      message.reply("Please enter a valid number!")
      console.log(sender.username + " => f!grantall " + grantedamount + " => Failure!");
    } else {
      if (client.users.get("282319071263981568") === sender) {
        message.channel.send("**" + sender.username + " just granted everyone a " + (grantedamount*100).toFixed(2) + "% one-day discount for the shop! The discount will end directly after 12AM at night!**")
        console.log(sender.username + " => f!grantall " + (grantedamount*100).toFixed(2) + " => Success!");
        for(Count in client.users.array()) {
          var User = client.users.array()[Count]
          if (!User.bot) {
            var User = client.users.array()[Count];
            if (userData[User.id].discount < grantedamount) {
              discount(User.id, grantedamount);
            }
          }
        }
      } else {
        console.log(sender.username + " => f!grantall " + parseInt(grantedamount) + " => Failure!");
      }
    }
    return
  }
  
  if (command === "forcequickreact") {
    if (client.users.get("282319071263981568") === sender) {
      message.delete();
      console.log(sender.username + " forced a quick react.");
      var scrtword = secretwords[Math.floor(Math.random()*secretwords.length)];
      extraVars["secretword"] = scrtword;
      client.channels.get('545028921259851776').send("**Quick React!**\nThe first person to say ''*" + scrtword + "*'' in the chat\n(case sensitive) will earn a special reward!");
    }
  }
  
  if (command === "nullifyall") {
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "nullifyall => Failure!");
      return
    }
    message.delete();
    var Count;
    for (Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        userData[User.id].discount = 0;
      }
    }
    return
  }
  
  if (command === "discount") {
    message.delete();
    const sayMessage = Number(args[0]);
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "discount " + sayMessage + " => Failure!");
      return
    }
    if (!mentioned) {
      if (Number.isNaN(sayMessage)) {
        message.channel.send("Please enter a valid number!")
      } else {
        userData[sender.id].discount = sayMessage;
        userData[sender.id].discounttime = moment().format('L');
        console.log(consolelog + "discount " + sayMessage + " => Success!");
        message.channel.send(sender + " has granted themself a discount of " + sayMessage * 100 + "% off everything in the shop until the end of the day!")
      }
    } else {
      if (Number.isNaN(sayMessage)) {
        message.channel.send("Please enter a valid number!")
      } else {
        userData[mentioneduser.id].discount = sayMessage;
        userData[mentioneduser.id].discounttime = moment().format('L');
        message.channel.send(sender + " has granted " + mentioneduser.username + " a discount of " + sayMessage * 100 + "% off everything in the shop until the end of the day!")
        console.log(consolelog + "discount " + sayMessage + " " + mentioneduser.username + " => Success!");
      }
    }
    return
  }
  
  if (command === "resetword") {
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "resetword => Failure!");
      return
    }
    message.delete();
    var Count;
    for (Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        userData[User.id].dailyWord = "";
      }
    }
  }

  if (command === "resetlevels") {
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "resetlevels => Failure!");
      return
    }
    message.delete();
    var Count;
    for (Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        userData[User.id].dailyreward = 75;
        userData[User.id].level = 1;
        userData[User.id].levelmessages = 0;
        userData[User.id].nextlevel = 15;
      }
    }
  }
  
  // Use this command when you want to globally change a variable, like if you
  // make dailyrewards $50 more you can add $50 to everyone instead of resetting levels
  if (command === "changeall") {
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "changeall => Failure!");
      return
    }
    console.log("Changeall command has run.");
    message.delete();
    var Count;
    for (Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        userData[client.users.get("491723804901507084").id].storedmoney = 470; 
      }
    }
  }
  
  if (command === "stats") {
    if (!mentioned) {
      message.channel.send({"embed":{
      title: "**Statistic Holder :1234:**",
      fields: [{
        name: "Discord Username:",
        value: sender.username + " (:trophy:" + userData[sender.id].trophies + ")"
      },
      {
        name: "Profile Level",
        value: userData[sender.id].level
      },
      {
        name: "Balance:",
        value: "$" + userData[sender.id].money
      },
      {
        name: "Messages Sent:",
        value: userData[sender.id].messages
      },
      {
        name: "Messages to Next Level:",
        value: userData[sender.id].nextlevel - userData[sender.id].levelmessages
      }]
      }});
    } else {
      message.channel.send({"embed":{
      title: "**Statistic Holder :1234:**",
      fields: [{
        name: "Account Holder:",
        value: mentioneduser.username + " (:trophy:" + userData[mentioneduser.id].trophies + ")"
      },
      {
        name: "Profile Level",
        value: userData[mentioneduser.id].level
      },
      {
        name: "Balance:",
        value: "$" + userData[mentioneduser.id].money
      },
      {
        name: "Messages Sent:",
        value: userData[mentioneduser.id].messages
      },
      {
        name: "Messages to Next Level:",
        value: userData[mentioneduser.id].nextlevel - userData[mentioneduser.id].levelmessages
      }]
      }});
    }
    return
  }
  
  if (command === "say") {
    const sayMessage = args.join(" "); // Bot gets what you've said.
    message.delete().catch(O_o=>{}); // Bot deletes your message.
    message.channel.send(sayMessage); // Bot says the thing.
    console.log(consolelog + "say => Success!");
    return
  }
  
  if (command === "bal" || command === "balance") {
    if (!mentioned) {
      message.channel.send({"embed":{
      title: "**The Future Bank :moneybag:**",
      fields: [{
        name: "Account Holder:",
        value: sender.username + " (:trophy:" + userData[sender.id].trophies + ")"
      },
      {
        name: "Account Balance:",
        value: "$" + Math.round(userData[sender.id].money)
      }]
      }})
      return
    } else {
      message.channel.send({"embed":{
      title: "**The Future Bank :moneybag:**",
      fields: [{
        name: "Account Holder:",
        value: mentioneduser.username + " (:trophy:" + userData[mentioneduser.id].trophies + ")"
      },
      {
        name: "Account Balance:",
        value: "$" + Math.round(userData[mentioneduser.id].money)
      }]
      }})
      return
    }
  }

  if (command === "pay") {
    let member = message.mentions.members.first()
    let payment = args[0];
    if (isNaN(payment)) {
      return message.reply("Please put in a value after f!pay!")
      console.log(consolelog + "pay NaN => Failure!")
    }
    if (!member) {
      return message.reply("Please include a mentioned name after that command!");
      console.log(consolelog + "pay => Failure!")
    }
    if (userData[sender.id].money < parseInt(payment)) {
      return message.reply("You don't have enough money to use that command!")
      console.log(consolelog + "pay => Failure!")
    }
    if (payment < 1) {
      return message.reply("Please enter a valid number!")
      console.log(consolelog + "pay => Failure!")
    }
    userData[sender.id].money -= parseInt(payment);
    userData[mentioneduser.id].money += parseInt(payment);
    message.channel.send(sender + " just gave " + message.mentions.members.first() + " " + payment + " dollars!");
    console.log(consolelog + "pay " + payment + " " + message.mentions.users.first().username + " => Success!")
    return
  }

  if(command === "hsetmoney") {
    message.delete();
    const sayMessage = args.join("");
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "moneysethide " + sayMessage + " => Failure!");
      return
    }
    if (!mentioneduser) {
      if (Number.isNaN(parseInt(sayMessage))) {
        message.channel.send("Please enter a valid number!")
      } else {
        userData[sender.id].money = parseInt(sayMessage);
        console.log(consolelog + "hidesetmoney " + parseInt(sayMessage) + " => Success!");
      }
    } else {
      if (Number.isNaN(parseInt(sayMessage))) {
        message.channel.send("Please enter a valid number!")
      } else {
        userData[mentioneduser.id].money = parseInt(sayMessage);
        console.log(consolelog + "hidesetmoney " + parseInt(sayMessage) + " " + mentioneduser.username + " => Success!");
      }
    }
    return
  }

  if(command === "hsetkills") {
    message.delete();
    const sayMessage = args.join("");
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "hsetkills " + sayMessage + " => Failure!");
      return
    }
    if (!mentioneduser) {
      if (Number.isNaN(parseInt(sayMessage))) {
        message.channel.send("Please enter a valid number!")
      } else {
        userData[sender.id].kills = parseInt(sayMessage);
        console.log(consolelog + "hsetkills" + parseInt(sayMessage) + " => Success!");
      }
    } else {
      if (Number.isNaN(parseInt(sayMessage))) {
        message.channel.send("Please enter a valid number!")
      } else {
        userData[mentioneduser.id].kills = parseInt(sayMessage);
        console.log(consolelog + "hsetkills " + parseInt(sayMessage) + " " + mentioneduser.username + " => Success!");
      }
    }
    return
  }
  
  if(command === "hsetxp") {
    message.delete();
    const sayMessage = args.join("");
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "hsetxp " + sayMessage + " => Failure!");
      return
    }
    if (!mentioneduser) {
      if (Number.isNaN(parseInt(sayMessage))) {
        message.channel.send("Please enter a valid number!")
      } else {
        userData[sender.id].nextlevel = parseInt(sayMessage);
        console.log(consolelog + "hsetxp " + parseInt(sayMessage) + " => Success!");
      }
    } else {
      if (Number.isNaN(parseInt(sayMessage))) {
        message.channel.send("Please enter a valid number!")
      } else {
        userData[mentioneduser.id].nextlevel = parseInt(sayMessage);
        console.log(consolelog + "hsetxp " + parseInt(sayMessage) + " " + mentioneduser.username + " => Success!");
      }
    }
    return
  }
  
  if (command === "summonboss") {
    message.delete();
    if (client.users.get("282319071263981568") != sender) {
      console.log(consolelog + "summonboss => No Perms => Failure!");
      message.channel.send(sender.username + ": Error summoning boss: check console for more information.");
      return
    }
    if (!args[0]) {
      console.log(consolelog + "summonboss => No Health Arg! => Failure!");
      message.channel.send(sender.username + ": Error summoning boss: check console for more information.");
      return
    }
    var bosshealth = parseInt(args[0]);
    extraVars["bosshealth"] = parseInt(args[0]);
    var Count
    for (Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        userData[User.id].teamdamage = 0;
      }
    }
    message.channel.send("**A boss has spawned with " + bosshealth + " health! Join a team and take it down! \nTeams will get rewards based on their contribution to taking down the boss. \nRandom chances will always hit the boss and negative effects do not count. \nTo attack the boss, do f!team attack <item>.**");
  }

  if (command === "roulette" || command === "bet") {
    var sayMessage = args.join("");
    var winchance = 50 + userData[sender.id].luckchance;
    if (parseInt(sayMessage) > 3000) {
      message.reply("Please roulette an amount of money at $3,000 or below!"); 
      return
    }
    if (sayMessage === "NaN") {
      message.channel.send("Please enter a valid number after f!roulette!")
    } else {
      if (sayMessage === "") {
        var moneyatstake = 1;
        if (userData[sender.id].money >= 1) {
          var random = Math.floor(Math.random()*100);
          userData[sender.id].roulettedmoney += 1;
          if (random >= 100) {
            random = 100; 
          }
          if (random >= winchance) {
            message.channel.send("Oh no! " + sender.username + " lost 1 dollar from Roulette! :scream: Rolled: " + random + " Required: below " + winchance + ".")
            userData[sender.id].money -= 1;
            console.log(consolelog + "roulette 1 => Lost!");
          } else {
            message.channel.send("Hooray! " + sender + " won " + moneyatstake + " dollar(s) from Roulette! :moneybag: Rolled: " + random + " Required: below " + winchance + ".")
            userData[sender.id].money += moneyatstake;
            console.log(consolelog + "roulette 1 => Won!");
          }
        } else {
          message.channel.send(sender + ", you don't have enough money to use this command!");
        }
      } else {
        if (parseInt(sayMessage) <= 0) {
          message.channel.send(sender + ", you need to put a number greater than 0!");
        } else {
          if (userData[sender.id].money >= sayMessage) {
            userData[sender.id].roulettedmoney += parseInt(sayMessage);
            var random = Math.floor(Math.random()*100);
            if (random >= winchance) {
              message.channel.send("Oh no! " + sender + " lost " + sayMessage + " dollar(s) from Roulette! :scream: Rolled: " + random + " Required: below " + winchance + ".")
              userData[sender.id].money -= parseInt(sayMessage);
              console.log(consolelog + "roulette " + parseInt(sayMessage) + " => Lost!");
            } else {
              message.channel.send("Hooray! " + sender + " won " + Math.round(parseInt(sayMessage)) + " dollar(s) from Roulette! :moneybag: Rolled: " + random + " Required: below " + winchance + ".")
              userData[sender.id].money += Math.round(parseInt(sayMessage));
              console.log(consolelog + "roulette " + parseInt(sayMessage) + " => Won!");
            }
          } else {
            message.channel.send(sender + ", you don't have enough money to do that!");
          }
        }
      }
    }
  }

  if (command === "invite") {
    message.channel.send({"embed": {
      "title": "Click here to add me to another server!",
      "description": "Click the title above to add me to another\ndiscord server! :)",
      "url": "https://discordapp.com/api/oauth2/authorize?client_id=545032625883054110&permissions=8&scope=bot",
      "color": 15047721,
      "thumbnail": {
        "url": client.user.avatarURL
      }
    }});
  }
  
  if (command === "missions") {
    var questname = "None"
    if (userData[sender.id].missionnumber == 1) {
      var questname = "Newbie";
      var questvalue = "Buy and open 1 of any box. [" + userData[sender.id].boxesopened + "/1]";
    }
    if (userData[sender.id].missionnumber == 2) {
      var questname = "Silent AND Deadly";
      var questvalue = "Attack any player with a weapon. [" + userData[sender.id].weaponsused + "/1]";
    }
    if (userData[sender.id].missionnumber == 3) {
      var questname = "Assassinated";
      var questvalue = "Kill a player. [" + userData[sender.id].questkills + "/1]";
    }
    if (userData[sender.id].missionnumber == 4) {
      var questname = "Heavy Shopper";
      var questvalue = "Buy and open 10 of any box. [" + userData[sender.id].boxesopened + "/10]";
    }
    if (userData[sender.id].missionnumber == 5) {
      var questname = "Not Paid Acting";
      var questvalue = "Kill 5 players. [" + userData[sender.id].questkills + "/5]";
    }
    if (userData[sender.id].missionnumber == 6) {
      var questname = "Just Flexing";
      var questvalue = "Buy and open 3 legendary boxes. [" + userData[sender.id].legendaryboxesopened + "/3]";
    }
    if (userData[sender.id].missionnumber == 7) {
      var questname = "Overkill?!";
      var questvalue = "Get a player to -30 health (do a lot of damage with your last weapon). [" + userData[sender.id].overkill + "]"
    }
    if (userData[sender.id].missionnumber == 8) {
      var questname = "Moneybags";
      var questvalue = "Successfully steal money from players 5 times using daggers. [" + userData[sender.id].daggerrob + "/5]";
    }
    if (userData[sender.id].missionnumber == 9) {
      var questname = "Not Today";
      var questvalue = "Activate 3 shields. [" + userData[sender.id].shieldsused + "/3]";
    }
    if (userData[sender.id].missionnumber == 10) {
      var questname = "Quickie";
      var questvalue = "Be the first to answer 3 quick reacts. [" + userData[sender.id].quickreactsanswered + "/3]";
    }
    if (userData[sender.id].missionnumber == 11) {
      var questname = "Bad Aim";
      var questvalue = "Miss 3 gun attacks. [" + userData[sender.id].missedshots + "/3]";
    }
    if (userData[sender.id].missionnumber == 12) {
      var questname = "Geez dude, he's dead!";
      var questvalue = "Get a player to -75 health (do a lot of damage with your last weapon). [" + userData[sender.id].superoverkill + "]";
    }
    if (userData[sender.id].missionnumber == 13) {
      var questname = "Improvise. Adapt. Overcome.";
      var questvalue = "Redeem 3 trophies (use f!redeem). [" + userData[sender.id].redemptions + "/3]";
    }
    if (userData[sender.id].missionnumber == 14) {
      var questname = "Dedicated";
      var questvalue = "Attack any player with a weapon 30 times. [" + userData[sender.id].weaponsused + "/30]";
    }
    if (userData[sender.id].missionnumber == 15) {
      var questname = "Full Withdrawal";
      var questvalue = "Have the max allowed amount of money stored in your vault. [$" + Math.round(userData[sender.id].storedmoney) + "/$" + userData[sender.id].maxcollectamount + "]";
    }
    if (userData[sender.id].missionnumber == 16) {
      var questname = "Stop Spamming";
      var questvalue = "Buy and open 20 of any box. [" + userData[sender.id].boxesopened + "/20]";
    }
    if (userData[sender.id].missionnumber == 17) {
      var questname = "Long Term Goal";
      var questvalue = "Attack any player with a weapon 100 times. [" + userData[sender.id].weaponsused + "/100]";
    }
    if (userData[sender.id].missionnumber == 18) {
      var questname = "Furry";
      var questvalue = "Buy and open 10 pet boxes. [" + userData[sender.id].petboxesopened + "/10]";
    }
    if (userData[sender.id].missionnumber == 19) {
      var questname = "The Opposite of James Bond";
      var questvalue = "Miss 5 gun attacks. [" + userData[sender.id].missedshots + "/5]";
    }
    if (userData[sender.id].missionnumber == 20) {
      var questname = "Tryhard Mode Activated";
      var questvalue = "Kill 15 players. [" + userData[sender.id].questkills + "/15]";
    }
    if (userData[sender.id].missionnumber == 21) {
      var questname = "Flippin' Rich";
      var questvalue = "With Flipp (pet) equipped, earn $500 with attacks. [$" + userData[sender.id].flippmoney + "/$500]";
    }
    if (userData[sender.id].missionnumber == 22) {
      var questname = "Testing Your Luck";
      var questvalue = "Roulette a total of $15,000. [$" + userData[sender.id].roulettedmoney + "/$15000]";
    }
    if (userData[sender.id].missionnumber == 23) {
      var questname = "Level 100 Furry";
      var questvalue = "Get all of your pets to max level. [" + userData[sender.id].maxedpets + "/6 maxed]";
    }
    if (userData[sender.id].missionnumber == 24) {
      var questname = "Terminator";
      var questvalue = "Kill 30 players. [" + userData[sender.id].questkills + "/30]";
    }
    if (userData[sender.id].missionnumber == 25) {
      var questname = "After The Portal";
      var questvalue = "Be the first to answer 10 quick reacts. [" + userData[sender.id].quickreactsanswered + "/10]";
    }
    if (userData[sender.id].missionnumber == 26) {
      var questname = "New Skills";
      var questvalue = "Use 20 bombs with the kamikaze skill. [" + userData[sender.id].bombsused + "/20]";
    }
    if (userData[sender.id].missionnumber == 27) {
      var questname = "Lucky Shot";
      var questvalue = "Get a player to -90 health (do a lot of damage with your last weapon). [" + userData[sender.id].megaoverkill + "]";
    }
    if (userData[sender.id].missionnumber == 28) {
      var questname = "Me?";
      var questvalue = "Join another player's team. [" + userData[sender.id].teamjoined + "]";
    }
    if (userData[sender.id].missionnumber == 29) {
      var questname = "._.";
      var questvalue = "Use 40 bombs with the kamikaze skill. [" + userData[sender.id].bombsused + "/40]";
    }
    if (userData[sender.id].missionnumber == 30) {
      var questname = "Stalling For Time";
      var questvalue = "Claim 5 dailies. [" + userData[sender.id].dailiesclaimed + "/5]";
    }
    if (userData[sender.id].missionnumber == 31) {
      var questname = "REEEEEEEEEEEEEEEEE";
      var questvalue = "Roulette a total of $20,000. [" + userData[sender.id].roulettedmoney + "/$20000]";
    }
    if (userData[sender.id].missionnumber == 32) {
      var questname = "Overadapt. Overpriced. Overcome.";
      var questvalue = "Buy and open 40 legendary boxes. [" + userData[sender.id].legendaryboxesopened + "/40]";
    }
    if (userData[sender.id].missionnumber == 33) {
      var questname = "Here We Go Again...";
      var questvalue = "Flex your cash and open 100 of any box. [" + userData[sender.id].boxesopened + "/100]";
    }
    if (userData[sender.id].missionnumber == 34) {
      var questname = "Annoying";
      var questvalue = "Ping <@!491723804901507084> 100 times. [" + userData[sender.id].joshuapinged + "/100]";
    }
    if (userData[sender.id].missionnumber == 35) {
      var questname = "Annoying";
      var questvalue = "With Flipp (pet) equipped, earn $600 with attacks. [$" + userData[sender.id].flippmoney + "/$600]";
    }
    if (userData[sender.id].missionnumber == 36) {
      var questname = "WTF Colin";
      var questvalue = "stop being a tryhard i haven't made anything else yet";
    }
    message.channel.send({
      "embed": {
        "title": "**" + sender.username + "'s Missions**",
        "description": "Complete missions and get **epic** rewards! When you meet the requirements of a mission, type " + prefix + "complete to claim your rewards!",
        "color": 11482920,
        "fields": [
          {
            "name": "<< Mission #" + userData[sender.id].missionnumber + ": " + "*" + questname + "* >>",
            "value": questvalue
          }
        ]
      }
    })
  }
  
  if (command === "complete") {
    var progress = "incomplete";
    if (userData[sender.id].missionnumber == 1 && userData[sender.id].boxesopened >= 1) {
      var progress = "complete";
      var rewards = "a common box";
      userData[sender.id].weaponsused = 0;
      openbox("common");
    }
    if (userData[sender.id].missionnumber == 2 && userData[sender.id].weaponsused >= 1) {
      var progress = "complete";
      var rewards = "$250";
      userData[sender.id].money += 250;
      userData[sender.id].questkills = 0;
    }
    if (userData[sender.id].missionnumber == 3 && userData[sender.id].questkills >= 1) {
      var progress = "complete";
      var rewards = "a rare box";
      openbox("rare");
      userData[sender.id].boxesopened = 0;
    }
    if (userData[sender.id].missionnumber == 4 && userData[sender.id].boxesopened >= 10) {
      var progress = "complete";
      var rewards = "an epic box";
      openbox("epic");
      userData[sender.id].questkills = 0;
    }
    if (userData[sender.id].missionnumber == 5 && userData[sender.id].questkills >= 5) {
      var progress = "complete";
      var rewards = "$300";
      userData[sender.id].money += 300;
      userData[sender.id].legendaryboxesopened = 0;
    }
    if (userData[sender.id].missionnumber == 6 && userData[sender.id].legendaryboxesopened >= 3) {
      var progress = "complete";
      var rewards = "one trophy";
      userData[sender.id].trophies += 1;
      userData[sender.id].overkill = false;
    }
    if (userData[sender.id].missionnumber == 7 && userData[sender.id].overkill == true) {
      var progress = "complete";
      var rewards = "$350";
      userData[sender.id].money += 350;
      userData[sender.id].daggerrob = 0;
    }
    if (userData[sender.id].missionnumber == 8 && userData[sender.id].daggerrob >= 5) {
      var progress = "complete";
      var rewards = "three common boxes";
      openbox("common");
      openbox("common");
      openbox("common");
      userData[sender.id].shieldsused = 0;
    }
    if (userData[sender.id].missionnumber == 9 && userData[sender.id].shieldsused >= 3) {
      var progress = "complete";
      var rewards = "one trophy";
      userData[sender.id].trophies += 1;
      userData[sender.id].quickreactsanswered = 0;
    }
    if (userData[sender.id].missionnumber == 10 && userData[sender.id].quickreactsanswered >= 3) {
      var progress = "complete";
      var rewards = "three rare boxes";
      openbox("rare");
      openbox("rare");
      openbox("rare");
      userData[sender.id].missedshots = 0;
    }
    if (userData[sender.id].missionnumber == 11 && userData[sender.id].missedshots >= 3) {
      var progress = "complete";
      var rewards = "three guns";
      userData[sender.id].guns += 3;
      userData[sender.id].superoverkill = false;
    }
    if (userData[sender.id].missionnumber == 12 && userData[sender.id].superoverkill == true) {
      var progress = "complete";
      var rewards = "three epic boxes";
      openbox("epic");
      openbox("epic");
      openbox("epic");
      userData[sender.id].redemptions = 0;
    }
    if (userData[sender.id].missionnumber == 13 && userData[sender.id].redemptions >= 3) {
      var progress = "complete";
      var rewards = "one trophy";
      userData[sender.id].trophies += 1;
      userData[sender.id].weaponsused = 0;
    }
    if (userData[sender.id].missionnumber == 14 && userData[sender.id].weaponsused >= 30) {
      var progress = "complete";
      var rewards = "three legendary boxes";
      openbox("legendary");
      openbox("legendary");
      openbox("legendary");
    }
    if (userData[sender.id].missionnumber == 15 && userData[sender.id].storedmoney >= userData[sender.id].maxcollectamount) {
      var progress = "complete";
      var rewards = "**Life Steal** (f!info lifesteal)";
      userData[sender.id].lifesteal = true;
      userData[sender.id].boxesopened = 0;
    }
    if (userData[sender.id].missionnumber == 16 && userData[sender.id].boxesopened >= 20) {
      var progress = "complete";
      var rewards = "one trophy";
      userData[sender.id].trophies += 1;
      userData[sender.id].weaponsused = 0;
    }
    if (userData[sender.id].missionnumber == 17 && userData[sender.id].weaponsused >= 100) {
      var progress = "complete";
      var rewards = "ten rare boxes";
      openbox("rare");
      openbox("rare");
      openbox("rare");
      openbox("rare");
      openbox("rare");
      openbox("rare");
      openbox("rare");
      openbox("rare");
      openbox("rare");
      openbox("rare");
      userData[sender.id].petboxesopened = 0;
    }
    if (userData[sender.id].missionnumber == 18 && userData[sender.id].petboxesopened >= 10) {
      var progress = "complete";
      var rewards = "2:trophy:";
      userData[sender.id].trophies += 2;
      userData[sender.id].missedshots = 0;
    }
    if (userData[sender.id].missionnumber == 19 && userData[sender.id].missedshots >= 5) {
      var progress = "complete";
      var rewards = "$666";
      userData[sender.id].money += 666;
      userData[sender.id].questkills = 0;
    }
    if (userData[sender.id].missionnumber == 20 && userData[sender.id].questkills >= 15) {
      var progress = "complete";
      var rewards = "**Armed** (f!info armed)";
      userData[sender.id].armed = true;
      userData[sender.id].flippmoney = 0;
    }
    if (userData[sender.id].missionnumber == 21 && userData[sender.id].flippmoney >= 500) {
      var progress = "complete";
      var rewards = "five pet boxes";
      userData[sender.id].roulettedmoney = 0;
      openbox("pet");
      openbox("pet");
      openbox("pet");
      openbox("pet");
      openbox("pet");
    }
    if (userData[sender.id].missionnumber == 22 && userData[sender.id].roulettedmoney >= 15000) {
      var progress = "complete";
      var rewards = "fifteen common boxes";
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
    }
    if (userData[sender.id].missionnumber == 23 && userData[sender.id].maxedpets >= 6) {
      var progress = "complete";
      var rewards = "$6666";
      userData[sender.id].money += 6666;
      userData[sender.id].questkills = 0;
    }
    if (userData[sender.id].missionnumber == 24 && userData[sender.id].questkills >= 30) {
      var progress = "complete";
      var rewards = "3:trophy:";
      userData[sender.id].trophies += 3;
      userData[sender.id].quickreactsanswered = 0;
    }
    if (userData[sender.id].missionnumber == 25 && userData[sender.id].quickreactsanswered >= 10) {
      var progress = "complete";
      var rewards = "**Kamikaze** (f!info kamikaze)";
      userData[sender.id].kamikaze = true;
      userData[sender.id].bombsused = 0;
    }
     if (userData[sender.id].missionnumber == 26 && userData[sender.id].bombsused >= 20) {
      var progress = "complete";
      var rewards = "five epic boxes";
      openbox("epic");
      openbox("epic");
      openbox("epic");
      openbox("epic");
      openbox("epic");
       userData[sender.id].megaoverkill = false;
    }
     if (userData[sender.id].missionnumber == 27 && userData[sender.id].megaoverkill) {
      var progress = "complete";
      var rewards = "2:trophy:";
      userData[sender.id].teamjoined = false;
      userData[sender.id].trophies += 2;
    }
     if (userData[sender.id].missionnumber == 28 && userData[sender.id].teamjoined) {
      var progress = "complete";
      var rewards = "one mythical nuke";
      userData[sender.id].nukes += 1;
      userData[sender.id].bombsused = 0;
    }
     if (userData[sender.id].missionnumber == 29 && userData[sender.id].bombsused >= 40) {
      var progress = "complete";
      var rewards = "one mythical nuke";
      userData[sender.id].nukes += 1;
      userData[sender.id].dailiesclaimed = 0;
    }
     if (userData[sender.id].missionnumber == 30 && userData[sender.id].dailiesclaimed >= 5) {
      var progress = "complete";
      var rewards = "**True Winner** (f!info truewinner)";
      userData[sender.id].truewinner = true;
       userData[sender.id].roulettedmoney = 0;
    }
     if (userData[sender.id].missionnumber == 31 && userData[sender.id].roulettedmoney >= 20000) {
      var progress = "complete";
      var rewards = "twenty five common boxes";
      userData[sender.id].truewinner = true;
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      openbox("common");
      userData[sender.id].legendaryboxesopened = 0;
    }
    if (userData[sender.id].missionnumber == 32 && userData[sender.id].legendaryboxesopened >= 40) {
      var progress = "complete";
      var rewards = "3:trophy:";
      userData[sender.id].trophies += 3;
      userData[sender.id].boxesopened = 0;
    }
    if (userData[sender.id].missionnumber == 33 && userData[sender.id].boxesopened >= 100) {
       var progress = "complete";
       var rewards = "ten epic boxes";
       openbox("epic");
       openbox("epic");
       openbox("epic");
       openbox("epic");
       openbox("epic");
       openbox("epic");
       openbox("epic");
       openbox("epic");
       openbox("epic");
       openbox("epic");
       userData[sender.id].joshuapinged = 0;
    }
    if (userData[sender.id].missionnumber == 34 && userData[sender.id].joshuapinged >= 100) {
       var progress = "complete";
       var rewards = "$1";
       userData[sender.id].money += 1;
       userData[sender.id].flippmoney = 0;
    }
    if (userData[sender.id].missionnumber == 35 && userData[sender.id].flippmoney >= 600) {
      var progress = "complete"
      var rewards = "**Lucky Charm** (f!info luckycharm)"
      userData[sender.id].luckycharm = true;
    }
    if (progress == "complete") {
      progress = "Congratulations, mission completed! As a prize, you earned " + rewards + "!";
      userData[sender.id].missionnumber += 1;
    }
    if (progress == "incomplete") {
      progress = "You haven't completed that mission yet! Type " + prefix + "missions to check your current mission!"
    }
    message.channel.send({
      "embed": {
        "title": "**Mission Progress**",
        "description": progress,
        "color": 11482920,
      }
    })
  }

  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10)+1;
    if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
      return message.reply("Please provide a number between 1 and 100 for the number of messages to delete!");
      console.log(consolelog + "purge => Failure!")
      return
    }
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    console.log(consolelog + "purge " + (deleteCount - 1) + " => Success!")
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if (command === "top") {
    var Count;
    var PlayerId = sender.id;
    var Player2Id = sender.id;
    var Player3Id = sender.id;
    var PlayerUsername = "";
    var Player2Username = "";
    var Player3Username = "";
    for(Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        if (userData[User.id].kills >= userData[PlayerId].kills) {
          PlayerId = User.id;
          PlayerUsername = User.username;
        }
      }
    }
    if (userCount >= 2) {
      if (sender.id === PlayerId) {
        Player2Id = random_player.id;
      }
      for(Count in client.users.array()) {
        var User = client.users.array()[Count];
        if (!User.bot) {
          if (userData[User.id].kills >= userData[Player2Id].kills && User.id != PlayerId) {
              Player2Id = User.id;
              Player2Username = User.username;
            }
        }
      }
    }
    if (userCount >= 3) {
      if (sender.id === PlayerId) {
        Player3Id = random_player.id;
      }
      if (sender.id === Player2Id) {
        Player3Id = random_player.id;
      }
      for(Count in client.users.array()) {
        var User = client.users.array()[Count];
        if (!User.bot) {
          if (userData[User.id].kills >= userData[Player3Id].kills && User.id != PlayerId && User.id != Player2Id) {
            Player3Id = User.id;
            Player3Username = User.username;
          }
        }
      }
    }

    if (userCount === 1) {
      message.reply("You are the only person in the season with " + userData[sender.id].kills + " kills.");
    }
    if (userCount === 2) {
      message.reply("The top two in the season with kills (across servers) are currently: " + PlayerUsername + " with " + userData[PlayerId].kills + " kills and " + Player2Username + " with " + userData[Player2Id].kills + " kills.");
    } 
    if (userCount >= 3) {
      message.reply("The top three in the season with kills (across servers) are currently: " + PlayerUsername + " with " + userData[PlayerId].kills + " kills, " + Player2Username + " with " + userData[Player2Id].kills + " kills, and " + Player3Username + " with " + userData[Player3Id].kills + " kills.");
    }
  }
  
  if (command === "baltop") {
    var Count;
    var PlayerId = sender.id;
    var Player2Id = sender.id;
    var Player3Id = sender.id;
    var PlayerUsername = "";
    var Player2Username = "";
    var Player3Username = "";
    for(Count in client.users.array()) {
      var User = client.users.array()[Count];
      if (!User.bot) {
        if (userData[User.id].money >= userData[PlayerId].money) {
          PlayerId = User.id;
          PlayerUsername = User.username;
        }
      }
    }
    if (userCount >= 2) {
      if (sender.id === PlayerId) {
        Player2Id = random_player.id;
      }
      for(Count in client.users.array()) {
        var User = client.users.array()[Count];
        if (!User.bot) {
          if (userData[User.id].money >= userData[Player2Id].money && User.id != PlayerId) {
              Player2Id = User.id;
              Player2Username = User.username;
            }
        }
      }
    }
    if (userCount >= 3) {
      if (sender.id === PlayerId) {
        Player3Id = random_player.id;
      }
      if (sender.id === Player2Id) {
        Player3Id = random_player.id;
      }
      for(Count in client.users.array()) {
        var User = client.users.array()[Count];
        if (!User.bot) {
          if (userData[User.id].money >= userData[Player3Id].money && User.id != PlayerId && User.id != Player2Id) {
            Player3Id = User.id;
            Player3Username = User.username;
          }
        }
      }
    }

    if (userCount === 1) {
      message.reply("You are the only person with $" + userData[sender.id].money + ".");
    }
    if (userCount === 2) {
      message.reply("The top two richest people are currently: " + PlayerUsername + " with $" + userData[PlayerId].money + " and " + Player2Username + " with $" + userData[Player2Id].money + ".");
    } 
    if (userCount >= 3) {
      message.reply("The top three richest people are currently: " + PlayerUsername + " with $" + userData[PlayerId].money + ", " + Player2Username + " with $" + userData[Player2Id].money + ", and " + Player3Username + " with $" + userData[Player3Id].money + ".");
    }
  }

  if (command === "kills" || command === "kill") {
    if (!mentioned) {
      message.reply("You currently have " + userData[sender.id].kills + " kills!");
    } else {
      message.reply(mentioneduser.username + " currently has " + userData[mentioneduser.id].kills + " kills!");
    }
    return
  }

  if (command === "health") {
    if (!mentioned) {
      message.channel.send({"embed":{
      title: "**Statistic Holder** :1234:",
      fields: [{
        name: "Discord Username:",
        value: sender.username
      },
      {
        name: "Health:",
        value: userData[sender.id].health + "♡"
      }]
      }})
    } else {
      message.channel.send({"embed":{
      title: "**Statistic Holder** :1234:",
      fields: [{
        name: "Discord Username:",
        value: mentioneduser.username
      },
      {
        name: "Health:",
        value: userData[mentioneduser.id].health + "♡"
      }]
      }})
    }
    return
  }
  
  if (command === "daily") {
    if (userData[sender.id].daily != moment().format('L')) {
      userData[sender.id].daily = moment().format('L')
      userData[sender.id].dailiesclaimed += 1;
      var random = Math.floor(Math.random()*50);
      userData[sender.id].money += (random + parseInt(userData[sender.id].dailyreward));
      console.log(consolelog + "daily => Success!");
      message.channel.send({embed: {
        title: "Daily Reward :gift:",
        description: "You got $" + (random + parseInt(userData[sender.id].dailyreward)) + " added to your account!"
      }})
    } else {
      console.log(consolelog + "daily => Failure!");
      message.channel.send({embed: {
        title: "Daily Reward :gift:",
        description: "You already collected your daily reward! You can collect your next reward: " + moment().endOf('day').fromNow() + '.'
      }})
    }
    return
  }
  
  if (command === "collect" || command === "vault") {
    if (userData[sender.id].storedmoney === 0) {
      message.channel.send({embed: {
        title: "Vault :money_with_wings:",
        description: "Sorry! You have no money stored up right now!\nIt seems like you've already collected the money from your vault!"
      }})
      console.log(consolelog + "collect ($0) => Failure!");
      return
    }
    message.channel.send({embed: {
      title: "Vault :money_with_wings:",
      description: "You collected $" + Math.round(userData[sender.id].storedmoney) + " from your vault!\n It will continue to refill overtime."
    }})
    console.log(consolelog + "collect ($" + Math.round(userData[sender.id].storedmoney) + ") => Success!");
    userData[sender.id].money += Math.round(userData[sender.id].storedmoney);
    userData[sender.id].storedmoney = 0;
    return
  }
  
  if (command === "healthall") {
    var playerlist = [];
    message.guild.members.forEach(member => {if (client.users.get(member.id).bot) {
      return
    } else {
      playerlist.push(member.user.username + ": " + userData[member.id].health + "♡")
    }})
    sender.send({"embed":{
      title: "**Statistic Holder** :1234:",
      description: playerlist.join("\n")   
    }})
    message.reply("A DM has been sent to you displaying the health of every player!");
  }

  if (command === "info") {
    let question = args.join(" ");
    // Weapons
    if (question === "bomb") {
      info("Bomb (Common) :bomb:", "Deals 8-12 damage to three random players.");
    }
    if (question === "dagger") {
      info("Dagger (Common) :dagger:", "Deals 10 damage to a target player. Attacker has a 50% chance of stealing $50.")
    }
    if (question === "ricochet") {
      info("Ricochet (Common) :comet:", "Deals 10 damage to target player. 50% chance of bouncing off and hitting a random player for an additional 10 damage.")
    }
    if (question === "bow") {
      info("Bow (Rare) :bow_and_arrow:", "Deals damage to target player depending on your health. Does 1 damage to target player per 6 health from the attacker (rounds up).")
    }
    if (question === "molotov") {
      info("Molotov (Rare) :sunny:", "Deals 25 damage to target player. Has 50% chance of hitting, if it misses it will deal 25 damage to a random player instead.")
    }
    if (question === "taser") {
      info("Taser (Rare) :zap:", "Deals 15 damage to a target player and hurts them for 7 damage everytime they attack until the end of the hour (cannot kill attacker)!")
    }
    if (question === "crowbar") {
      info("Crowbar (SCRAPPED) :unlock:", "Deals 20 damage to target player. If you attack with your last crowbar in your inventory, it does an extra 10 damage.")
    }
    if (question === "staff") {
      info("Staff (Epic) :revolving_hearts:", "Deals 35 damage to a target player. *Increases* attacker's health by 10 points.")
    }
    if (question === "gun") {
      info("Gun (Epic) :gun:", "Deals 50 damage to target player. Has a 75% chance of dealing 50 damage, and a 25% chance of being off and only doing 25 damage.")
    }
    if (question === "shield") {
      info("Shield (Epic) :shield:", "When used, next three attackers will deal no damage if directly attacked and will instead be dealt 20 damage back (cannot kill attacker).")
    }
    if (question === "flamethrower") {
      info("Flamethrower (Legendary) :fire:", "Deals 60-100 damage to a target player, and 24-40 damage to two other random players.")
    }
    if (question === "whirlwind") {
      info("Whirlwind (Legendary) :cloud_tornado:", "Deals 80 damage to target player, and 60 damage to a random player.")
    }
    if (question == "nuke") {
      info("Nuke (Mythical) :atom:", "Deals 50 damage to all players on the server.")
    }
    // Boxes
    if (question === "common box") {
      info("Common Box", "Gives you a decent chance for a rare item. 90% common, 10% rare.")
    }
    if (question === "rare box") {
      info("Rare Box", "Gives you a decent chance for an epic item. 90% rare, 10% epic.")
    }
    if (question === "legendary box") {
      info("Legendary Box", "Gives you a guaranteed chance for a legendary item. 100% legendary.")
    }
    if (question === "epic box") {
      info("Epic Box", "Gives you a decent chance for a legendary item. 90% epic, 10% legendary.")
    }
    if (question === "kill box") {
      info("Kill Box", "Gives you a good chance for any type of item. 20% common, 30% rare, 30% epic, 20% legendary.")
    }
    // Pets
    if (question === "akira") {
      info("Akira :hamster:", "A hamster who increases your max starting health by 5! Increases starting health by an extra 3 for each level up.")
    }
    if (question === "waltz") {
      info ("Waltz :rabbit:", "A swift rabbit who gives you a 6% dodge chance for every **direct** attack! When you successfully dodge, you steal 50-80 dollars from the attacker and they lose their weapon. Increases dodge chance by 2% for each level up.")
    }
    if (question === "lupin") {
      info("Lupin :fish:", "An aquatic swimmer who gives you a 15% chance of earning 100-120 dollars when you kill a player. Increases earn chance by 3% for each level up.")
    }
    if (question === "flipp") {
      info("Flipp :dolphin:", "A fliptastic dolphin who has a 25% chance of giving you 10 dollars for each attack. Increases earn chance by 3% for each level up.")
    }
    if (question === "raive") {
      info("Raive :crab:", "A crazy crab who passively fills up your vault with 20% more money each time money is added! Increases vault effect by 12% for each level up.")
    }
    if (question === "byte") {
      info("Byte :shark:", "An aggressive shark who lets you do 5 extra damage during boss raids! Increases damage by 2 for each level up.") 
    }
    // Misc
    if (question === "vault" || question == "storage") {
      info("Vault :lock:", "Stores money overtime which can be redeemable with f!collect. You currently have $" + userData[sender.id].storedmoney + " inside and your limit is $" + userData[sender.id].maxcollectamount + ". Increase your vault with leveling rewards!") 
    }
    if (question === "team" || question === "teams") {
      info("Teams :military_medal:", "Create a team or join a team to battle bosses alongside other members! In boss raids, your entire team gets rewards based on participation!") 
    }
    if (question === "attacking" || question === "attack") {
      info("Attacking :crossed_swords:", "Attack other players using weapons with f!attack <weapon>, which will also sometimes ask you to mention a player afterwards. When you kill a player, it counts to the season and gets you a free box!")
    }
    if (question == "life steal" || question == "lifesteal") {
      info("Life Steal :broken_heart:", "[ABILITY] This ability is permanent throughout gameplay. User will heal 10 health whenever they finish off another player if the user is below 100 health.")
    }
    if (question == "kamikaze") {
      info("Kamikaze :bomb:", "[ABILITY] This ability is permanent throughout gameplay. User will deal an additional 2 damage to each user hit when using a bomb [does not count damage towards a boss].")
    }
    if (question == "super shopper") {
      info("Super Shopper :money_mouth:", "[ABILITY] This ability is permanent throughout gameplay. User gets $10 back when successfully purchasing a box of any kind.")
    }
    if (question == "armed") {
      info("Armed :crossed_swords:", "[ABILITY] This ability is permanent throughout gameplay. User will start off every season with a **epic** gun.")
    }
    if (question == "true winner" || question == "truewinner") {
      info("True Winner :trophy:", "[ABILITY] This ability is permanent throughout gameplay. User will gain an extra trophy from every season.")
    }
    if (question == "lucky charm" || question == "luckycharm") {
      info("Lucky Charm :four_leaf_clover:", "[ABILITY] This ability is permanent throughout gameplay. User will gain extra chances for rewards from boxes.")
    }
    return
  }

  function info(item, information) {
    message.channel.send({"embed":{
      title: "**Help Desk** :question:",
      fields: [{
        name: "Name:",
        value: item
      },
      {
        name: "Info:",
        value: information
      }]
    }})
  }

  if (command === "inv" || command === "inventory" || command === "items") {
    if (!mentioned) {
        message.reply("A DM has been sent to you displaying your inventory!");
      sender.send({"embed":{
        title: "**" + sender.username + "'s Inventory** :briefcase:",
          description: "**" + userData[sender.id].bombs + " bomb(s). :bomb:\n" + userData[sender.id].daggers + " dagger(s). :dagger:\n" + userData[sender.id].ricochets + " ricochet(s). :comet:\n" + userData[sender.id].bows + " bow(s). :bow_and_arrow:\n" + userData[sender.id].tasers + " taser(s). :zap:\n" + userData[sender.id].molotovs + " molotov(s). :sunny:\n" + userData[sender.id].guns + " gun(s). :gun:\n" + userData[sender.id].staffs + " staff(s). :revolving_hearts:\n" + userData[sender.id].shields + " shield(s). :shield:\n" + userData[sender.id].flamethrowers + " flamethrower(s). :fire:\n" + userData[sender.id].whirlwinds + " whirlwind(s). :cloud_tornado:" + "**"
        }});
    return
    } else {
      message.reply("A DM has been sent to you displaying " + mentioneduser.username + "'s inventory!");
      sender.send({"embed":{
        title: "**" + mentioneduser.username + "'s Inventory** :briefcase:",
          description: "**" + userData[mentioneduser.id].bombs + " bomb(s). :bomb:\n" + userData[mentioneduser.id].daggers + " dagger(s). :dagger:\n" + userData[mentioneduser.id].ricochets + " ricochet(s). :comet:\n" + userData[mentioneduser.id].bows + " bow(s). :bow_and_arrow:\n" + userData[mentioneduser.id].tasers + " taser(s). :zap:\n" + userData[mentioneduser.id].molotovs + " molotov(s). :sunny:\n"  + userData[mentioneduser.id].guns + " gun(s). :gun:\n" + userData[mentioneduser.id].staffs + " staff(s). :revolving_hearts:\n" + userData[mentioneduser.id].shields + " shield(s). :shield:\n" + userData[mentioneduser.id].flamethrowers + " flamethrower(s). :fire:\n" + userData[mentioneduser.id].whirlwinds + " whirlwind(s). :cloud_tornado:" + "**"
        }});
    }
  }

  if (command === "pets" || command === "petlist" || command === "pet") {
    if (!mentioned) {
        message.reply("A DM has been sent to you displaying your pets!");
      sender.send({"embed":{
          title: "**" + sender.username + "'s Pets** :briefcase:",
          description: "**" + "Currently Equipped: " + userData[sender.id].selectedpet + "\nLevel " + userData[sender.id].akira + " Akira. :hamster:\nLevel " + userData[sender.id].waltz + " Waltz. :rabbit:\nLevel " + userData[sender.id].lupin + " Lupin. :fish:\nLevel " + userData[sender.id].flipp + " Flipp. :dolphin:\nLevel " + userData[sender.id].raive + " Raive. :crab:\nLevel " + userData[sender.id].byte + " Byte. :shark:" + "**"
        }});
    return
    } else {
      message.reply("A DM has been sent to you displaying " + mentioneduser.username + "'s pets!");
      sender.send({"embed":{
          title: "**" + mentioneduser.username + "'s Inventory** :briefcase:",
          description: "**" + "Currently Equipped: " + userData[mentioneduser.id].selectedpet + "\nLevel " + userData[mentioneduser.id].akira + " Akira. :hamster:\nLevel " + userData[mentioneduser.id].waltz + " Waltz. :rabbit:\nLevel " + userData[mentioneduser.id].lupin + " Lupin. :fish:\nLevel " + userData[mentioneduser.id].flipp + " Flipp. :dolphin:\nLevel " + userData[mentioneduser.id].raive + " Raive. :crab:\nLevel " + userData[sender.id].byte + " Byte. :shark:" + "**"
        }});
    }
  }
  
  if (command === "select") {
    let petname = args[0];
    if (!petname) {
      message.reply("Please include a pet name after that command!");
      console.log(consolelog + "select => No Pet => Failure!");
      return
    }
    if (petname === "akira" || petname === "Akira") {
      if (userData[sender.id].akira != 0) {
        userData[sender.id].selectedpet = "Akira";
        console.log(consolelog + "select => Akira => Success!");
        message.reply("You have successfully chose Akira as your now equipped pet!");
      } else {
        donthavethatpet();
      }
    }
    if (petname === "waltz" || petname === "Waltz") {
      if (userData[sender.id].waltz != 0) {
        userData[sender.id].selectedpet = "Waltz";
        console.log(consolelog + "select => Waltz => Success!");
        message.reply("You have successfully chose Waltz as your now equipped pet!");
      } else {
        donthavethatpet();
      }
    } 
    if (petname === "lupin" || petname === "Lupin") {
      if (userData[sender.id].lupin != 0) {
        userData[sender.id].selectedpet = "Lupin";
        console.log(consolelog + "select => Lupin => Success!");
        message.reply("You have successfully chose Lupin as your now equipped pet!");
      } else {
        donthavethatpet();
      }
    }  
    if (petname === "flipp" || petname === "Flipp") {
      if (userData[sender.id].flipp != 0) {
        userData[sender.id].selectedpet = "Flipp";
        console.log(consolelog + "select => Flipp => Success!");
        message.reply("You have successfully chose Flipp as your now equipped pet!");
      } else {
        donthavethatpet();
      }
    } 
    if (petname === "raive" || petname === "Raive") {
      if (userData[sender.id].raive != 0) {
        userData[sender.id].selectedpet = "Raive";
        console.log(consolelog + "select => Raive => Success!");
        message.reply("You have successfully chose Raive as your now equipped pet!");
      } else {
        donthavethatpet();
      }
    }
    if (petname === "byte" || petname === "Byte") {
      if (userData[sender.id].byte != 0) {
        userData[sender.id].selectedpet = "Byte";
        console.log(consolelog + "select => Byte => Success!");
        message.reply("You have successfully chose Byte as your now equipped pet!");
      } else {
        donthavethatpet();
      }
    }
    return
  }
  
  function donthavethatpet() {
    message.reply("Sorry " + sender.username + ", you don't have that pet! Unlock pets in pet boxes at " + prefix + "shop!") 
  }

  if (command === "attack") {
    if (userCount < 3) {
      message.reply("You need at least three players on the server to attack someone!");
      return
    }
    if (userData[sender.id].tasertime === moment().endOf('day').fromNow() && args[0]) {
      var totaldamage = 0;
      for (i=0;i<7;i++) {
        if (userData[sender.id].health > 1) {
          userData[sender.id].health -= 1;
          totaldamage += 1;
        }
      }
      message.reply("You were tasered and took " + totaldamage + " damage! Time until taser is over: " + moment().endOf('hour').fromNow() + ". You now have " + userData[sender.id].health + "♡.");
      console.log(consolelog + "attack => (Tasered) => Hurt!");
    }
    const item = args[0];
    let member = message.mentions.users.first();
    var Count;
    for (Count in client.users.array) {
      var User = client.users.array()[Count];
      if (client.users.find(u => u.username === User.username)) {
      	let member = client.users.find(u => u.username);
      }
    }
    if (!member) {
      // nothing
    }
    var startweaponsused = userData[sender.id].weaponsused;
    if (item === "bomb") {
      if (userData[sender.id].bombs >= 1) {
        console.log(consolelog + "attack bomb => Success!");
        var damage = Math.floor(Math.random()*5) + 8;
        var damage2 = Math.floor(Math.random()*5) + 8;
        var damage3 = Math.floor(Math.random()*5) + 8;
        userData[sender.id].bombsused += 1;
        if (userData[sender.id].kamikaze) { damage += 2; damage2 += 2; damage3 += 2;}
        userData[random_player.id].health -= damage;
        userData[random_player2.id].health -= damage2;
        userData[random_player3.id].health -= damage3;
        notiflist = [];
        if (userData[sender.id].kamikaze == false) {
          notiflist.push("You did " + damage + " damage to " + random_player.username + " using a bomb! They now have " + userData[random_player.id].health + "♡!")
          notiflist.push("You did " + damage2 + " damage to " + random_player2.username + " using a bomb! They now have " + userData[random_player2.id].health + "♡!");
          notiflist.push("You did " + damage3 + " damage to " + random_player3.username + " using a bomb! They now have " + userData[random_player3.id].health + "♡!");
        } else {
          notiflist.push("You did " + damage + " (+2 kamikaze) damage to " + random_player.username + " using a bomb! They now have " + userData[random_player.id].health + "♡!")
          notiflist.push("You did " + damage2 + " (+2 kamikaze) damage to " + random_player2.username + " using a bomb! They now have " + userData[random_player2.id].health + "♡!");
          notiflist.push("You did " + damage3 + " (+2 kamikaze) damage to " + random_player3.username + " using a bomb! They now have " + userData[random_player3.id].health + "♡!");
        }
        message.reply(notiflist);
        userData[sender.id].bombs -= 1;
        userData[sender.id].weaponsused += 1;
      } else {
        console.log(consolelog + "attack bomb => Failure!");
        notenough();
        return
      }
    }
    if (item === "taser") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack taser => THEMSELVES => Failure!");
        message.reply("Don't taser yourself! That's blasphemy! :raised_hands:");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack taser => NO USER => Failure!");
      } else {
        if (userData[sender.id].tasers >= 1) {
          console.log(consolelog + "attack taser => Success!");
          var damage = 15;
          userData[member.id].health -= damage;
          message.reply("You did " + damage + " damage to " + member.username + " using a taser! They have " + userData[member.id].health + "♡ and now take damage when they attack until the end of the hour!");
          userData[member.id].tasertime = moment().endOf('day').fromNow();
          userData[sender.id].tasers -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack taser => Failure!");
          notenough();
          return
        }
      }
    }
    if (item === "staff") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack staff => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack staff => NO USER => Failure!");
      } else {
        if (userData[sender.id].staffs >= 1) {
          console.log(consolelog + "attack staff => Success!")
          var damage = 35;
          var healingamount = 10;
          userData[member.id].health -= damage;
          message.reply("You leeched " + healingamount + " health and did " + damage + " damage to " + member.username + " using a staff! They now have " + userData[member.id].health + "♡!");
          userData[sender.id].staffs -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack staff => Failure!")
          notenough();
          return
        }
      }
    }
    if (item === "dagger") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack dagger => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack dagger => NO USER => Failure!");
      } else {
        if (userData[sender.id].daggers >= 1) {
          console.log(consolelog + "attack dagger => Success!")
          var damage = 10;
          if (userData[member.id].money >= 75) {
            var chance = Math.floor(Math.random()*100);
          } else {
            var chance = 100
          }
          userData[member.id].health -= damage;
          if (chance >= 50) {
            message.reply("You did " + damage + " damage to " + member.username + " using a dagger! They now have " + userData[member.id].health + "♡!");
          } else {
            message.reply("You did " + damage + " damage to " + member.username + " using a dagger! You also stole $50 from them! They now have " + userData[member.id].health + "♡!");
            userData[sender.id].money += 50;
            userData[member.id].money -= 50;
            userData[sender.id].daggerrob += 1;
          }
          userData[sender.id].daggers -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack dagger => Failure!")
          notenough();
          return
        }
      }
    }
    if (item === "flamethrower") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack flamethrower => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack flamethrower => NO USER => Failure!");
      } else {
        if (userData[sender.id].flamethrowers >= 1) {
          console.log(consolelog + "attack flamethrower => Success!")
          var damage = 0;
          var lesserdamage = 0;
          var randomvar = Math.floor(Math.random()*3);
          for (randomvar; randomvar<5; randomvar++) {
            damage += 20;
            lesserdamage += 8;
          }
          userData[member.id].health -= damage;
          userData[random_player.id].health -= lesserdamage;
          userData[random_player2.id].health -= lesserdamage;
          notiflist = [];
          notiflist.push("You did " + damage + " fire damage to " + member.username + " using a flamethrower! They now have " + userData[member.id].health + "♡!");
          notiflist.push("You did " + lesserdamage + " fire damage to " + random_player.username + " using a flamethrower! They now have " + userData[random_player.id].health + "♡!");
          notiflist.push("You did " + lesserdamage + " fire damage to " + random_player2.username + " using a flamethrower! They now have " + userData[random_player2.id].health + "♡!");
          message.reply(notiflist);
          userData[sender.id].flamethrowers -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack flamethrower => Failure!")
          notenough();
          return
        }
      }
    }
    if (item === "gun") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack gun => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack gun => NO USER => Failure!");
      } else {
        if (userData[sender.id].guns >= 1) {
          console.log(consolelog + "attack gun => Success!")
          var damage = 50;
          var chance = Math.floor(Math.random()*100);
          if (chance <= 75) {
            userData[member.id].health -= damage;
            message.reply("You did " + damage + " damage to " + member.username + " using a gun! They now have " + userData[member.id].health + "♡!");
          } else {
            userData[member.id].health -= 25;
            userData[sender.id].missedshots += 1;
            message.reply("You tried to hit " + member.username + " using a gun, but you were off and only did 25 damage! They now have " + userData[member.id].health + "♡!");
          }
          userData[sender.id].guns -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack gun => Failure!")
          notenough();
          return
        }
      }
    }
    if (item === "shield") {
      if (userData[sender.id].shields >= 1) {
        userData[sender.id].shieldactivated += 3;
        userData[sender.id].shieldsused += 1;
        userData[sender.id].shields -= 1;
        message.reply("You activated a shield! The next additional three attacks dealt to you will now have no effect on you and will deal back 20 damage (without killing them)!");
        console.log(consolelog + "attack shield => Success!")
      } else {
        console.log(consolelog + "attack shield => Failure!")
        notenough();
        return
      }
    }
    if (item === "ricochet") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack ricochet => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack ricochet => NO USER => Failure!");
      } else {
        if (userData[sender.id].ricochets >= 1) {
          console.log(consolelog + "attack ricochet => Success!")
          var damage = 10;
          var lesserdamage = 10;
          var notiflist = [];
          userData[member.id].health -= damage;
          userData[sender.id].ricochets -= 1;
          userData[sender.id].weaponsused += 1;
          notiflist.push("You did " + damage + " damage to " + member.username + " using a ricocheting ball! They now have " + userData[member.id].health + "♡!")
          var randomone = Math.floor(Math.random()*100);
          if (randomone >= 50) {
            userData[random_player.id].health -= lesserdamage;
            notiflist.push("You did " + lesserdamage + " damage to " + random_player.username + " using a ricocheting ball! They now have " + userData[random_player.id].health + "♡!")
          }
          message.reply(notiflist);
        } else {
          console.log(consolelog + "attack ricochet => Failure!")
          notenough();
          return
        }
      }
    }
    if (item === "bow") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack bow => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack bow => NO USER => Failure!");
      } else {
        if (userData[sender.id].bows >= 1) {
          console.log(consolelog + "attack bow => Success!")
          var damage = 0;
          for (i=userData[sender.id].health;i>0;i) {
            i -= 6;
            damage += 1;
          }
          userData[member.id].health -= damage;
          message.reply("You did " + damage + " damage to " + member.username + " using a bow! They now have " + userData[member.id].health + "♡!");
          userData[sender.id].bows -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack bow => Failure!")
          notenough();
          return
        }
      }
    }
    if (item === "molotov") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack molotov => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack molotov => NO USER => Failure!");
      } else {
        if (userData[sender.id].molotovs >= 1) {
          console.log(consolelog + "attack molotov => Success!")
          var damage = 25;
          var chance = Math.floor(Math.random()*100);
          if (chance >= 50) {
            userData[member.id].health -= damage;
            message.reply("You did " + damage + " damage to " + member.username + " using a molotov! They now have " + userData[member.id].health + "♡!");
          } else {
            userData[random_player.id].health -= damage;
            message.reply("You attempted to throw a molotov, but missed! You did " + damage + " damage to " + random_player.username + " using a molotov! They now have " + userData[random_player.id].health + "♡!");
          }
          userData[sender.id].molotovs -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack molotov => Failure!")
          notenough();
          return
        }
      }
    }
    /*if (item === "crowbar") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack crowbar => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack crowbar => NO USER => Failure!");
      } else {
        if (userData[sender.id].crowbars >= 1) {
          console.log(consolelog + "attack crowbar => Success!")
          var damage = 20;
          if (userData[sender.id].crowbars === 1) {
            damage += 10;
            userData[member.id].health -= damage;
            message.reply("Using your last crowbar, you did " + damage + " damage to " + member.username + " using a crowbar! They now have " + userData[member.id].health + "♡!");
          } else {
            userData[member.id].health -= damage;
            message.reply("You did " + damage + " damage to " + member.username + " using a crowbar! They now have " + userData[member.id].health + "♡!");
          }
          userData[sender.id].crowbars -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack crowbar => Failure!")
          notenough();
          return
        }
      }
    }*/
    if (item === "whirlwind") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack whirlwind => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack whirlwind => NO USER => Failure!");
      } else {
        if (userData[sender.id].whirlwinds >= 1) {
          console.log(consolelog + "attack whirlwind => Success!")
          var damage = 80;
          var lesserdamage = 60;
          userData[member.id].health -= damage;
          userData[random_player.id].health -= lesserdamage;
          message.reply("You did 80 damage to " + member.username + " and 60 damage to " + random_player.username + " using a whirlwind! " + member.username + " has " + userData[member.id].health + "♡ and " + random_player.username + " has " + userData[random_player.id].health + "♡!");
          userData[sender.id].whirlwinds -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack whirlwind => Failure!")
          notenough();
          return
        }
      }
    }
    if (item === "nuke") {
      const member = message.mentions.users.first();
      if (member === sender) {
        console.log(consolelog + "attack nuke => THEMSELVES => Failure!");
        message.reply("Don't do that to yourself! Select someone else!");
        return
      }
      if (!member) {
        message.reply("Please include a target player!");
        console.log(consolelog + "attack nuke => NO USER => Failure!");
      } else {
        if (userData[sender.id].nukes >= 1) {
          console.log(consolelog + "attack nuke => Success!")
          var Count;
          for(Count in client.users.array()) {
            var User = client.users.array()[Count];
            if (!client.users.get(User.id).bot) {
              userData[User.id].health -= 50;
            }
          }
          message.reply("You did 50 damage to every player on the database using a nuke!");
          userData[sender.id].nukes -= 1;
          userData[sender.id].weaponsused += 1;
        } else {
          console.log(consolelog + "attack nuke => Failure!")
          notenough();
          return
        }
      }
    }
    if (!member) {
      // nothing, oof 
    } else {
      if (userData[member.id].shieldactivated >= 1 && item != "shield" && userData[sender.id].tasertime != moment().endOf('day').fromNow()) {
        userData[member.id].shieldactivated -= 1;
        userData[member.id].health += damage;
        var recoil = 0;
        for (i=0;i<20;i++) {
          if (userData[sender.id].health > 1) {
            userData[sender.id].health -= 1;
            recoil += 1;
          }
        }
        console.log(consolelog + "attack => (Shield) => Failure!");
        message.reply("However, " + member.username + " had a shield on and automatically dealt " + recoil + " damage back! Their shield can withstand " + userData[member.id].shieldactivated + " more hits and you now have " + userData[sender.id].health +"♡!")
        return
      }
      if (userData[member.id].selectedpet === "Waltz" || userData[member.id].dodgechance > 0) {
        let randomchance = Math.floor(Math.random()*100);
        let dodgechance = userData[member.id].dodgechance;
        if (userData[member.id].selectedpet === "Waltz") {
          dodgechance += (userData[member.id].waltz*2)
        }
        if (dodgechance >= randomchance) {
          var moneystolen = Math.floor(Math.random()*31) + 50;
          if (userData[sender.id].money < moneystolen) {
           userData[member.id].money += moneystolen;
          } else {
            userData[sender.id].money -= moneystolen;
            userData[member.id].money += moneystolen;
          }
          userData[member.id].health += damage;
          message.reply("What was unexpected, was that " + member.username + ", managed to dodge the attack and steal " + moneystolen + " from you!");
          return
        }
      }
    }
    if (userData[sender.id].selectedpet === "Flipp" && userData[sender.id].weaponsused > startweaponsused) {
      var chance = Math.floor(Math.random()*100);
      if (chance >= 70-((userData[sender.id].flipp-1)*3)) {
        userData[sender.id].money += 10;
        message.reply("Your pet Flipp helped you gain an extra $10 from attacking!");
        userData[sender.id].flippmoney += 10;
      }
    }
  }

  if (command === "shop") {
    if (!args[0]) {
      message.channel.send({"embed":{
      title: "**Shop** :shopping_cart:",
      fields: [{
        name: "Weapon Shop :bomb:",
        value: "Do f!shop weapon to open the weapon shop GUI!"
      },
      {
        name: "Pet Shop :dog:",
        value: "Do f!shop pet to open the pet shop GUI!"
      }]
      }})
      return
    }
    if (args[0].toLowerCase() === "weapons" || args[0].toLowerCase() === "weapon") {
      message.channel.send({"embed":{
      title: "Shop :shopping_cart:",
      fields: [{
        name: "Common Box ($" + Math.round(commonboxprice - (commonboxprice * userData[sender.id].discount)) + ")",
        value: "Get a random common or rare weapon!"
      },
      {
        name: "Rare Box ($" + Math.round(rareboxprice - (rareboxprice * userData[sender.id].discount)) + ")",
        value: "Get a random rare or epic weapon!"
      },
      {
        name: "Epic Box ($" + Math.round(epicboxprice - (epicboxprice * userData[sender.id].discount)) + ")",
        value: "Get a random epic or legendary weapon!"
      },
      {
        name: "Legendary Box ($" + Math.round(legendaryboxprice - (legendaryboxprice * userData[sender.id].discount)) + ")",
        value: "Get a random legendary weapon!"
      }]
      }})
      return
    }
    if (args[0].toLowerCase() === "pets" || args[0].toLowerCase() === "pet") {
      message.channel.send({"embed":{
      title: "Shop :shopping_cart:",
      fields: [{
        name: "Pet Box ($" + Math.round((((userData[sender.id].petboxes * petboxincrement) + petboxprice)) - ((((userData[sender.id].petboxes * petboxincrement) + petboxprice)) * userData[sender.id].discount)) + ")",
        value: "Get a random pet essence! Increases price per box."
      }]
      }})
      return
    }
    message.reply("That is not a valid argument!");
    return
  }

  function notenoughtrophies() {
    message.reply("Sorry, you don't have enough trophies to do that!");
    return
  }
  
  if (command === "redeem") {
    if (!args[0]) {
      message.reply("A DM has been sent to you with the possible redeem options!");
      sender.send({"embed": {
        "title": ":trophy: **Redeem Trophies** :trophy:",
        "description": "To redeem your precious trophies, add one of the below after the command. All perks listed below are permanent and do not need to be 'equipped'. Each cost 1 :trophy: to upgrade.",
        "color": 4516698,
        "fields": [
          {
            "name": "Health :heartpulse:",
            "value": "Increase your health by 4! (Current: " + userData[sender.id].maxhealth + "♡)"
          },
          {
            "name": "Strength :punch:",
            "value": "Increase your team damage against bosses by 2! (Current: +" + userData[sender.id].extrastrength + ")"
          },
          {
            "name": "Luck :four_leaf_clover:",
            "value": "Increase your roulette win chance by 1%! (Current: " + userData[sender.id].luckchance + "%)"
          },
          {
            "name": "Speed :athletic_shoe:",
            "value": "Increase your dodge chance by 2% (get $50-$80 for dodging)! (Current: " + userData[sender.id].dodgechance + "%)"
          },
          {
            "name": "Storage :lock:",
            "value": "Increase your maximum vault capacity by $20. (Current: $" + userData[sender.id].maxcollectamount + ")"
          },
          {
            "name": "Wealth :moneybag:",
            "value": "Increase your vault's fill speed by 10%. (Current: +" + userData[sender.id].extrafillamount*100 + "%)"
          }
        ]
      }})
      return 
    }
    if (args[0].toLowerCase() === "health") {
      if (userData[sender.id].maxhealth > 140) {
        message.reply("You've already reached the max limit for additional health!")
        return 
      }
      if (userData[sender.id].trophies >= 0) {
        userData[sender.id].maxhealth += 4;
        userData[sender.id].trophies -= 1;
        userData[sender.id].redemptions += 1;
        message.reply("You successfully increased your max health and now start with " + userData[sender.id].maxhealth + "♡!");
      } else {
        notenoughtrophies();
      }
    }
    if (args[0].toLowerCase() === "strength") {
      if (userData[sender.id].extrastrength >= 20) {
        message.reply("You've already reached the max limit for additional strength!")
        return 
      }
      if (userData[sender.id].trophies > 0) {
        userData[sender.id].extrastrength += 2;
        userData[sender.id].trophies -= 1;
        userData[sender.id].redemptions += 1;
        message.reply("You successfully increased your strength and now deal +" + userData[sender.id].extrastrength + " damage to bosses!");
      } else {
        notenoughtrophies();
      }
    }
    if (args[0].toLowerCase() === "luck") {
      if (userData[sender.id].luckchance >= 10) {
        message.reply("You've already reached the max limit for additional luck!")
        return 
      }
      if (userData[sender.id].trophies > 0) {
        userData[sender.id].luckchance += 1;
        userData[sender.id].trophies -= 1;
        userData[sender.id].redemptions += 1;
        message.reply("You successfully increased your luck and now have a +" + userData[sender.id].luckchance + "% extra chance to win roulette!");
      } else {
        notenoughtrophies();
      }
    }  
    if (args[0].toLowerCase() === "speed") {
      if (userData[sender.id].dodgechance > 20) {
        message.reply("You've already reached the max limit for your dodge chance!")
        return 
      }
      if (userData[sender.id].trophies > 0) {
        userData[sender.id].dodgechance += 2;
        userData[sender.id].trophies -= 1;
        userData[sender.id].redemptions += 1;
        message.reply("You successfully increased your speed and now have a +" + userData[sender.id].luckchance + "% dodge chance!");
      } else {
        notenoughtrophies();
      }
    }  
    if (args[0].toLowerCase() === "storage") {
      if (userData[sender.id].trophies > 0) {
        userData[sender.id].maxcollectamount += 20;
        userData[sender.id].trophies -= 1;
        userData[sender.id].redemptions += 1;
        message.reply("You successfully increased your vault and it can now hold up to $" + userData[sender.id].maxcollectamount + "!");
      } else {
        notenoughtrophies();
      }
    } 
    if (args[0].toLowerCase() === "wealth") {
      if (userData[sender.id].extrafillamount > 2) {
        message.reply("You've already reached the max limit for your vault fill speed!")
        return 
      }
      if (userData[sender.id].trophies > 0) {
        userData[sender.id].extrafillamount += 0.1;
        userData[sender.id].trophies -= 1;
        userData[sender.id].redemptions += 1;
        message.reply("You successfully increased your vault's fill speed and now fills up " + parseInt(userData[sender.id].extrafillamount*100) + "% faster!")
      } else {
        
      }
    } 
  }
  
  if (command === "teams") {
  	var Count;
  	var teamlist = [];
  	for (Count in client.users.array()) {
  	  var User = client.users.array()[Count];
      if (!User.bot) {
        if (userData[User.id].team != noteam && !teamlist.includes(userData[User.id].team) && userData[User.id].teamrole === "leader") {
          teamlist.push("Team '" + userData[User.id].team + "' created by " + User.username + ".");
      	}
      }
    }
    if (teamlist.length === 0) {
      message.channel.send("No teams registered in the database!");
    } else {
    message.channel.send("**Teams:**");
	  message.channel.send(teamlist);
    }
  }

  if (command === "team") {
    let extra = args[0]
    if (!args[0]) {
      if (userData[sender.id].team === noteam) {
        message.reply("You are currently not in a team!");
      } else {
        message.reply("You are currently in the " + userData[sender.id].team + " team. Your role: '" + userData[sender.id].teamrole + "'.")
      }
    } else {
      if (mentioned) {
        if ("<@" + mentioneduser.id + ">" === args[0]) {
          if (userData[mentioneduser.id].team === noteam) {
            message.reply(mentioneduser.username + " is currently not in a team!")
          } else {
            message.reply(mentioneduser.username + " is currently in the " + userData[mentioneduser.id].team + " team. His/her role: '" + userData[mentioneduser.id].teamrole + "'.");
          }
          return
        }
      }
      let extra = args[0].toLowerCase();
      if (extra === "create") {
        let teamname = args[1]
        var Count;
        for (Count in client.users.array()) {
          var User = client.users.array()[Count];
          if (!User.bot) {
            if (teamname === userData[User.id].team && userData[User.id].teamrole === "leader") {
              message.reply("Sorry, that team name has already been taken by a discord user named " + User.username + "!");
              return
            }
          }
        }
        if (userData[sender.id].team != noteam) {
          message.reply("Please leave your current team before creating another one!");
          console.log(consolelog + "team create => Failure!");
          return
        }
        if (!args[1]) {
          message.reply("Please include a team name after that! Make sure it is one word.");
          console.log(consolelog + "team create => Failure!");
          return
        }
        if (args[1].length > 16) {
          message.reply("Please keep your team name under 16 characters with no spaces!");
          console.log(consolelog + "team create " + teamname + " => Failure!");
          return
        }
        if (args[1] === noteam) {
          message.reply("Sorry, that is not a valid team name!");
          console.log(consolelog + "team create " + noteam + " => Failure!")
          return
        }
        if (!args[2]) {
          message.reply("Team created: " + teamname + ".");
          userData[sender.id].team = teamname;
          userData[sender.id].teamrole = "leader";
          console.log(consolelog + "team create " + teamname + " => Success!");
        } else {
          message.reply("Please limit your team name to one word! Use underscores if needed!");
          console.log(consolelog + "team create => Failure!");
          return
        }
      }
      if (extra === "leave") {
        if (userData[sender.id].team === noteam) {
          message.reply("You're currently not in a team! Do " + prefix + "help to find out more!");
          console.log(consolelog + "team leave => Failure!")
          return
        }
        if (userData[sender.id].teamrole === "leader") {
          message.reply("Successfully left team '" + userData[sender.id].team + "'. Since you were leader, everyone else was kicked out and notified.")
        } else {
          message.reply("Successfully left team '" + userData[sender.id].team + "'.")
        }
        if (userData[sender.id].teamrole === "leader") {
          console.log(consolelog + "team leave => Was leader, so everyone was kicked. => Success!")
          var Count;
          for (Count in client.users.array()) {
            var User = client.users.array()[Count];
            if (!User.bot) {
              if (userData[User.id].team === userData[sender.id].team) {
                if (User.id === sender.id) {
                   // ignore
                } else {
                  User.send("The team you were in, called '" + userData[User.id].team + "'), was disbanded by " + sender.username + ", the leader of the team! Create or join another team!")
                  userData[User.id].team = noteam;
                  userData[User.id].teamrole = "member";
                  userData[User.id].teaminvite = "";
                }
              }
            }
          }
        }
        userData[sender.id].team = noteam;
        userData[sender.id].teamrole = "member";
        console.log(consolelog + "leave => Success!")
      }
      if (extra === "promote") {
        if (userData[sender.id].team === noteam) {
          message.reply("You are currently not in a team!");
          console.log(consolelog + "team promote => Failure!")
          return
        }
        if (userData[sender.id].teamrole != "leader") {
          message.reply("Only the leader of the team can promote members!");
          console.log(consolelog + "team promote => Failure!")
          return
        }
        if (!mentioned) {
          message.reply("Please include the name of the player you want to promote to officer!");
          console.log(consolelog + "team promote => Failure!")
          return
        } else {
          if (mentioneduser.id === sender.id) {
            message.reply("You can't promote yourself!");
            console.log(consolelog + "team promote => Failure!")
            return
          }
          if (userData[mentioneduser.id].team != userData[sender.id].team) {
            message.reply("You can only promote someone who is in the same team as you!");
            console.log(consolelog + "team promote => Failure!")
          } else {
            userData[mentioneduser.id].teamrole = "officer";
            console.log(consolelog + "team promote " + mentioneduser.username + " => Success!")
            message.channel.send(sender.username + " has promoted " + mentioneduser + " to an officer of " + userData[sender.id].team + "!");
            return
          }
        }
      }
      if (extra === "makeleader") {
        if (userData[sender.id].team === noteam) {
          message.reply("You are currently not in a team!");
          console.log(consolelog + "team makeleader => Failure!")
          return
        }
        if (userData[sender.id].teamrole != "leader") {
          message.reply("Only the leader of the team can pick someone to make the leader!");
          console.log(consolelog + "team makeleader => Failure!")
          return
        }
        if (!mentioned) {
          message.reply("Please include the name of the player you want to make leader!");
          console.log(consolelog + "team makeleader => Failure!")
          return
        } else {
          if (mentioneduser.id === sender.id) {
            message.reply("You can't make yourself the leader!");
            console.log(consolelog + "team makeleader => Failure!")
            return
          }
          if (userData[mentioneduser.id].team != userData[sender.id].team) {
            message.reply("You can only make somebody leader who is in the same team as you!");
            console.log(consolelog + "team makeleader => Failure!")
          } else {
            userData[mentioneduser.id].teamrole = "leader";
            console.log(consolelog + "team makeleader " + mentioneduser.username + " => Success!")
            userData[sender.id].teamrole = "member";
            message.channel.send(sender.username + " has promoted " + mentioneduser + " to the new leader of " + userData[sender.id].team + "!");
            return
          }
        }
      }
      if (extra === "invite") {
        if (userData[sender.id].team === noteam) {
          message.reply("You are currently not in a team!")
          console.log(consolelog + "team invite => Failure!")
          return
        }
        if (userData[sender.id].teamrole === "member") {
          message.reply("You don't have valid permissions to use the invite command!");
           console.log(consolelog + "team invite => Failure!")
          return
        }
        if (!mentioned) {
          message.reply("Please include the name of the player you want to invite!")
           console.log(consolelog + "team invite => Failure!")
          return
        }
        if (userData[mentioneduser.id].team != noteam) {
          message.reply("That player already has a team! Invite someone who is not already in a team!")
          console.log(consolelog + "team invite => Failure!")
          return
        }
        var Count;
        var sameteammembers = 0;
        for (Count in client.users.array()) {
          var User = client.users.array()[Count];
          if (!User.bot) {
            if (userData[User.id].team === userData[sender.id].team) {
               sameteammembers += 1;
            }
          }
        }
        if (sameteammembers === userData[sender.id].teamlimit) {
          message.reply("Sorry, the max amount of players allowed in a single team is 3!");
          console.log(consolelog + "team invite => Failure!")
          return
        }
        console.log(consolelog + "team invite " + mentioneduser.username + " => Success!")
        userData[mentioneduser.id].teaminvite = userData[sender.id].team;
        userData[mentioneduser.id].teaminvitetime = moment().format('L');
        message.channel.send(mentioneduser.username + ", you have been invited by " + sender.username + " to join their team: '" + userData[sender.id].team + "'. You have one day to accept. Do 'f!team accept " + userData[sender.id].team + "'!");
      }
      if (extra === "accept") {
        let teamname = args[1]
        if (userData[sender.id].team != noteam) {
          message.reply("You are already in a team!");
           console.log(consolelog + "team accept => Failure!")
          return
        }
        if (!args[1]) {
          message.reply("Please include the name of the team you were invited to afterwards!");
          console.log(consolelog + "team accept => Failure!")
          return
        }
        if (userData[sender.id].teaminvitetime != moment().format('L') || userData[sender.id].teaminvite != teamname) {
          message.reply("That is either not a valid team or you were not invited!")
          console.log(consolelog + "team accept " + teamname + " => Failure!")
          return
        }
        if (userData[sender.id].teaminvite === teamname) {
          message.reply("You successfully joined " + teamname + "!")
          userData[sender.id].teamjoined = true;
          userData[sender.id].team = teamname;
          userData[sender.id].teamrole = "member";
          userData[sender.id].teaminvite = noteam;
          console.log(consolelog + "team accept " + teamname + " => Success!")
        }
      }
      if (extra === "members") {
        if (userData[sender.id].team === noteam) {
          message.reply("You are currently not in a team!");
          return
        }
        var Count;
        var memberlist = [];
        for (Count in client.users.array()) {
          var User = client.users.array()[Count];
          if (!User.bot) {
            if (userData[User.id].team === userData[sender.id].team) {
              memberlist.push(User.username + " is in the team. Role: '" + userData[User.id].teamrole + "'.");
            }
          }
        }
        message.channel.send({"embed":{
          title: "**Statistic Holder** :1234:",
          description: memberlist.join("\n")   
        }})
      }
      if (extra === "kick") {
        if (userData[sender.id].team === noteam) {
          message.reply("You are not currently in a team!")
          console.log(consolelog + "team kick => Failure!")
          return
        }
        if (!mentioned) {
          message.reply("Please include the name of the member you want to kick!")
          console.log(consolelog + "team kick => Failure!")
          return
        }
        if (userData[sender.id].teamrole != "leader") {
          message.reply("Sorry, you don't have permissions to kick someone out of your team!")
          console.log(consolelog + "team kick " + mentioneduser.username + " => Failure!")
          return
        }
        userData[mentioneduser.id].team = noteam;
        userData[mentioneduser.id].teamrole = "member";
        message.channel.send(mentioned + " was kicked out of the team by " + sender.username + "!");
        mentioneduser.send("You were kicked out of your current team! Can I get an F in the chat?");
        console.log(consolelog + "team kick " + mentioneduser.username + " => Success!")
        return
      }
      if (extra === "attack") {
        var weapon = args[1];
        if (userData[sender.id].team === noteam) {
          message.reply("You are not currently in a team!");
          console.log(consolelog + "team attack => Failure!")
          return
        }
        if (extraVars["bosshealth"] <= 0) {
          message.reply("There is no current bot raid event going on!")
          console.log(consolelog + "team attack => No raid is ongoing. => Failure!")
          return
        }
        if (!args[1]) {
          message.reply("Please select a valid weapon to use! The format is: *f!team attack <weapon>*.");
          console.log(consolelog + "team attack => No weapon specified. => Failure!")
        }
        if (userData[sender.id].selectedpet === "Byte") {
          userData[sender.id].extrastrength += 5 + (userData[sender.id].byte * 2) 
        }
        if (weapon === "bomb") {
          if (userData[sender.id].bombs <= 0) {
            notenough();
            return
          }
          var damage = (Math.floor(Math.random()*5)+8) + (Math.floor(Math.random()*5)+8) + (Math.floor(Math.random()*5)+8);
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using all blasts from the bomb, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!");
          userData[sender.id].bombs -= 1;
        }
        if (weapon === "dagger") {
          if (userData[sender.id].daggers <= 0) {
            notenough();
            return
          }
          var damage = 10;
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using a dagger, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
          userData[sender.id].daggers -= 1;
        }
        if (weapon === "ricochet") {
          if (userData[sender.id].ricochets <= 0) {
            notenough();
            return
          }
          var chance = Math.floor(Math.random()*100);
          if (chance >= 50) {
            damage = 10;
            damage += userData[sender.id].extrastrength;
            extraVars["bosshealth"] -= damage;
            message.reply("Using a ricochet, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
          } else {
            damage = 20;
            damage += userData[sender.id].extrastrength;
            extraVars["bosshealth"] -= damage;
            message.reply("Using a bouncing ricochet shot, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
          }
          userData[sender.id].ricochets -= 1;
        }
        if (weapon === "bow") {
          if (userData[sender.id].bows <= 0) {
            notenough();
            return
          }
          var damage = 0;
          var i;
          for (i=userData[sender.id].health;i>0;i) {
            i -= 7;
            damage += 1;
          }
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using a bow, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
        }
        if (weapon === "taser") {
          if (userData[sender.id].tasers <= 0) {
            notenough();
            return
          }
          var damage = 8;
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using a taser, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
        }
        if (weapon === "molotov") {
          if (userData[sender.id].molotovs <= 0) {
            notenough();
            return
          }
          var damage = 25;
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using a molotov, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
        }
        if (weapon === "gun") {
          if (userData[sender.id].guns <= 0) {
            notenough();
            return
          }
          var chance = Math.floor(Math.random()*100);
          if (chance >= 50) {
            var damage = 50;
          } else {
            var damage = 25;
          }
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using a gun, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
        }
        if (weapon === "staff") {
          if (userData[sender.id].staffs <= 0) {
            notenough();
            return
          }
          var damage = 25;
          userData[sender.id].health += 10;
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using a staff, you did " + damage + " damage to the boss and healed 10 health! The boss now has " + extraVars["bosshealth"] + "♡!")
        }
        if (weapon === "shield") {
          if (userData[sender.id].shields <= 0) {
            notenough();
            return
          }
          userData[sender.id].shieldactivated += 2;
          message.reply("Using a shield, you blocked the next two attacks and will do 20 damage to whoever attacks you!");
          userData[sender.id].shields -= 1;
        }
        if (weapon === "flamethrower") {
          if (userData[sender.id].flamethrowers <= 0) {
            notenough();
            return
          }
          var damage = 0;
          var randomvar = Math.floor(Math.random()*3);
          for (randomvar; randomvar<5; randomvar++) {
            damage += 28;
          }
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using a flamethrower, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
        }
        if (weapon === "whirlwind") {
          if (userData[sender.id].whirlwinds <= 0) {
            notenough();
            return
          }
          var damage = 110;
          damage += userData[sender.id].extrastrength;
          extraVars["bosshealth"] -= damage;
          message.reply("Using a whirlwind, you did " + damage + " damage to the boss! The boss now has " + extraVars["bosshealth"] + "♡!")
        }
        if (!damage && weapon != "shield") {
          message.reply("Please specify a valid weapon!");
          console.log(consolelog + "team attack " + weapon + " => Failure!")
          return
        }
        if (userData[sender.id].selectedpet === "Byte") {
          userData[sender.id].extrastrength -= (5 + (userData[sender.id].byte * 2))
        }
        console.log(consolelog + "team attack " + weapon + " => Success!")
        if (extraVars["bosshealth"] < 0) {
          damage -= Math.abs(extraVars["bosshealth"]);
        }
        var Count;
        for (Count in client.users.array()) {
          var User = client.users.array()[Count];
          if (!User.bot) {
            if (userData[User.id].team === userData[sender.id].team) {
              userData[User.id].teamdamage += damage;
            }
          }
        }

        if (extraVars["bosshealth"] <= 0) {
          var Count;
          message.channel.send(sender.username + " vanquished the boss and everyone who participated got rewards!");
          for (Count in client.users.array()) {
            var User = client.users.array()[Count];
            if (!User.bot) {
              if (userData[User.id].team != noteam && userData[User.id].teamdamage > 0) {
                userData[User.id].money += userData[User.id].teamdamage;
                User.send(sender.username + " delivered the final blow towards the boss in the boss raid event! You got $" + userData[User.id].teamdamage + " for your team participating!");
                console.log("(" + message.guild.name + ") " + User.username + " got $" + userData[User.id].teamdamage + " from their team's participation in the bot raid!")
              }
            }
          }
        }
        return
      }
    }
  }
  
  function notenough() {
    message.reply("Sorry, you do not have enough of those to use that!");
  }

  function toopoor() {
    message.reply("Sorry, you cannot do that because of insufficient funds!")
  }

  function openbox(rarity) {
    if (rarity === "common") {
      select(commonboxitemrarity[Math.floor(Math.random()*commonboxitemrarity.length)]);
    }
    if (rarity === "rare") {
      select(rareboxitemrarity[Math.floor(Math.random()*rareboxitemrarity.length)]);
    }
    if (rarity === "epic") {
      select(epicboxitemrarity[Math.floor(Math.random()*epicboxitemrarity.length)]);
    }
    if (rarity === "legendary") {
      select(legendaryboxitemrarity[Math.floor(Math.random()*legendaryboxitemrarity.length)]);
    }
    if (rarity === "pet") {
      unlock(petboxchances[Math.floor(Math.random()*petboxchances.length)]);
    }
  }

  function select(rarity) {
    if (rarity === "common") {
      unlock(commonchances[Math.floor(Math.random()*commonchances.length)]);
    }
    if (rarity === "rare") {
      unlock(rarechances[Math.floor(Math.random()*rarechances.length)]);
    }
    if (rarity === "epic") {
      unlock(epicchances[Math.floor(Math.random()*epicchances.length)]);
    }
    if (rarity === "legendary") {
      unlock(legendarychances[Math.floor(Math.random()*legendarychances.length)]);
    }
  }

  function unlock(item) {
    if (userData[sender.id].supershopper) { 
      userData[sender.id].money += 10; 
    } else { 
      var random = Math.floor(Math.random()*200);
      if (random == 100) {
        userData[sender.id].supershopper = true;
        message.channel.send("**LUCKY FIND!** You found the special ability Super Shopper (f!info supershopper) hidden inside the box! 0.5% drop rate!");
      }
      if (userData[sender.id].luckycharm && random == 1) {
        userData[sender.id].supershopper = true;
        message.channel.send("**LUCKY FIND!** You found the special ability Super Shopper (f!info supershopper) hidden inside the box! 1% (+0.5%) drop rate!");
      }
    }
    var random = Math.floor(Math.random()*100);
    if (random == 50) {
      userData[sender.id].trophies += 1;
      message.channel.send("**LUCKY FIND!** You found a trophy hidden inside the box! 1% drop rate!");
    }
    if (userData[sender.id].luckycharm && random == 1) {
      userData[sender.id].trophies += 1;
      message.channel.send("**LUCKY FIND!** You found a trophy hidden inside the box! 2% (+1%) drop rate!");
    }
    var random = Math.floor(Math.random()*100);
    if (random == 25) {
      openbox("common");
      message.channel.send("**LUCKY FIND!** You found a double item inside the box! 1% drop rate!");
    }
    if (userData[sender.id].luckycharm && random == 1) {
      openbox("common");
      message.channel.send("**LUCKY FIND!** You found a double item inside the box! 2% (+1%) drop rate!");
    }
    if (item === "dagger") {
      userData[sender.id].daggers += 1;
      var received = "From the box, you got a *common* dagger! Do " + prefix + "info dagger to see more!"
    }
    if (item === "bomb") {
      userData[sender.id].bombs += 1;
      var received = "From the box, you got a *common* bomb! Do " + prefix + "info bomb to see more!"
    }
    if (item === "ricochet") {
      userData[sender.id].ricochets += 1;
      var received = "From the box, you got a *common* ricochet! Do " + prefix + "info ricochet to see more!"
    }
    if (item === "bow") {
      userData[sender.id].bows += 1;
      var received = "From the box, you got a *rare* bow! Do " + prefix + "info bow to see more!"
    }
    if (item === "taser") {
      userData[sender.id].tasers += 1;
      var received = "From the box, you got a *rare* taser! Do " + prefix + "info taser to see more!"
    }
    if (item === "molotov") {
      userData[sender.id].molotovs += 1;
      var received = "From the box, you got a *rare* molotov! Do " + prefix + "info molotov to see more!"
    }
    if (item === "gun") {
      userData[sender.id].guns += 1;
      var received = "From the box, you got an *epic* gun! Do " + prefix + "info gun to see more!"
    }
    if (item === "staff") {
      userData[sender.id].staffs += 1;
      var received = "From the box, you got a *epic* staff! Do " + prefix + "info staff to see more!"
    }
    if (item === "shield") {
      userData[sender.id].shields += 1;
      var received = "From the box, you got a *epic* shield! Do " + prefix + "info shield to see more!"
    }
    if (item === "flamethrower") {
      userData[sender.id].flamethrowers += 1;
      var received = "From the box, you got a *legendary* flamethrower! Do " + prefix + "info flamethrower to see more!"
    }
    if (item === "whirlwind") {
      userData[sender.id].whirlwinds += 1;
      var received = "From the box, you got a *legendary* whirlwind! Do " + prefix + "info whirlwind to see more!"
    }
    if (item === "Akira") {
      userData[sender.id].akira += 1;
      if (userData[sender.id].akira === (maxpetlevels + 1)) {
        message.reply("You got Akira essence but Akira was already maxed out! You were refunded your money back!")
        userData[sender.id].akira -= 1;
        userData[sender.id].petboxes -= 1;
        userData[sender.id].money += ((userData[sender.id].petboxes * petboxincrement) + petboxprice);
        return
      }
      if (userData[sender.id].akira === 1) {
        var received = "From the pet box, you found Akira :hamster:! Do " + prefix + "info akira to learn more and " + prefix + " select akira to use them!"
      } else {
        var received = "You got Akira essence and leveled Akira up to level " + userData[sender.id].akira + "!"
      }
    }
    if (item === "Waltz") {
      userData[sender.id].waltz += 1;
      if (userData[sender.id].waltz === (maxpetlevels + 1)) {
        message.reply("You got Waltz essence but Waltz was already maxed out! You were refunded your money back!")
        userData[sender.id].waltz -= 1;
        userData[sender.id].petboxes -= 1;
        userData[sender.id].money += ((userData[sender.id].petboxes * petboxincrement) + petboxprice);
        return
      }
      if (userData[sender.id].waltz === 1) {
        var received = "From the pet box, you found Waltz :rabbit:! Do " + prefix + "info waltz to learn more and " + prefix + "select waltz to use them!"
      } else {
        var received = "You got Waltz essence and leveled Waltz up to level " + userData[sender.id].waltz + "!"
      }
    }
    if (item === "Lupin") {
      userData[sender.id].lupin += 1;
      if (userData[sender.id].lupin === (maxpetlevels + 1)) {
        message.reply("You got Lupin essence but Lupin was already maxed out! You were refunded your money back!")
        userData[sender.id].lupin -= 1;
        userData[sender.id].petboxes -= 1;
        userData[sender.id].money += ((userData[sender.id].petboxes * petboxincrement) + petboxprice);
        return
      }
      if (userData[sender.id].lupin === 1) {
        var received = "From the pet box, you found Lupin :fish:! Do " + prefix + "info lupin to learn more and " + prefix + "select lupin to use them!"
      } else {
        var received = "You got Lupin essence and leveled Lupin up to level " + userData[sender.id].lupin + "!"
      }
    }
    if (item === "Flipp") {
      userData[sender.id].flipp += 1;
      if (userData[sender.id].flipp === (maxpetlevels + 1)) {
        message.reply("You got Flipp essence but Flipp was already maxed out! You were refunded your money back!")
        userData[sender.id].flipp -= 1;
        userData[sender.id].petboxes -= 1;
        userData[sender.id].money += ((userData[sender.id].petboxes * petboxincrement) + petboxprice);
        return
      }
      if (userData[sender.id].flipp === 1) {
        var received = "From the pet box, you found Flipp :dolphin:! Do " + prefix + "info flipp to learn more and " + prefix + "select flipp to use them!"
      } else {
        var received = "You got Flipp essence and leveled Flipp up to level " + userData[sender.id].flipp + "!"
      }
    }
    if (item === "Raive") {
      userData[sender.id].raive += 1;
      if (userData[sender.id].raive === (maxpetlevels + 1)) {
        message.reply("You got Raive essence but Raive was already maxed out! You were refunded your money back!")
        userData[sender.id].raive -= 1;
        userData[sender.id].petboxes -= 1;
        userData[sender.id].money += ((userData[sender.id].petboxes * petboxincrement) + petboxprice);
        return
      }
      if (userData[sender.id].raive === 1) {
        var received = "From the pet box, you found Raive :crab:! Do " + prefix + "info raive to learn more and " + prefix + "select raive to use them!"
      } else {
        var received = "You got Raive essence and leveled Raive up to level " + userData[sender.id].raive + "!"
      }
    }
    if (item === "Byte") {
      userData[sender.id].byte += 1;
      if (userData[sender.id].byte === (maxpetlevels + 1)) {
        message.reply("You got Byte essence but Byte was already maxed out! You were refunded your money back!")
        userData[sender.id].byte -= 1;
        userData[sender.id].petboxes -= 1;
        userData[sender.id].money += ((userData[sender.id].petboxes * petboxincrement) + petboxprice);
        return
      }
      if (userData[sender.id].byte === 1) {
        var received = "From the pet box, you found Byte :shark:! Do " + prefix + "info byte to learn more and " + prefix + "select byte to use them!"
      } else {
        var received = "You got Byte essence and leveled Byte up to level " + userData[sender.id].byte + "!"
      }
    }
    message.reply(received);
  }

  if (command === "buy") {
    var item = args.join(" ");
    if (item === "common box" || item === "common") {
      if (userData[sender.id].money >= Math.round(commonboxprice - (commonboxprice * userData[sender.id].discount))) {
        userData[sender.id].money -= Math.round(commonboxprice - (commonboxprice * userData[sender.id].discount));
        openbox("common");
        userData[sender.id].boxesopened += 1;
        console.log(consolelog + "buy common box => Success!")
        return
      } else {
        toopoor();
        return
      }
    }
    if (item === "rare box" || item === "rare") {
      if (userData[sender.id].money >= Math.round(rareboxprice - (rareboxprice * userData[sender.id].discount))) {
        userData[sender.id].money -= Math.round(rareboxprice - (rareboxprice * userData[sender.id].discount));
        openbox("rare");
        userData[sender.id].boxesopened += 1;
        console.log(consolelog + "buy rare box => Success!")
        return
      } else {
        toopoor();
        return
      }
    }
    if (item === "epic box" || item === "epic") {
      if (userData[sender.id].money >= Math.round(epicboxprice - (epicboxprice * userData[sender.id].discount))) {
        userData[sender.id].money -= Math.round(epicboxprice - (epicboxprice * userData[sender.id].discount));
        openbox("epic");
        userData[sender.id].boxesopened += 1;
        console.log(consolelog + "buy epic box => Success!")
        return
      } else {
        toopoor();
        return
      }
    }
    if (item === "legendary box" || item === "legendary") {
      if (userData[sender.id].money >= Math.round(legendaryboxprice - (legendaryboxprice * userData[sender.id].discount))) {
        userData[sender.id].money -= Math.round(legendaryboxprice - (legendaryboxprice * userData[sender.id].discount));
        openbox("legendary");
        userData[sender.id].boxesopened += 1;
        userData[sender.id].legendaryboxesopened += 1;
        console.log(consolelog + "buy legendary box => Success!")
        return
      } else {
        toopoor();
        return
      }
    }
    if (item === "pet box" || item === "pet") {
      if (userData[sender.id].money >= ((userData[sender.id].petboxes * petboxincrement) + petboxprice)) {
        userData[sender.id].money -= Math.round(((userData[sender.id].petboxes * petboxincrement) + petboxprice) - (((userData[sender.id].petboxes * petboxincrement) + petboxprice) * userData[sender.id].discount));
        userData[sender.id].petboxes += 1;
        userData[sender.id].boxesopened += 1;
        userData[sender.id].petboxesopened += 1;
        openbox("pet");
        console.log(consolelog + "buy pet box => Success!")
        return
      } else {
        toopoor();
        return
      }
    }
    message.reply("Sorry, please include a valid item to purchase!");
  }

  var deathlist = [];
  
  var Count;
  for(Count in client.users.array()) {
    var User = client.users.array()[Count];
    if (!client.users.get(User.id).bot) {
        if (userData[User.id].health <= 0) {
          message.reply(User.username + " was killed by " + sender.username + "! As a reward, they get a kill box!")
          if (userData[sender.id].lifesteal && userData[sender.id].health < 100) { userData[sender.id].health += 10; message.reply("You also leeched 10 health from killing a player using Life Steal!"); }
          if (userData[User.id].health <= -30) { userData[sender.id].overkill = true }
          if (userData[User.id].health <= -75) { userData[sender.id].superoverkill = true }
          if (userData[User.id].health <= -90) { userData[sender.id].megaoverkill = true }
          userData[sender.id].questkills += 1;
          userData[sender.id].kills += 1;
          console.log("(" + message.guild.name + ") " + sender.username + " killed " + User.username + " and got a kill box!");
          var rewardedbox = killchances[Math.floor(Math.random()*killchances.length)];
          select(rewardedbox);
          userData[User.id].health = userData[User.id].maxhealth;
          if (userData[User.id].selectedpet === "Akira") {
            userData[User.id].health += 5+((userData[User.id].akira-1)*3);
          }
          if (userData[sender.id].selectedpet === "Lupin") {
            var randomchance = Math.floor(Math.random()*100);
            if (randomchance <= 15+((userData[sender.id].lupin-1)*3)) {
            var moneyamount = Math.floor(Math.random()*51)+100;
            userData[sender.id].money += moneyamount;
            message.reply("Your pet Lupin helped you gather " + moneyamount + " money from the kill!");
          }
        }
      }
    }
  }
});

client.login(process.env.TOKEN);

