# Check it out our integration tests and debug your bot

The project includes integration tests for most of available features in the Workplace API, and you can understand better how to implement your bot interactions.

    ![Boilerplate Workplace App Integration Tests](/img/documentation-img/integration-tests.png)


You can execute the test yourself using the following command:
```
gulp build
```

When you need to debug you need set the webhook in Workplace to your local environment. A simple way to do that is use localtunnel:

- Install LocalTunnel using ```npm install localtunnel``` 
- Run the app locally using ```gulp develop```
- In another Terminal session, tunnel to the port 5000 using ```lt -p 5000```
- Configure your webhook in Workplace using the url created by localtunnel
```
lt -p 5000
your url is: https://mczugwjaps.localtunnel.me 
```

You can leave the tunnel open during all your debug session, but you will need to execute it again if you close the Terminal.