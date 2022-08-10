# Monitoring beer temperature

## Assumption
- IOT server doesn't support webhook. That's why we have to pool the data periodically
- Authentication and Authorization is not something that product want
- I'm not supposed to improve current UI & UX. 
- We don't need to record the Beers data somewhere like DataDog


## System Design 
> “If you think good architecture is expensive, try bad architecture." Robert CC martin

I tried to apply my understanding of Uncle bob clean architecture style to my code. Because I do believe this style gives us a lot of features that I will walk you through:

![](https://miro.medium.com/max/1400/1*phecRia6It8AnwlFjhjx2w.jpeg)

## Yellow Layer
External libraries are located here. Like web server in this case express(routes). This layer just executes the relevant controller.

## Red Layer
This is the controller Layer. It receive the client data and execute relevant use case and finally return a response

## Green Layer
Business logics are here. This layer receives, validates, and processes the client data from the controller and provides the expected result. We also do not expect this layer to be affected by frameworks, Databases, or ... Therefore, this layer is isolated from such concerns.

## Blue Layer
An entity can be an object with methods, or it can be a set of data structures and function.

Folder structure:
```
.
├── src
│   ├── config
│   ├── controllers (red layer)
│   ├── frameworks (yellow layer)
│   │   ├── common (helpers for the yellow layer)
│   │   ├── express
│   │   │────── routes 
│   │   ├── repositories (Database or API call are here)
│   ├── useCases (green layer)
│   ├── app.js
│   ├── server.js
```


## Highlights of my improvements 
The combination of dependency inversion and single responsibilities gives us some fantastic features:
We can easily write tests for each layer without knowing what's going on under the hood

Let's take `getBeersController.js` for example. As I said, the controller receives the client data, executes relevant use cases, and finally returns a response. So, when you see this controller, you don't need to understand and read what `getBeersUseCase` do. All you need is to focus on what a controller should do. Like, make sure `getBeersUseCase`. is called or ...

Plus, these dependencies don't need to be ready when you want to add the controller. All you need is just an adapter, and that's it. 
```
const { ResponseSuccess, ResponseError } = require('../../frameworks/common')

// TODO Add a factory pattern for creating controller like `userCaseFactory.js`

module.exports = (dependencies) => {
  const {
    useCases: {
      beer: { getBeersUseCase },
    },
  } = dependencies

  return async (req) => {
    try {
      const { id } = req.pathParams
      const response = await getBeersUseCase(dependencies).execute({
        id,
      })
      return new ResponseSuccess({
        body: response,
      })
    } catch (err) {
      // TODO log this error somewhere
      return new ResponseError({
        msg: err.message || 'Error while getting data',
      })
    }
  }
}
```

### Make a resilient application thanks to Clean architecture
---
This style makes software resilient to any changes. You put the codes that might barely change in the inside layers and put others in the outside layers, and these layers work with each other through dependency injection. 
In the Internal Layers, you don't see any import from the external layers, which is the beauty of this pattern. In fact It makes internal layers to be isolated from any tools. For example, if we want to add graphQL instead of express.js, or change the Database/ DataSource, we don't need to change the whole Layers. All we need is to just change the yellow layers and make it compatible through adapters.
 

### Avoid CORS 
---
CORS makes network requests double. If I had more time, I would setup nginx as a proxy server

## If I had more time I would:
- Add a factory pattern for creating controller like `userCaseFactory.js`
- Add socket.io instead of pooling and add a cron job to push new data
- Integrate with push notification in case the socket is closed
- Add nginx to handle reverse proxy and load balancing
- Add Typescript or at least add JS DOC
- Add RateLimiter to avoid abusing the API
- Add Swagger
- Add Object.freeze to avoid mutating the data



## Available scripts

- `npm start` - Start the application (Port 8081)
- `npm run test:dev` run test
- `npm run test:coverage` Create coverage test report

