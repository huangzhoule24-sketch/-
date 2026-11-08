# 税吏独立形象版

SH-WEB-LEGAL-R2 / SH-SOURCE-LEGAL-R2，基于主店法务合并版R1，使用Godot4.6.3。

税吏采用独立像素形象：黑色官帽、靛蓝长袍、赭红外衫、绿色账册和竹筹。主店的两种绘制路径共用同一资源；帽子、脸、账册和衣袍都在点击范围内，屏幕横向触点至少44像素。点击仍进入原行政面板。

资源文件为`assets/art/Characters/tax_officer_idle.png`，图像生成原文件原样保留，以AtlasTexture取景并等比显示。`config/npc_art.json`保存取景、脚锚和高度；`scripts/ui/tax_officer_art.gd`负责共用显示。可通过统一美术接口以`CustomAssets/Characters/tax_officer_idle.png`替换；外置图片按实际可见范围适配，不套用内置母图坐标。

本轮经营规则沿用R1，法务范围仍限定主店。原有电脑/手机路由、竖屏、缩放、音乐、跨国场景、招聘、顾客坐姿和存档继续保留。当前是驻点NPC站姿，未声称制作整套行走或职业动画。

完整网页包：本地Windows双击Start-Web.cmd（需Python3），或`python prepare-site.py --launch`。静态部署先`python prepare-site.py`，发布生成site内部内容。更新原WorkBuddy应用按包内《给WorkBuddy的更新指令.txt》执行，沿用原应用与域名。

源码包包含全部当前运行资源，用Godot4.6.3导入project.godot。源码不是可直接部署的静态网站。旧法务规则详见docs/legal-merge-r1.md。
