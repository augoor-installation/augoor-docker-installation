import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Augoor",
  base: "/augoor-docker-installation/",
  description: "Augoor Installation Guides",
  //Route rewrites
  rewrites: {
      'versions/:version/(.*)': ':version/(.*)'
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/', activeMatch: '' },
      { text: 'Installation', link: '/1.9.1/installation/index' , activeMatch: '/1.9.1/installation/' },
      { text: 'Augoor.ai', link: 'https://augoor.ai' },
    ],

    head : [],

    lang: 'en-US',

    sidebar: sidebars(),

    lastUpdated: true,

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/augoor-installation/augoor-installation' }
    // ],

    markdown: {
      // toc: { level: [3] },
      // theme: 'one-dark-pro',
      lineNumbers: true,
      config: (md) => {
        md.use(require('markdown-it-task-lists', { enabled: true }))
      }
    }
  }
})


function sidebars() {
  return {
    '/1.9.1/installation/guides/docker_compose/amazon_linux_2/': docker_linux2_sidebar(),
    '/1.9.1/installation/guides/docker_compose/amazon_linux_2023/': docker_linux2023_sidebar()
  }
}

function docker_linux2_sidebar() {
  return [
     { text: 'Overview', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Preparing the Infrastructure', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2/preparing_infrastructure' },
        { text: 'Step 2. Preparing the EC2 instance', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2/preparing_instance' },
        { text: 'Step 3. Configuration', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2/configuration' },
        { text: 'Step 4. Installation', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2/installation' },
      ]
    }
  ]
}


function docker_linux2023_sidebar() {
  return [
     { text: 'Overview', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2023/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Preparing the Infrastructure', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2023/preparing_infrastructure' },
        { text: 'Step 2. Preparing the EC2 instance', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2023/preparing_instance' },
        { text: 'Step 3. Configuration', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2023/configuration' },
        { text: 'Step 4. Installation', link: '/1.9.1/installation/guides/docker_compose/amazon_linux_2023/installation' },
      ]
    }
  ]
}
