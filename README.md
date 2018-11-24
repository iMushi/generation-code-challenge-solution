Generation Take-Home Coding Challenge Solution
=================================


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Solution Challenges

* **Store Directory**: First challenge I encountered was get the latitute and longitude for the stores. It is imposible to load such quantity of GeoLocations via webservice at once
* **React Rookie**: I'm such a Rookie, I know how React works, I've used it for my personal demos and geek stuff, but that's it so far. Having that in mind, I did my best with it and also had a lot of fun coding my first demo with meaning (Took me about a day or so ).

### Solution Approach

All the student cases have been covered, with a little twist.

* **Loading the Stores**: Instead of keep the student waiting for the whole Store Directory to load into the map or to try to get the whole directory at once, I added a secondary List of Stores, and as you scroll through it the GeoLocation service is being called in chunks of 10 stores at the time. Once the store's Lat and Lng has been loaded, no need to use the service again for that particular store.

Yes I know, none of the Student User stories has a secondary list, but nevertheless I think it is the friendliest approach when it comes to UX and UI


Hope to hear from you soon.
