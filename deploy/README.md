# 《山海食肆物语》大陆访问备用站：从开通到上线

目前已经能下载完整网站包，但还没有开通云账号、服务器或域名，因此没有新增可用的大陆备用网址。下面出现的game.example.com都是示例，需要换成你购买的实际域名。现有GitHub试玩地址仍保留。

## 选择方案与费用

建议首次部署选腾讯云轻量应用服务器的中国香港区域、Ubuntu 22.04系统，加一个自己的域名和HTTPS。游戏在玩家浏览器里运算，服务器只发静态文件，不需要数据库或Godot。可以从低配置主机开始；香港区域可免去大陆机房的网站备案流程。如果改选大陆机房，先按服务商要求办理网站备案。

这是需要自己开通的付费方案，具体价格以购买页为准；本项目没有代购、创建账号或产生云服务费用。主机和域名按服务商价格付费，下面使用的Let's Encrypt HTTPS证书免费。若学校已有可用的HTTPS网站空间，直接请管理员放入整个网站目录即可，可以省去新购服务器。

带宽比CPU更值得注意：首次每位玩家约下载40 MB，1 Mbps带宽仅理论传输就要约5分钟，多人同时进入会共享带宽。避免只看主机价格忽视带宽与流量额度；课堂展示先让主讲电脑加载完毕。香港节点的实际大陆访问情况仍要在学校网络验证，不能仅凭机房位置保证所有地区流畅。

## 一、开通账号、主机与域名

1. 打开腾讯云官网https://cloud.tencent.com/，注册并按平台要求实名认证。进入轻量应用服务器购买页，选中国香港区域、Ubuntu 22.04系统。购买前自行核对带宽、流量、续费价和预算。
2. 在腾讯云域名注册，或使用你在其他服务商已购买的域名。示例游戏子域名为game.example.com；实际可以是game.你的域名。
3. 在域名DNS控制台新增A记录：主机记录game，记录值填主机控制台显示的公网IPv4地址。这里填IP，不填https://或目录。
4. 在服务器防火墙/安全组放行TCP 80和443。SSH登录按控制台的密码或SSH密钥流程设置；不需要把密码、密钥或云账号发到聊天里。
5. 等待DNS生效，确认game.你的域名解析到了新主机。可以在自己电脑运行nslookup game.你的域名检查。

控制台产品名称可能调整；入口可从腾讯云官网搜索“轻量应用服务器”“域名注册”“DNS解析”。无需给游戏接入付费数据库、账号系统或其他云接口。

## 二、上传完整网站包

下载本次shanhai-v1.9.5-web-r3-site.zip，保留完整ZIP。用服务器控制台的上传功能或WinSCP上传到服务器/tmp目录，命名为/tmp/shanhai-site.zip。不要只上传index.html。

通过控制台登录Ubuntu主机，依次运行：

```bash
sudo apt update
sudo apt install -y nginx unzip certbot python3-certbot-nginx
sudo mkdir -p /var/www/shanhai/releases/web-r3
sudo unzip /tmp/shanhai-site.zip -d /var/www/shanhai/releases/web-r3
sudo ln -sfn /var/www/shanhai/releases/web-r3 /var/www/shanhai/current
sudo cp /var/www/shanhai/current/deploy/nginx-http.conf /etc/nginx/sites-available/shanhai
sudo nano /etc/nginx/sites-available/shanhai
```

在编辑器中把server_name后面的game.example.com换成实际域名。按Ctrl+O保存、回车确认，Ctrl+X退出。然后运行：

```bash
sudo ln -sfn /etc/nginx/sites-available/shanhai /etc/nginx/sites-enabled/shanhai
sudo nginx -t
sudo systemctl reload nginx
```

nginx -t出现successful后再reload。有错误时先按提示检查域名、分号、文件路径。该配置专门给本游戏使用，不需要重写成单页应用，也不要把不存在的WASM/PCK请求返回成首页HTML。

## 三、启用HTTPS

确认域名DNS已生效、80/443可访问，然后运行下方命令；把示例域名换成自己的实际域名：

```bash
sudo certbot --nginx -d game.example.com
```

按提示填写自己的邮箱并阅读证书服务条款，选择HTTPS跳转。完成后访问https://你的实际域名/。公共游戏站要使用HTTPS，浏览器音频等能力在非安全的普通HTTP公网地址上可能受限。证书申请失败时优先检查DNS与80端口，不要反复修改游戏文件。

Ubuntu软件包通常会安装证书续期定时任务；可以用sudo certbot renew --dry-run检查续期。服务器仍需正常续费，证书续期也依赖域名与网络正常。

## 四、验收游戏与大陆访问

网站包deploy目录附有仅用Python标准库的检查脚本，可以在自己电脑或服务器运行：

```bash
python3 /var/www/shanhai/current/deploy/verify-hosted-site.py --url https://game.example.com/ --full
```

脚本检查首页、游戏入口、WASM/PCK类型，以及约40 MB压缩资源的SHA和解压还原。通过静态检查后，还需要在学校网络、手机移动网络中实际打开游戏，检查开局、人物图、点击后的音乐、开关、保存与刷新。检测脚本不代表已经用大陆网络试玩，也不检测所有手机型号。

新域名和原GitHub域名的浏览器存档各自保存，不会自动同步；换站后出现新进度不代表旧站存档被删除。不要清除旧站网站数据。课堂展示仍建议准备Windows离线版。

## 五、下次更新与回退

把下一版解压到新的releases目录，核验后把current软链接指向新目录；不要先删除旧版。默认网页脚本用版本标记请求游戏资源，更新后可Ctrl+F5刷新。回退只需把current重新指向前版目录。

## 上线后需要记录的信息

真实HTTPS网址、托管平台与区域、网站版本、资源核验结果、学校网络实测日期。只有实际部署并验证后，才把新地址加入首页；不把示例域名或未经验证的镜像当作已上线入口。
