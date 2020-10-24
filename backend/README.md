## How to start the node background

 - clone the repo:
	 - `git clone https://github.com/Pika-Pool/zoom-notes.git`
 - checkout the node branch
	 - `git checkout node`
 - create a JWT app at the link(no coding needed here)
	 - https://marketplace.zoom.us/develop/create
 - add a file "**backend/.env**" and add the API_KEY and API_SECRET fields in it
	 - something like this:
	![image](https://drive.google.com/uc?export=view&id=1tbDH3fXP7b6W7ClfptjOxBnNFmZ4Ay0v)
	 - lines starting with **#** are comments
	 - API_KEY and API_SECRET must be present
 - now cd into the backend directory and run the following commands
	 - `npm install`
	 - `npm start`
 - open your browser and open to this link:
	 - http://localhost:3000/zoom/meeting
 - start a zoom meeting from your zoom app, enter the credentials into the this app, and join the meeting
