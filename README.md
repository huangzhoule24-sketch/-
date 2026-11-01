# 《山海食肆物语》网站版 · SH-WEB-R4

本网站使用SH-MENU-R5完整游戏，文化简介恢复完整像素人物，图鉴水墨立绘保留防裁头修复。经营阶段0–4、30伙伴、25菜牌核对、61篇中英文化读本、来客往事、音乐和独立音频开关全部保留。网页入口支持中英文，手机建议横屏。

## 打开方式

在线发布后，浏览器打开网站地址，点击“开始网页试玩”。无需安装Godot或Python。首次点击允许浏览器播放音乐；音乐和音效可在游戏系统设置中独立关闭。

下载的网站文件不能直接双击HTML运行。全部解压，在电脑安装Python3后双击Start-Web.cmd，或运行python serve.py --open-browser。默认地址http://127.0.0.1:8000/。公开托管时不需要玩家安装Python；Python只用于本地启动。

## 托管

整个文件夹是静态网站，可放在GitHub Pages、Cloudflare Pages、Netlify或支持WASM的HTTP/HTTPS服务器上，目录结构保持完整。入口为index.html，实际游戏在game/。无需数据库、登录服务、跨域隔离响应头或SharedArrayBuffer。

GitHub Pages：仓库Settings → Pages → Build and deployment，Source选择Deploy from a branch，Branch选择gh-pages、/(root)，Save。等待GitHub自动部署。预计默认网址https://huangzhoule24-sketch.github.io/-/；是否实际上线以发布核验记录为准，不能把预计网址当作已验证的在线试玩链接。

## 加载

主流浏览器优先下载gzip文件并流式展开，减少传输；缺少解压API或压缩资源不可用时使用同源原始文件。原始WASM和PCK始终保留，游戏内容没有裁减。首次加载仍受网络影响；界面有下载进度和失败重试，重试不清除存档。

所有资源都从网站自身目录加载，不依赖第三方字体、CDN或音乐网站。已登录游戏不需要持续联网向服务器发送经营状态。

## 存档与设备

存档与导入资源属于当前浏览器、当前网站本地存储，不自动与Windows版或其他设备同步。保持同一网址、同一浏览器；清除站点数据或无痕浏览可能失去记录。离开前在系统页保存并稍候。

建议较新的Chrome/Edge。Firefox、Safari需支持WebAssembly和WebGL2；适配布局不等于已测试所有手机和教室硬件。课堂展示请提前在相同设备和网络试开，Windows离线包继续可作备用。

## 开发者

网站模板在web/site，下载优化脚本web/fast-loader.js，构建脚本tools/build_web_site.py。先保持Godot Web导出和export-receipt.json有效，再运行构建脚本。网站回执记录原游戏源码指纹、完整文件SHA及压缩前后大小；原WASM/PCK与已验收游戏逐字节相同。此网站壳的改变不修改游戏经营代码。

## 面向大陆访问的备用站

当前尚无新云账号或服务器，暂未新增大陆备用网址。包内deploy/README.md给出香港Ubuntu主机、实际域名与HTTPS的开通部署步骤，附Nginx配置及verify-hosted-site.py完整性检查脚本。所有示例域名都需要换成自己的真实域名。先开通和部署，再实测学校网络；不把示例地址当成已上线入口。

## 手机与课堂分享版 SH-WEB-R4

本轮优先使用免费静态托管，不要求购买服务器或学校HTTPS空间。最少登录授权步骤见deploy/FREE-HOSTING.md，旧版主机部署指南仅作可选路线保留。当前新增免费平台项目仍待本人登录授权，不能把现有GitHub地址说成已经部署的大陆站。

分享页share.html按当前网址生成二维码，支持下载SVG和打印。手机横屏使用；手指拖动餐厅、上下滑动列表，窄屏顶栏分成两行。竖屏时自动暂停原先运行的游戏，回横屏恢复；原先手动暂停保持暂停。

完整WASM与PCK按8 MiB上限拆分，优先流式解压gzip分片，兼容模式还原raw分片；内容不删减。普通静态服务器直接保留目录即可。当前站点不再用两个大文件URL直接加载，核验工具支持resource_map。
