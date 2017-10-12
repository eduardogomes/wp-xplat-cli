# 🤖 Bleep bloop, I'm a bot. Build your own Workplace Messenger bot.

## What is Workplace?

If you never heard about Workplace maybe you should start on the [top 10 questions about Workplace](https://workplaceblog.fb.com/news/workplace-questions/)

## What to expect

When you want to create a custom integration for Workplace, you may find information on the [technical docs](https://developers.facebook.com/docs/workplace/integrations/custom-integrations) that are concise, but not exactly easy follow if you haven't built a bot and hooked it up to your app or page in Workplace or Facebook before. There is more information in the [Complete Guide for the Messenger platform](https://developers.facebook.com/docs/messenger-platform/implementation) and the [Documentation for the Graph API](https://developers.facebook.com/docs/graph-api) but a new developer may find it overwhelming to start with. 

The goal following this tutorial is having a **live stater-app** that implements the Workplace Webhook/Graph API bot. **Deployed to Heroku**,  along the way, you will also learn how to use Heroku's free tier for hacking on projects like this. It **should take between 15 and 30 minutes** depending on prior experience.


## The basics

### Get your Company in a Workplace Premium Instance

1. Custom integrations are only available on Premium tier, you can [sign up for a 90-day free trial](https://www.facebook.com/workplace/pricing/) using your corporate e-mail if your company still is not in Workplace. You are missing a lot of fun!


### Download, build and deploy the project

1. Get a free [Heroku account](https://signup.heroku.com/) if you haven't already.

2. Install the [Heroku toolbelt](https://toolbelt.heroku.com) which will let you launch, monitor and generally control your instances (and other services like databases) from the command line.

3. [Install Node]  (https://nodejs.org), this will be our server environment. Then open up Terminal (or whatever your CLI might be) and make sure you're running the latest version of npm, installed globally (the ```-g``` switch):

    ```
    sudo npm install npm -g
    ```

4. Clone this project and switch into the project directory.

    ```
    git clone https://github.com/eduardogomes/wp-chatbot-boilerplate-node.git
    cd wp-chatbot-boilerplate-node
    ```

5. Install Node dependencies. We are using [Express](http://expressjs.com/) for serving stuff, [request](https://github.com/request/request) and [request-promise](https://github.com/request/request-promise) for sending and receiving messages.

    ```
    npm install
    ```

6. Create a new Heroku instance and push the code to the cloud.  We also set an environment variable called ```IS_HEROKU```, because this boilerplate works on any type of host but has some extra smarts for Heroku deployment.

    ```
    heroku create
    heroku config:set IS_HEROKU=1
    git push heroku master
    ```  

7. You should be all set and be able to visit your page at the URL that was output by ```$ heroku create```.


### Setup your Workplace App

1. In the Company Dashboard, open the Integrations tab.
2. Click on the Create App button.
3. Choose a relevant name and description for the app.

  ![Create a new Workplace App](/public/img/documentation-img/create_new_integration.png)

4. Add a profile picture for the app. This will be used any time the app is visually represented, for instance if it makes a post to group.
5. Choose the required [permissions](https://developers.facebook.com/docs/workplace/integrations/custom-integrations/permissions) for the app, based on the integration functionality you require. For this boilerplate implementation you will need only the 'Message any member' permission. To run all integration tests you will need the 'Read Group Content', 'Manage Group Content', 'Manage Groups' and 'Message any Member' permissions.

    ![Create a new Workplace App](/public/img/documentation-img/application-permissions.png)

6. Create, Copy and safely store the [access token](https://developers.facebook.com/docs/workplace/integrations/custom-integrations/permissions#appaccesstoken) that's shown to you. You'll need this when making API calls.

7. Configure your environment variables. You will need to set the data on the ```.env``` file in the root directory with 

```
NODE_ENV=development
PAGE_ACCESS_TOKEN=Bearer <access token, created on step 6>
VERIFY_TOKEN=  <a unique string to identity your bot, e.g.: dev-workshop-bot-token>
PORT=5000
```

8. Configure the messaging web hook with the Bot URL (either Heroku or local) and the Verify Token (set in the previous step)

    ![Configure the Webhook](/public/img/documentation-img/webhook-config.png)
        

### Set the missing configuration values in your Heroku environment

```
heroku config:set PAGE_ACCESS_TOKEN=your-page-access-token-here
heroku config:set VERIFY_TOKEN=your-verify-token-here
```


### Check it out our integration tests and debug your bot

The project includes integration tests for most of available features in the Workplace API, and you can understand better how to implement your bot interactions.

    ![Boilerplate Workplace App Integration Tests](/public/img/documentation-img/integration_tests.png)


Then you can execute the test yourself using the following command:
```
gulp build
```

When you need to debug your bot you may set the webhook in Workplace to your local environment. A simple way to do that is use localtunnel:

- Install LocalTunnel using ```npm install localtunnel``` 
- Run the app locally using ```gulp develop```
- In another Terminal session, tunnel to the port 5000 using ```lt -p 5000```
- Configure your webhook in Workplace using the url created by localtunnel
```
lt -p 5000
your url is: https://mczugwjaps.localtunnel.me 
```

You can leave the tunnel open during all your debug session, but you will need to execute it again if you close the Terminal.

# ⇨ Go to your Workplace instance find your bot and start chatting. 🤖

## OK, so what now?

[Wit.ai](https://wit.ai) is a service that lets you easily create text or voice based bots that humans can chat with on their preferred messaging platform. Basic wit.ai functionality will be baked into this starter app at some point in the future.
