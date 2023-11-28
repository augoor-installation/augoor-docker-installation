# Augoor Docker Installation

This repository uses Vitepress to build a static site containing the documentation guides for installing Augoor using Docker Compose.

## Requirements
* NodeJS
* yarn

## How to run on locally
Change directory to `docs`

```bash
cd docs
```

Install the project dependencies

```bash
yarn install
```

Run a dev instance
```bash
yarn docs:dev
```
This will start a web server printing the following in your terminal
```bash
  vitepress v1.0.0-rc.31

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```
Open the link to browse the documentation. You can edit the documentation and vitepress will automatically refresh your browser content.

## How to deploy

```bash
yarn docs:build
```
This will build the static website under `docs/.vitepress/dist`. Copy the contents to your web server to publish the website.



This guide provides simple instructions for installing Augoor 1.9.1 on a single AWS instance. Augoor is software that you can easily install by following the steps below. [Overview of Augoor](https://augoor.ai).

We provide two versions of the Augoor installation guide on AWS: 

1. [The Installation Guide for Amazon Linux 2.](guides/amazon_linux2_install.md)
2. [The Installation Guide for Amazon Linux 2023.](guides/amazon_linux2023_install.md)

Please note that these guides are specifically tailored for these two versions of Amazon Linux.