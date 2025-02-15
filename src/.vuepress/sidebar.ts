import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/tech/database/": [
    {
      text: '数据库',
      icon: 'home',
      link: '/tech/database/',
    },
    {
      text: "MYSQL",
      icon: "laptop-code",
      link: 'mysql'
    },
    {
      text: "Redis(上)",
      icon: "laptop-code",
      link: 'redis1'
    },
    {
      text: "Redis(下)",
      icon: "laptop-code",
      link: 'redis2'
    }
  ],
  "/tech/algorithms/": [
    {
      text: '介绍',
      icon: 'home',
      link: '/code/',
    },
    {
      text: "技术",
      icon: "laptop-code",
      collapsible: true,
      children: [
        "test"
      ]
    }
  ],
  "/tech/java/": [
    {
      text: 'Java',
      icon: 'home',
      link: '/tech/java/',
    },
    {
      text: "Java基础",
      icon: "laptop-code",
      link: 'javaBasic'
    },
    {
      text: 'JVM',
      icon: 'home',
      link: 'jvm',
    },
    {
      text: 'JUC',
      icon: 'laptop-code',
      link: 'juc',
    },
    {
      text: "日志",
      icon: "laptop-code",
      link: 'logframework'
    }
  ],
  "/tech/basic/": [
    {
      text: '计算机基础',
      icon: 'home',
      link: '/tech/basic/',
    },
    {
      text: "操作系统",
      icon: "laptop-code",
      link: 'os'
    },
    {
      text: "计算机网络",
      icon: "laptop-code",
      link: 'network'
    }
  ],
  "/notes/xxx/": [
    {
      text: "Lottery 项目开发日志",
      icon: "laptop-code",
      // prefix: "md/dev-log/",
      children: ["day01.md","day02.md","day03.md","day04.md","day05.md","day06.md","day07~day08.md","day09~day10.md","day11.md","day12.md"],
    }
  ],
  "/notes/bigmarket/": [
    {
      text: "大营销 项目开发日志",
      icon: "laptop-code",
      // prefix: "md/dev-log/",
      children: ["day01.md", "day02.md", "day03.md", "day04.md", "day05.md"],
    }
  ],
  "/essays/": [
    {
      text: '随笔',
      icon: 'home',
      link: '/essays/',
    },
    {
      text: "新年快乐!",
      icon: "laptop-code",
      link: 'newyear'
    }
  ],


});