module.exports = {
  siteName: 'devlog.akasai',
  siteUrl: 'https://akasai.github.io',
  siteDescription: '',
  titleTemplate: '%s | devlog.akasai',
  metadata: {
    nickname: 'akasai',
    name: 'Sungjun.Kim',
    mail: 'tjdwns2020@gmail.com',
    description: '👨‍💻 Jr. Backend Developer',
    location: 'Seoul/Korea',
    skills: ['Node.js', 'Typescript', 'GraphQL', 'Serverless', 'PostgreSQL', 'Kubernetes'],
    link: {
      github: 'https://github.com/akasai',
      hackerrank: 'https://www.hackerrank.com/ksj21c',
      instagram: 'https://www.instagram.com/ksj21c'
    }
  },
  templates: {
    Post: '/:slug',
    Tag: '/tag/:id'
  },
  plugins: [
    {
      use: 'gridsome-plugin-typescript'
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
          anchorClassName: 'icon icon-link',
          plugins: [
            ['@gridsome/remark-prismjs', { transformInlineCode: true }]
          ]
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000 // default
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-177911237-1'
      }
    },
    {
      use: 'gridsome-plugin-feed',
      options: {
        contentTypes: ['Post'],
        feedOptions: {
          title: 'A Gridsome Minimal Blog',
          description: 'Best blog feed evah.'
        },
        rss: {
          enabled: true,
          output: '/feed.xml'
        },
        atom: {
          enabled: false,
          output: '/feed.atom'
        },
        json: {
          enabled: false,
          output: '/feed.json'
        },
        maxItems: 25,
        htmlFields: ['description', 'content'],
        enforceTrailingSlashes: false,
        filterNodes: (node) => true,
        nodeToFeedItem: (node) => ({
          title: node.title,
          date: node.date || node.fields.date,
          content: node.content
        })
      }
    }
  ],
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
