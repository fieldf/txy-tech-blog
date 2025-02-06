import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "技术",
    icon: "book",
    prefix: "/tech",
    children: [
      {
        text: "计算机基础",
        link: "/basic",
      },
      {
        text: "算法",
        link: "/algorithms",
      },
      {
        text: "数据库",
        link: "/database",
      },
      {
        text: "Java",
        link: "/java",
      },
      {
        text: "大数据",
        link: "/bigdata",
      },
      {
        text: "中间件",
        link: "/middleware",
      },
      {
        text: "云原生",
        link: "/cloudnative",
      }
    ]
  },
  {
    text: "随笔",
    icon: "book",
    // prefix: "/code",
    link: "/essays",
  },
  {
    text: "学习笔记",
    icon: "book",
    prefix: "/notes",
    children: [
      {
        text: "xxx项目",
        link: "/xxx",
      },
      {
        text: "大营销项目",
        link: "/bigmarket",
      }
    ]
  },
  {
    text: "兴趣爱好",
    icon: "book",
    prefix: "/code",
    link: "/hobbies"
  },
]);