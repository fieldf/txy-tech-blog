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
    },
    {
      text: "Redis常见用法",
      icon: "laptop-code",
      link: 'redisUse'
    }
  ],
  "/tech/algorithms/": [
    {
      text: "算法",
      icon: "laptop-code",
      // prefix: "md/dev-log/",
      children: ["linkedlist.md","arrays.md","hash.md","queue.md","trie.md"],
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
      children: ["day01.md", "day02.md", "day03.md", "day04.md", "day05.md", "day06.md", "day07.md", "day08.md", "day09.md", "day10.md", "day11.md", "day12.md"],
    }
  ],
  "/notes/chatgpt/": [
    {
      text: "chatgpt 项目开发日志",
      icon: "laptop-code",
      children: ["day01.md", "day02.md", "day03.md"],
    }
  ],
  "/notes/ragmcp/": [
    {
      text: "rag&mcp 项目开发日志",
      icon: "laptop-code",
      children: ["day01.md", "day02.md", "day03.md","day04.md","day05.md","day06.md","day07.md","day08.md","day09.md","day10.md"],
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
    },
    {
      text: "什么是困难的事",
      icon: "laptop-code",
      link: 'difficultThing'
    },
    {
      text: "一些工作上的思考",
      icon: "laptop-code",
      link: 'workthinking'
    },
    {
      text: "一些工作上的思考2",
      icon: "laptop-code",
      link: 'kunhuo'
    },
    {
      text: "如何能更快的成长",
      icon: "laptop-code",
      link: 'ruheggkkigvh'
    }
  ],


});