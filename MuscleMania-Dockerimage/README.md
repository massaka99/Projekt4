Dette repo gør så du kan kører projektet PRJ4 fra det færdige image der er bygget og sendt på docker-hub

---

På den lette måde er der fundet ud af du bare kan skrive:<br>
1. "**Docker-compose up**"<br><br>
så hentes der images automatisk og docker kører succesfuldt<br>

---
1. åbn terminal

2. skriv "**docker login**" i terminalen og følg instrukserne

3. skriv følgende en efter en <br>
"**docker pull dogegf/prj4:backend**"<br>
"**docker pull dogegf/prj4:frontend**"<br>
"**docker pull dogegf/prj4:ai-backend**"<br>
"**docker pull dogegf/prj4:ai-frontend**"<br>

4. skriv nu
"**docker-compose up**"

5. projektet kører nu succesfuldt i docker
