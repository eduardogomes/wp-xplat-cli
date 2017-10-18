
# Deploy your application to a Linux server in AWS

## Setup your [network components](/networking-aws.md)

## Setup your instance
You can use the following instructions to install this application on a Linux server.

1. Connect to your server using SSH

2. Install the Node Version Manager (NVM), activate it and install Node version 6.11.1

    ```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
    . ~/.nvm/nvm.sh
    nvm install 6.11.1
    ```

3. Install npm and gulp
    ```
    sudo npm install npm -g
    sudo npm install gulp -g
    ```

4. Install git
    ```
    sudo yum install git
    ```

5. Clone this project and switch into the project directory.

    ```
    git clone https://github.com/eduardogomes/wp-chatbot-boilerplate-node.git
    cd wp-chatbot-boilerplate-node
    ```

6. Install Node dependencies. We are using [Express](http://expressjs.com/) for serving stuff, [request](https://github.com/request/request) and [request-promise](https://github.com/request/request-promise) for sending and receiving messages.

    ```
    npm install
    ```

7. Run the app locally using 
    ```
    gulp develop
    ```

8. Try access the application landing page on http://hostname:5000/