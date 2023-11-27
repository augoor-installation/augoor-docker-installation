# Augoor Docker Installation Guide for Amazon Linux2

## Prerequisites

### Infrastructure Prerequisites
The infrastrcuture to expose Augoor is a machine with Augoor installed that expose it the port 3000, and ALB that forward to the instance from 443 to 3000, the instance require access to internet to download some GPU Drivers and optionally Docker images from Augoor registry (in case you don't have a private registry)  
#### 1.- Instance Role
Create an EC2 Role that have the following permission to download the drivers from AWS related bucket
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::ec2-linux-nvidia-drivers",
                "arn:aws:s3:::ec2-linux-nvidia-drivers/*"
            ]
        }
    ]
}
```

#### 2.- Instance Required

  - We require use of this instance type with this specifications with the role defined in the step before assigned:

    | Provider | Type of instances                  | CPUs / Memory | GPU / Memory | Root Disk   | Amazon MAchine Image (AMI)                                      | Architecture  |
    | -------- | ---------------------------------- | ------------- |------------- | ------ | --------------------------------------------------------------- | ------------- | 
    | AWS      | g5.4xlarge                         |  16  / 64 GiB |  1  / 24 GiB | 400 GiB EBS| Amazon Linux 2 AMI (HVM) 2.0.20231116.0 x86_64  kernel-5.10   | 64-bits (X86) |
> The image mentioned can be used from QuickLaunch Page in AWS Console and located in the marketplace [here](https://aws.amazon.com/marketplace/pp/prodview-zc4x2k7vt6rpu?sr=0-6&ref_=beagle&applicationId=AWSMPContessa#pdp-overview) 
#### 3.- Additional requirement

  - Assign a subdomain for Augoor in your DNS.
  - Set up an Application Load Balancer. The target group must be forward to the instance created on port 3000.
  - Create an SSL Certificate for the Augoor subdomain that we created in the above step. This certificate must be assigned to the ALB that we created before.
  - Open communication in port 3000 from the ALB assigned to expose Augoor.

## Prepare the instance

Connect to the instance created to run Augoor in the previous steps by SSH or Session Manager and follow the instruction below 
### Download Augoor Installer
To download the installer, you must follow the next steps:
```bash
    # 1. Download Augoor installer form Augoor S3.
    wget https://augoor-docker-installer.s3.us-east-2.amazonaws.com/augoor_docker_install_9.1.zip

    # 2. Unzip the augoor_docker_install.zip file
    unzip augoor_docker_install_9.1.zip
```

### Install Drivers and Docker software
  
  - Nvidia Driver
    ```bash
     # 1. Install gcc and make, if they are not already installed.
    sudo yum install gcc make

    # 2. Update your package cache and get the package updates for your instance.
    sudo yum update -y

    # 3. Reboot your instance to load the latest kernel version.
    sudo reboot

    # 4. Run Scritp install AWS GPU
    bash install_aws_gpu.sh

    # 5. Reboot your instance.
    sudo reboot

    # 6. Test
    nvidia-smi
    # expected result 

    Thu Nov 16 01:36:43 2023       
    +---------------------------------------------------------------------------------------+
    | NVIDIA-SMI 535.129.03             Driver Version: 535.129.03   CUDA Version: 12.2     |
    |-----------------------------------------+----------------------+----------------------+
    | GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
    | Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
    |                                         |                      |               MIG M. |
    |=========================================+======================+======================|
    |   0  NVIDIA A10G                    On  | 00000000:00:1E.0 Off |                    0 |
    |  0%   16C    P8              15W / 300W |      2MiB / 23028MiB |      0%      Default |
    |                                         |                      |                  N/A |
    +-----------------------------------------+----------------------+----------------------+
                                                                                            
    +---------------------------------------------------------------------------------------+
    | Processes:                                                                            |
    |  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
    |        ID   ID                                                             Usage      |
    |=======================================================================================|
    |  No running processes found                                                           |
    +---------------------------------------------------------------------------------------+
  
    ```

  - Nvidia extension for docker
    ```bash
    # 1. Configure the repository:
    
    curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo | \
    sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo

    # 2. Install the NVIDIA Container Toolkit packages:
    sudo yum install -y nvidia-container-toolkit

    ```

  - Docker version, 20.10.25 or higher
    ```bash
    # 1. Update AL2023 Packages
    sudo yum update

    # 2. Installing Docker on Amazon Linux 2023
    sudo yum install docker

    # 3. Start and Enable its Service
    sudo systemctl start docker

    sudo systemctl enable docker

    # 4. Check and confirm the service is running absolutely fine
    sudo systemctl status docker

    # 5. Allow docker to run without sudo
    sudo usermod -aG docker $USER

    # 6. Apply the changes we have done to Docker Group
    newgrp docker

    # 7. Check if the Docker was installed correctly.
    docker -v
    ```
  - Docker Compose, version 2.22.0 or higher
    ```bash
    # 1. Download and install Compose
    sudo curl -SL https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose

    # 2. Create a symbolic link
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

    # 3. Allow Compose to run without sudo
    sudo chmod +x /usr/local/bin/docker-compose 

    # 4. Check if the Compose was installed correctly.
    docker-compose -v

    ```
  - Git, version 2.40.1 or higher
    ```bash
    sudo yum install git
    ```
  - Java for Keytool version 19.0.2 or higher
    ```bash
    sudo yum install java
    ```

## Configure Augoor
### Parameters
This parameters must be setting in **.env file**.
documentation about [how to create Auth App in GitHub here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

| Name                    | Description                                                                         | Example Value                     |
|-------------------------|-------------------------------------------------------------------------------------|---------------------------|
| `containerRegistry`     | Docker image registry                                                               | `""`                      |
| `containerRepository`   | Docker image repository, e.g: augoor.azurecr.io/$containerRepository/image:tag      | `"serenity"`              |
| `customDomainProvider`  | Needed if the Provider does have a custom domain instead of [github/gitlab/etc].com | `"github:github.com,azure:dev.azure.com,bitbucket:bitbucket.org,gitlab:gitlab.com,github:github.corp.globant.com"`                      |
| `appurl`                | Application URL’s full domain only. i.e. auggor.my-domain.com                       | `auggor.my-domain.com`    |
| `gh_url`                | https://github.com but if the client is using github enterprise then set the url from global.customDomainProvider.| `https://github.com`      |
| `gh_client_name`        | Name showed in the login screeen                                                                                    | `Augoor Docker`           |
| `gh_client_id`          | Client ID from OAuth Apps [more information here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)                                                         | `sdfca0984r534`           |
| `gh_client_secret`      | Client Secret from OAuth Apps [more information here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)                                                      | `dsfklñksd90843jklñsdaf90`|
| `gh_admins`             | Augoor admins users                                                                 | `user1,user2`             |


