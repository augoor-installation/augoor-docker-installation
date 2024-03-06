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
      { text: 'Knowledge Center', link: '/knowledge_center/getting_started/index', activeMatch: '/knowledge_center/getting_started/' },
      { text: 'Augoor.ai', link: 'https://augoor.ai' },
    ],

    head : [],

    footer: {
      copyright: '© 2022 Augoor™ . All right reserved &nbsp;&nbsp; | &nbsp;&nbsp; <a href="https://www.augoor.ai/policies">Policies</a>'
    },

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
    '/1.9.1/installation/guides/docker_compose/amazon_linux_2023/': docker_linux2023_sidebar(),
    '/knowledge_center/getting_started': getting_started_sidebar(),
    '/knowledge_center/repository_management': getting_started_sidebar(),
    '/knowledge_center/code_search': getting_started_sidebar(),
    '/knowledge_center/code_documentation': getting_started_sidebar(),
    '/knowledge_center/code_navigation': getting_started_sidebar(),
    '/knowledge_center/code_assistant': getting_started_sidebar(),
    '/knowledge_center/security': getting_started_sidebar(),
    '/knowledge_center/support_resources': getting_started_sidebar(),
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

function getting_started_sidebar() {
  return [
    // { text: 'Overview', link: '/knowledge_center/getting_started/' },
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction to Augoor', link: '/knowledge_center/getting_started/introduction' },
        { text: 'Login and Authentication', link: '/knowledge_center/getting_started/login_authentication' },
        { text: 'Roles and permissions', link: '/knowledge_center/getting_started/roles_permissions' }
      ]
    },
    {
      text: 'Repository Management',
      items: [
        { text: 'Manage repositories', link: '/knowledge_center/repository_management/manage_repositories' },
        { text: 'Repositories Status', link: '/knowledge_center/repository_management/repositories_status' },
        { text: 'Manage subscriptions', link: '/knowledge_center/repository_management/manage_subscriptions' }
      ]
    },
    {
      text: 'Code Search',
      items: [
        { text: 'Search Overview', link: '/knowledge_center/code_search/search_overview' },
        { text: 'Advanced Search Techniques', link: '/knowledge_center/code_search/advanced_search_techniques' },
        { text: 'Interactive Tutorial', link: '/knowledge_center/code_search/Interactive_tutorial' }
      ]
    },
    {
      text: 'Code Documentation',
      items: [
        { text: 'Documentation Overview', link: '/knowledge_center/code_documentation/documentation_overview' },
        { text: 'Interacting with the documentation', link: '/knowledge_center/code_documentation/interacting_documentation' }
      ]
    },
    {
      text: 'Code Navigation',
      items: [
        { text: 'Codemap overview', link: '/knowledge_center/code_navigation/codemaps_overview' },
        { text: 'Navigating codemap', link: '/knowledge_center/code_navigation/navigating_codemap' },
        { text: 'Conversational assistant (beta)', link: '/knowledge_center/code_navigation/conversational_assistant' }
      ]
    },
    {
      text: 'Code Assistant',
      items: [
        { text: 'AI Code Assistant', link: '/knowledge_center/code_assistant/' }
      ]
    },
    {
      text: 'Security',
      items: [
        { text: 'Security protocols', link: '/knowledge_center/security/' },
      ]
    },
    {
      text: 'Support and Resources',
      items: [
        { text: 'FAQs', link: '/knowledge_center/support_resources/faqs' },
        { text: 'Troubleshooting guides', link: '/knowledge_center/support_resources/troubleshooting_guides' },
        { text: 'What´s New', link: '/knowledge_center/support_resources/whats_new' },
        { text: 'Support contact', link: '/knowledge_center/support_resources/support_contact' },
      ]
    },
  ]
}
