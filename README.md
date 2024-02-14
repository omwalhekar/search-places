# Table of Contents <!-- omit in toc -->

- [Readme first!](#readme-first)
- [Search Places](#search-places)
  - [Styles](#styles)
    - [Search Box](#search-box)
    - [Keyboard Shortcut](#keyboard-shortcut)
    - [Table](#table)
  - [Functionality](#functionality)
    - [Search box](#search-box-1)
    - [Table](#table-1)

# Readme first!

- Try to use less number of 3rd party packages/libraries
- Keep your code clean, maintainable and readable, usage of formatters and linters might come handy here
- Follow best practices for particular framework/library
- Your project should have a `README.md` file, which should contain at-least a getting started guide, you can use below for example (below content will change based on your project and technology, below is given just for example):

  ```markdown
  # Getting Started
  ```

    <pre lang="no-highlight"><code>
    ```bash
    # after cloning the repo
  
    cd backend
    npm i
    npm start
  
    # new terminal
  
    cd frontend
    npm i
    npm start
    ```
    </code></pre>

- It is ok if you can't complete all the tasks/features, but each individual task should be in considerably complete state
- You will need to push all of your code to a public GitHub repo and share the link of the same
- You will get 2-2.5 hours to do the exercise

<!-- The actual problem statement start after this -->

# Search Places

**Search Places** allows users to search through places.

- We are only looking for decent UI, which can just work.
- Please do not use any css framework like bootstrap, tailwind, etc.
- All views should be fully responsive upto 300px width.
- You can use any technology from: Ruby on Rails, React, Vue, Angular, vanilla HTML/CSS/JavaScript or as mentioned by the interviewer/recruiter
- Inline styles not allowed.

## Styles

1. Font-size: `16px`
2. Font-color: `rgb(33, 37, 41)`
3. Font-family: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`

### Search Box

Search box should look like below for various states, click on image to see it properly:

| State        | UI                                   | Styling                                                                                                                                                                                                                        |
| ------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Default      | ![](https://imgur.com/IoOypVB.png)   | Width: `241px`, Height: `38px`, Font-size: `16px`, Background-color: `rgb(255, 255, 255)`, Border-color: `rgb(206, 212, 218)`, Padding-top/bottom: `6px`, Padding-left: `12px`, Padding-right: as-needed, Border-radius: `4px` |
| Filled       | ![](https://i.imgur.com/gfLklQn.png) | .                                                                                                                                                                                                                              |
| Active/Focus | ![](https://i.imgur.com/6HqUeOL.png) | `border-color: #7952b3; box-shadow: 0 0 0 3px rgb(121 82 179 / 25%);`                                                                                                                                                          |
| Disabled     | ![](https://i.imgur.com/AY8vtcR.png) | Background-color: `rgb(233, 236, 239)`                                                                                                                                                                                         |

### Keyboard Shortcut

- Font-size: `12px`
- Border-color: `rgb(222, 226, 230)`
- Border-radius: `2px`
- Height: `24px`
- Padding left/right: `4px`

### Table

![](https://i.imgur.com/moDrKqT.png)

- Padding for td/th: `8px`
- Border color: `rgb(222, 226, 230)`
- Header font-weight: `700`
- Should show only three items per page by default

## Functionality

- You have create layout, where
  - Search box is on top-left side of page
  - Table is at bottom of search box
  - Pagination box below the table
  - Besides pagination a user input to let user decide how many cities data user want from server [ Default is 5 and max is 10]

### Search box

- Once user types and presses enter, start showing results in the table
- Keyboard shortcut `CTRL/CMD + /` should work, it will make search box focused

### Table

- In table there will be 3 columns:
  - `#` - static counter starting from 1
  - `Place Name`
  - `Country` - Show country with flag
    - For flag, use `CountryID` from response and get flag from https://www.countryflagsapi.com/ (`https://www.countryflags.io/:file_type/:country_code`).
    - For example, for `CountryID="IN-sky"`, you will get flag from `https://countryflagsapi.com/png/in`
- For no result, simply say "No result found" in table
- For null/undefined/blank search, display "Start searching" in table
- When results are getting fetched, show a spinner on top of table.

### Pagination

- In pagination depending upon search result the pagination numbers should get update.
- If no result found hide pagination box.

### Limit API data

- A input box preferably on the far right side on the level of pagination box to let user decide how much data it should fetch from server.
- Default data fetched by API is 5 and max it can fetch 10 items and user should be limited and some kind of warning should be given if user enters input above 10.
- Using the limit key in the params in API we can limit the data fetched from server

### Bonus

- Implement a way that API calls are not made on every keystroke.
- Provide an option to user to let user view as many items as user want on a page instead of default 3.

### API

**Please use environment variables to store/read API url and secrets.**

```javascript
var axios = require('axios').default;

var options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  params: { countryIds: 'IN', namePrefix: 'del', limit: '5' },
  headers: {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe',
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

[API Documentation](https://rapidapi.com/wirefreethought/api/geodb-cities/).

#### Example Response

```json
{
  "data": [
    {
      "id": 147866,
      "wikiDataId": "Q107941",
      "type": "ADM2",
      "city": "Central Delhi district",
      "name": "Central Delhi district",
      "country": "India",
      "countryCode": "IN",
      "region": "Delhi",
      "regionCode": "DL",
      "latitude": 28.645,
      "longitude": 77.245,
      "population": 582320
    },
    {
      "id": 3311555,
      "wikiDataId": "Q5253088",
      "type": "CITY",
      "city": "Delakhari",
      "name": "Delakhari",
      "country": "India",
      "countryCode": "IN",
      "region": "Madhya Pradesh",
      "regionCode": "MP",
      "latitude": 22.4334,
      "longitude": 78.6166,
      "population": 0
    },
    {
      "id": 3453162,
      "wikiDataId": "Q1353",
      "type": "CITY",
      "city": "Delhi",
      "name": "Delhi",
      "country": "India",
      "countryCode": "IN",
      "region": "Delhi",
      "regionCode": "DL",
      "latitude": 28.666666666,
      "longitude": 77.216666666,
      "population": 9879172
    },
    {
      "id": 3203689,
      "wikiDataId": "Q1192604",
      "type": "CITY",
      "city": "Delhi Cantonment",
      "name": "Delhi Cantonment",
      "country": "India",
      "countryCode": "IN",
      "region": "Delhi",
      "regionCode": "DL",
      "latitude": 28.59025,
      "longitude": 77.131919444,
      "population": 0
    },
    {
      "id": 56192,
      "wikiDataId": "Q16999192",
      "type": "CITY",
      "city": "Delwada",
      "name": "Delwada",
      "country": "India",
      "countryCode": "IN",
      "region": "Gujarat",
      "regionCode": "GJ",
      "latitude": 20.7833,
      "longitude": 71.05,
      "population": 11912
    }
  ],
  "links": [
    {
      "rel": "first",
      "href": "/v1/geo/cities?offset=0&limit=5&countryIds=IN&namePrefix=del"
    },
    {
      "rel": "next",
      "href": "/v1/geo/cities?offset=5&limit=5&countryIds=IN&namePrefix=del"
    },
    {
      "rel": "last",
      "href": "/v1/geo/cities?offset=10&limit=5&countryIds=IN&namePrefix=del"
    }
  ],
  "metadata": {
    "currentOffset": 0,
    "totalCount": 13
  }
}
```
