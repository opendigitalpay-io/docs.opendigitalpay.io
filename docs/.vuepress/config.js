const { resolve } = require('path')
const implicitFigures = require('markdown-it-implicit-figures')
const slugify = require('./slugify')
const preprocessMarkdown = resolve(__dirname, 'preprocessMarkdown')

const title = 'OpenDigitalPay Docs'
const baseUrl = 'https://docs.opendigitalpay.io'
const pageSuffix = '/'
const info = {
  name: title,
  twitter: 'opendigitalpay'
}
const extractDescription = text => {
  if (!text) return
  const paragraph = text.match(/^[A-Za-z].*(?:\n[A-Za-z].*)*/m)
  return paragraph ? paragraph.toString().replace(/[\*\_\(\)\[\]]/g, '') : null
}

module.exports = {
  title,
  description: "OpenDigitalPay Official Documentation",
  head: [
    ["link", { rel: "stylesheet", href: "/styles/btcpayserver-variables.css" }]
  ],
  chainWebpack (config) {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use(preprocessMarkdown)
        .loader(preprocessMarkdown)
        .end()
  },
  plugins: [
    ['seo', {
      siteTitle: (_, $site) => $site.title,
      title: $page => $page.title,
      description: $page => $page.frontmatter.description || extractDescription($page._strippedContent),
      author: (_, $site) => info,
      tags: $page => ($page.frontmatter.tags || ['BTCPay Server']),
      twitterCard: _ => 'summary',
      type: $page => 'article',
      url: (_, $site, path) => `${baseUrl}${path.replace('.html', pageSuffix)}`,
      image: ($page, $site) => `${baseUrl}/card.png`
    }],
    ['clean-urls', {
      normalSuffix: pageSuffix,
      indexSuffix: pageSuffix,
      notFoundPath: '/404.html',
    }],
    ['code-copy', {
      color: '#8F979E',
      backgroundTransition: false,
      staticIcon: true
    }],
    ['sitemap', {
      hostname: baseUrl,
      exclude: ['/404.html']
    }],
    ['@vuepress/medium-zoom']
  ],
  markdown: {
    extendMarkdown (md) {
      md.use(implicitFigures)
    },
    pageSuffix,
    slugify
  },
  themeConfig: {
    domain: baseUrl,
    logo: "/img/btcpay-logo.svg",
    displayAllHeaders: false,
    repo: "btcpayserver/btcpayserver-doc",
    docsDir: "docs",
    editLinks: true,
    notSatisfiedLinks: true, // our own addition, see theme/components/PageEdit.vue
    sidebarDepth: 0,
    algolia: {
      indexName: 'btcpayserver',
      apiKey: '6a3a4c4380385cb5c9f9070247fdfca6',
      // See https://www.algolia.com/doc/api-reference/api-parameters/
      algoliaOptions: {
        // hitsPerPage: 10,
        typoTolerance: 'min'
      },
      // See https://community.algolia.com/docsearch/behavior.html#autocompleteoptions
      autocompleteOptions: {
        openOnFocus: true
      }
    },
    nav: [
      {
        text: "Website",
        link: "https://btcpayserver.org/",
        rel: "noopener noreferrer website"
      },
      {
        text: "Chat",
        link: "https://chat.btcpayserver.org/",
        rel: "noopener noreferrer chat"
      },
      {
        text: "GitHub",
        link: "https://github.com/btcpayserver/",
        rel: "noopener noreferrer github"
      },
      {
        text: "Twitter",
        link: "https://twitter.com/BtcpayServer",
        rel: "noopener noreferrer twitter"
      }
    ],
    sidebar: [
      ["/", "Introduction"],
      {
        title: "System Design",
        collapsable: false,
        children: [
          ["/Architecture", "Architecture"],
          ["/PaymentEngine", "Payment Engine"]
        ]
      },
      {
        title: "How to Start",
        collapsable: false,
        children: [
          ["/DemoApp", "Demo App"],
          ["/LocalDev", "Local Development"],
        ]
      },
      {
        title: "Features",
        collapsable: false,
        children: [
          ["/Topup", "Topup"],
          ["/Payment", "Payment"],
          ["/Refund", "Refund"],
          ["/Payout", "Payout"],
          {
            title: "Pull Payments",
                path: "/PullPayments",
                children: [
                  ["/Refund", "Refunds"]
            ]
          }
        ]
      }
    ]
  }
}
