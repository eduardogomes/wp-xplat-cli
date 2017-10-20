
# Setup your AWS network components
[TODO Upload screenshoots]
1. Connect to your [AWS EC2 Console](https://console.aws.amazon.com/ec2/)

2. Launch a new instance, using a Amazon Linux or Windows Server 2016 AMI

3.  Create a new Elastic IP and associate it to your instance (so if you need to stop it you will use the same name/ip to connect to it again)

4. Create your HTTPS certificate on [AWS Certificate Manager](https://console.aws.amazon.com/acm)

5. Create a classic Elastic Load Balancer, it will map your incoming traffic from HTTP/443 to your instance in port 5000 

6. Review your instance security group to allow inbound traffic from the subnet of the availability zone you are using

7. Set your hosted zone and DNS record sets on [Route 53]
(https://console.aws.amazon.com/route53)