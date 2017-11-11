# This is the Workplace Cross-Platform (xplat) Command-Line Interface (CLI)

Right now this CLI only supports changing a user e-mail, but additional features will be available in the future.

## What is Workplace?

If you never heard about Workplace maybe you should start on the [top 10 questions about Workplace](https://workplaceblog.fb.com/news/workplace-questions/)

## The basics

### Get your Company in a Workplace Premium Instance

1. Custom integrations are only available on Premium tier, you can [sign up for a 90-day free trial](https://www.facebook.com/workplace/pricing/) using your corporate e-mail if your company still is not in Workplace. You are missing a lot of fun!


### Download, build and deploy the project

1. [Install Node]  (https://nodejs.org), this will be our server environment. Then open up Terminal (or whatever your CLI might be) and make sure you're running the latest version of npm, installed globally (the ```-g``` switch):

    ```
    sudo npm install npm -g
    ```

2. Clone this project and switch into the project directory.

    ```
    git clone https://github.com/eduardogomes/wp-xplat-cli.git
    cd wp-xplat-cli
    ```

3. Install Node dependencies.

    ```
    npm install
    ```

### Setup your Workplace App

1. In the Company Dashboard, open the Integrations tab.
2. Click on the Create App button.
3. Choose a relevant name and description for the app.

    ![Create a new Workplace App](/public/img/documentation-img/create_new_integration.png)

4. Add a profile picture for the app. This will be used any time the app is visually represented, for instance if it makes a post to group.
5. Choose the required [permissions](https://developers.facebook.com/docs/workplace/integrations/custom-integrations/permissions) for the app, for the command update-email you will need the "Manage Accounts" permission.

    ![Create a new Workplace App](/public/img/documentation-img/application-permissions.png)

6. Create, Copy and safely store the [access token](https://developers.facebook.com/docs/workplace/integrations/custom-integrations/permissions#appaccesstoken) that's shown to you. You'll need this when making API calls.

7. Configure your environment variables. You will need to set the data on the ```.env``` file in your local wp-xplat-cli folder

```
NODE_ENV=development
PAGE_ACCESS_TOKEN=Bearer <access token, created on step 6 in the format "Bearer TOKEN">
```

# ⇨ Go to your favorite Terminal and execute

```
    node app.js update-email <email> <newEmail>              
    node app.js create-group <name> <description> <privacy>  
    node app.js add-member <groupid> <member>                
    node app.js add-admin <groupid> <admin>                  
```