## Installation
### Login to Docker Repository

To install Augoor, the first step is login in to your docker registry. To do this task, you should use the next command:
```bash
# This is an example of login into AWS ecr.
export D_PASSWORD="your password"
echo $D_PASSWORD | docker login augoor.azurecr.io -u Usuario --password-stdin
```
> Remember to use the right configuration according to your repository augoor publish the images in `augoor.azurecr.io`.

### Run installation scripts

You have two ways to install Augoor:

**Option 1. your SCM has an SSL Certificate signed by a public CA like github.com.**

You must run the following script.

```bash
bash install_augoor.sh -i
```

**Option 2. your SCM has an private SSL Certificate.**

You must run the following script.
  - Replace ssl/server.crt for your private CA as follows:
```bash
cp my_ca.crt ssl/server.crt
```
  - Install Augoor SSL as follows:
```bash
bash install_augoor.sh -s
```

### Check container status
To check if the services are up, you can use this command:

```bash
docker-compose ps
```
You can view a list of the installed services, which should total 16. Please refer to the list below.

## Service Deployed
| Service                  | Description                   | Version |
|--------------------------|-------------------------------|---------|
| sn_auth                  | Authentication Service        | v0.10.2 | 
| sn_code_processor        | Code Processor Service        | v0.9.6-l2d-off-v2 | 
| sn_context_api           | Context Api Service           | v2.1.2-hotfix9.1 |       
| sn_context_spider        | Context Spider Service        | v1.3.3-hotfix9.1-2 |     
| sn_forefront_proxy       | Fore Front Proxy Service      | v1.3.1 |    
| sn_frontend_proxy        | Frontend Proxy Service        | v1.0 |   
| sn_model_inference       | Model Inference Service       | v1.0.1-multitas-006 | 
| sn_model_services        | Model Service                 | v0.9.1| 
| sn_semantic_conversation | Semantic Conversation Service | v0.6.12 | 
| sn_structure_indexer     | Structure Indexer Service     | v0.3.0 | 
| sn_structure_retrieval   | Structure Retrieval Service   | v0.4.0 | 
| sn_zoekt_indexer         | Indexer Service               | v1.2.8-rsync-fix-2-memory-fix | 
| sn_zoekt_search          | Search Service                | v1.2.8-rsync-fix-2-memory-fix |
| sn_zoekt_sync            | Sync Service                  | v1.0 |
| sn_ui                    | Frontend Service              | v0.7.19-patch1 |
| sn_postgres              | Database Service              | v11 |
| sn_queue                 | RabbitMQ Queue Service        | rabbitmq:3-management|


>[Return Augoor Docker Installation ](../README.md)


         

