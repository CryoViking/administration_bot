# Overview  
Repository for our bot for discords hackathon week.  <br>

Allows catering for exporting and importing server configuration files so that you can set up duplicate servers  <br>
and share configurations. This bot also provides a verification system similar to a captcha.  <br>
As well as some basic administration commands. <br>
<br>
Note: we do plan on improving this bot in the future. However the state the bot is in now, is what it will be for the submission <br>
for Discord's hackathon.

# Developers  
- Cryosis  
- Phob  
- PotatoMaster101  
- tobyTomassen  
- Xiao Nai  

# Language  
JavaScript  <br>
Python 3  <br>

# Environment  
NodeJS  <br>
Virtual Python Environment  <br>

## For calculating a permissions bitwise value use this link  
[Permissions calculate](https://finitereality.github.io/permissions-calculator/?v=0)  <br>

# How to use
Afer cloning the repo,  <br>
```  
npm start  
```  
Will start the server.  <br>

Available commands:
- ``ping`` (nothing to special, repsons with "Pong!")  <br>
- ``export`` (will export a configuration file of the server - see below)  <br>
- ``import`` (will read an attached configuration file the server and set the server up according to it - see below)  <br>
- ``ban <member>``
- ``kick <member>``
- ``warn <member>``
- ``metrics pop`` OR ``metrics population`` (Will display a graph of the population over time for the server)

# EXPORT Command  
Will export the current state of the server, in terms of categories, channels and roles. There are issues there because the  <br>
discord.js API only provides so much functionality. And in such short time with little resources we haven't been able to  <br>
fully cater to all channel types.  <br>
The configuration will retain WebHooks as well except the link will be dead on the other end.  <br>
However the webhook object will be persistent in export.  <br>

# IMPORT Command  
To see an example of a valid ``import`` file run the ``!export`` command and refer to the file that it gives you.  <br>
Keep in mind that it does not assign roles to members upon importing, that still needs to be done by you or <br>
another bot (We do plan on - in future providing a role self-assigning ability to members using our bot).  <br>
Any imported WebHooks will have a fresh URL which will need to be given to the other end of the pipe.  <br>
