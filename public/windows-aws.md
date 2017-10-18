
# Deploy your application to a Windows server

## Setup your [network components](/networking-aws.md)

## Setup your instance

You can use the following instructions to install this application on a Windows server.

1. Connect to your server using Remote Desktop

2. Download and run the installer from the [Node.js website](https://nodejs.org/en/download/)

3. Install [Git for Windows](https://git-for-windows.github.io/)

4. Open a Powershell terminal in your server as an Administrator

5. Install npm and gulp
    ```
    npm install npm -g
    npm install gulp -g
    ```

6. Clone this project and switch into the project directory.

    ```
    git clone https://github.com/eduardogomes/wp-chatbot-boilerplate-node.git
    cd wp-chatbot-boilerplate-node
    ```

7. Install Node dependencies. We are using [Express](http://expressjs.com/) for serving stuff, [request](https://github.com/request/request) and [request-promise](https://github.com/request/request-promise) for sending and receiving messages.

    ```
    npm install
    ```

8. Run the app locally using 
    ```
    gulp develop
    ```

9. Open port TCP 5000 in the [Windows Firewall](https://docs.microsoft.com/en-us/windows/access-protection/windows-firewall/create-an-inbound-port-rule)

10. Try access the application landing page on http://hostname:5000/
