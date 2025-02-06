export const themeData = JSON.parse("{\"encrypt\":{\"config\":{\"/demo/encrypt.html\":[\"$2a$10$e92S/c53mDhdd8qdtHrmBueWH5uVmrIFjl5j8dKcSibmA3zoID87m\"]}},\"blog\":{\"name\":\"txy\",\"avatar\":\"/logo.png\",\"description\":\"Java 开发工程师 | 技术博主\",\"intro\":\"/about/\",\"roundAvatar\":true,\"medias\":{\"GitHub\":\"https://github.com/fuzhengwei\",\"Gitee\":\"https://gitee.com/fustack\"}},\"logo\":\"/logo.svg\",\"repo\":\"fuzhengwei/xfg-resume-blog\",\"docsDir\":\"src\",\"footer\":\"txy\",\"displayFooter\":true,\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"navbarLocales\":{\"langName\":\"简体中文\",\"selectLangAriaLabel\":\"选择语言\"},\"metaLocales\":{\"author\":\"作者\",\"date\":\"写作日期\",\"origin\":\"原创\",\"views\":\"访问量\",\"category\":\"分类\",\"tag\":\"标签\",\"readingTime\":\"阅读时间\",\"words\":\"字数\",\"toc\":\"此页内容\",\"prev\":\"上一页\",\"next\":\"下一页\",\"lastUpdated\":\"上次编辑于\",\"contributors\":\"贡献者\",\"editLink\":\"在 GitHub 上编辑此页\",\"print\":\"打印\"},\"blogLocales\":{\"article\":\"文章\",\"articleList\":\"文章列表\",\"category\":\"分类\",\"tag\":\"标签\",\"timeline\":\"时间轴\",\"timelineTitle\":\"昨日不在\",\"all\":\"全部\",\"intro\":\"个人介绍\",\"star\":\"收藏\"},\"paginationLocales\":{\"prev\":\"上一页\",\"next\":\"下一页\",\"navigate\":\"跳转到\",\"action\":\"前往\",\"errorText\":\"请输入 1 到 $page 之前的页码！\"},\"outlookLocales\":{\"themeColor\":\"主题色\",\"darkmode\":\"外观\",\"fullscreen\":\"全屏\"},\"encryptLocales\":{\"iconLabel\":\"文章已加密\",\"placeholder\":\"输入密码\",\"remember\":\"记住密码\",\"errorHint\":\"请输入正确的密码\"},\"routeLocales\":{\"skipToContent\":\"跳至主要內容\",\"notFoundTitle\":\"页面不存在\",\"notFoundMsg\":[\"这里什么也没有\",\"我们是怎么来到这儿的？\",\"这 是 四 零 四 !\",\"看起来你访问了一个失效的链接\"],\"back\":\"返回上一页\",\"home\":\"带我回家\",\"openInNewWindow\":\"Open in new window\"},\"navbar\":[\"/\",{\"text\":\"技术\",\"icon\":\"book\",\"prefix\":\"/tech\",\"children\":[{\"text\":\"计算机基础\",\"link\":\"/basic\"},{\"text\":\"算法\",\"link\":\"/algorithms\"},{\"text\":\"数据库\",\"link\":\"/database\"},{\"text\":\"Java\",\"link\":\"/java\"},{\"text\":\"大数据\",\"link\":\"/bigdata\"},{\"text\":\"中间件\",\"link\":\"/middleware\"},{\"text\":\"云原生\",\"link\":\"/cloudnative\"}]},{\"text\":\"随笔\",\"icon\":\"book\",\"link\":\"/essays\"},{\"text\":\"学习笔记\",\"icon\":\"book\",\"prefix\":\"/notes\",\"children\":[{\"text\":\"xxx项目\",\"link\":\"/xxx\"}]},{\"text\":\"兴趣爱好\",\"icon\":\"book\",\"prefix\":\"/code\",\"link\":\"/hobbies\"}],\"sidebar\":{\"/tech/database/\":[{\"text\":\"数据库\",\"icon\":\"home\",\"link\":\"/tech/database/\"},{\"text\":\"MYSQL\",\"icon\":\"laptop-code\",\"link\":\"mysql\"},{\"text\":\"Redis(上)\",\"icon\":\"laptop-code\",\"link\":\"redis1\"},{\"text\":\"Redis(下)\",\"icon\":\"laptop-code\",\"link\":\"redis2\"}],\"/tech/algorithms/\":[{\"text\":\"介绍\",\"icon\":\"home\",\"link\":\"/code/\"},{\"text\":\"技术\",\"icon\":\"laptop-code\",\"collapsible\":true,\"children\":[\"test\"]}],\"/tech/java/\":[{\"text\":\"Java\",\"icon\":\"home\",\"link\":\"/tech/java/\"},{\"text\":\"Java基础\",\"icon\":\"laptop-code\",\"link\":\"javaBasic\"},{\"text\":\"JVM\",\"icon\":\"home\",\"link\":\"jvm\"},{\"text\":\"JUC\",\"icon\":\"laptop-code\",\"link\":\"juc\"},{\"text\":\"日志\",\"icon\":\"laptop-code\",\"link\":\"logframework\"}],\"/tech/basic/\":[{\"text\":\"计算机基础\",\"icon\":\"home\",\"link\":\"/tech/basic/\"},{\"text\":\"操作系统\",\"icon\":\"laptop-code\",\"link\":\"os\"},{\"text\":\"计算机网络\",\"icon\":\"laptop-code\",\"link\":\"network\"}],\"/notes/xxx/\":[{\"text\":\"Lottery 项目开发日志\",\"icon\":\"laptop-code\",\"children\":[\"day01.md\",\"day02.md\",\"day03.md\",\"day04.md\",\"day05.md\",\"day06.md\",\"day07~day08.md\",\"day09~day10.md\",\"day11.md\",\"day12.md\"]}],\"/essays/\":[{\"text\":\"随笔\",\"icon\":\"home\",\"link\":\"/essays/\"},{\"text\":\"新年快乐!\",\"icon\":\"laptop-code\",\"link\":\"newyear\"}]}}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
