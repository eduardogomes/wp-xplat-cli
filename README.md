# 🤖 Bleep bloop, I'm a bot. Build your own Facebook Messenger bot.

Some of the code snippets were taken from Facebook's [official documentation](https://developers.facebook.com/docs/messenger-platform/quickstart). The docs are concise, but not exactly easy follow if you haven't built a bot and hooked it up to your app or page before. Your best bet in general might be their [Complete Guide] (https://developers.facebook.com/docs/messenger-platform/implementation) for the Messenger platform.


## What to expect

Following along with this tutorial will leave you with a **live starter-app** that implements a Facebook Messenger bot. **Deployed to Heroku with a fun little landing page, persisting data, ready to rumble.** Along the way, you will also learn how to use Heroku's free tier for hacking on projects like this. It **should take between 15 and 30 minutes** depending on prior experience.


## The basics

### Download, build and deploy the project

1. Get a free [Heroku account] (https://signup.heroku.com/) if you haven't already.

2. Install the [Heroku toolbelt] (https://toolbelt.heroku.com) which will let you launch, monitor and generally control your instances (and other services like databases) from the command line.

3. [Install Node]  (https://nodejs.org), this will be our server environment. Then open up Terminal (or whatever your CLI might be) and make sure you're running the latest version of npm, installed globally (the ```-g``` switch):

    ```
    sudo npm install npm -g
    ```

4. Clone this project and switch into the project directory.

    ```
    git clone https://github.com/Beavr/fb-chatbot-boilerplate.git
    cd fb-chatbot-boilerplate
    ```

5. Install Node dependencies. We are using [Express] (http://expressjs.com/) for serving stuff, the [Sequelize] (https://github.com/sequelize/sequelize) ORM for database-y stuff, [request] (https://github.com/request/request) and [request-promise] (https://github.com/request/request-promise) for sending and receiving messages, and [body-parser] (https://github.com/expressjs/body-parser) to process responses from Facebook's APIs.

    ```
    npm install
    ```

6. Create a new Heroku instance, deploy a [free database instance] (https://devcenter.heroku.com/articles/heroku-postgresql) for your server, and push the code to the cloud.  Database configuration happens automagically via Heroku's DATABASE_URL environment variable. We also set an environment variable called ```IS_HEROKU```, because this boilerplate works on any type of host but has some extra smarts for Heroku deployment.

    ```
    heroku create
    heroku config:set IS_HEROKU=1
    heroku addons:create heroku-postgresql:hobby-dev
    git push heroku master
    ```  

7. You should be all set and be able to visit your page at the URL that was output by ```$ heroku create```. You can show the database settings your app is using with the command ```$ heroku config```. You can use the login data to inspect the database with your favourite client to see what's going on.


### Setup your Facebook App

1. Create or configure a Facebook App here (https://developers.facebook.com/apps/). (You also probably should set up a new Facebook Page while you're at it - don't use a page you are already using in production.)

    ![Create a new Facebook App](/public/img/documentation-img/create_new_app.png)

2. In the app, switch to the *Messenger* tab and click *Setup Webhook*. Enter the URL of your Heroku instance and append */webhook/*. (For example: *https://mighty-island-93912.herokuapp.com/webhook/*. It needs to be https://). Make sure you check all the subscription fields. Also create and enter a verify-token. Keep this safe.

    ![Set up your bot's webhook URL](/public/img/documentation-img/webhook_subscription_1.png)

3. Configure to which of your pages' events the app should subscribe to.

    ![Create a new Facebook App](/public/img/documentation-img/webhook_subscription_2.png)

4. Create a Page Access Token and keep it safe. Be sure to pick the same page you picked in step three.

    ![Set up a Page Access Token](/public/img/documentation-img/create_access_token.png)

5. Switch back to Terminal and use the following command to trigger your Facebbook app to start sending webhooks. Remember to use the Page Access Token you just created instead of the placeholder at the end of the request. 

    ```
    curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=<PAGE_ACCESS_TOKEN>"
    ```

### Set the missing configuration values in your Heroku enviroment

```
heroku config:set PAGE_ACCESS_TOKEN=your-page-access-token-here
heroku config:set VERIFY_TOKEN=your-verify-token-here
heroku config:set FB_APP_ID=your-app-id-here
heroku config:set FB_PAGE_ID=your-page-id-here
```

```FB_APP_ID``` is the app ID of the Facebook App you just created. You can find it directly on the app dashboard. ```FB_PAGE_ID``` is the page ID of the Facebook Page you subscribed to in the app settings. ([Click here] (http://hellboundbloggers.com/2010/07/find-facebook-profile-and-page-id-8516/) in case you don't know how to find it.)

# ⇨ Visit the landing page at the root of your Heroku instance and start chatting. 🤖

## OK, so what now?

If you want to make your bot available publicly, you will have to go through Facebook's [app review process] (https://developers.facebook.com/docs/messenger-platform/app-review) for Messenger bots.

[Wit.ai](https://wit.ai) is a service that lets you easily create text or voice based bots that humans can chat with on their preferred messaging platform. Basic wit.ai functionality will be baked into this starter app at some point in the future.
