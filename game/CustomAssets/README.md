# 自定义图片目录模板

把本目录放在桌面版游戏可执行文件旁。开发版直接使用项目中的本目录。

这里仅提供目录约定和清单示例，没有正式美术或额外角色。请使用项目已有员工、菜品 ID 命名：

```
CustomAssets/
  manifest.json
  Backgrounds/restaurant.png
  Characters/qianyang_idle_0.png
  Characters/qianyang_idle_1.png
  Characters/qianyang_cook_0.png
  Characters/qianyang_lore.png
  UI/btn_employee.png
  Dishes/noodles.png
  Dishes/noodles_lore.png
```

只提供一张角色图时，可以命名为 `Characters/qianyang_idle.png`。这只替换待机动画的第 0 帧，其余内置帧继续保留；编号图 `_0.png` 优先于无编号图。

支持 PNG、JPG/JPEG；不加载 GIF、SVG、脚本或 Godot 资源文件。缺图或损坏图片会回退内置资源，再回退中性占位。开发者模式每秒检查修改时间和文件大小；手动点“重新载入”可立即更新。网页版本请通过游戏的图片导入入口写入浏览器保存区，不能直接扫描电脑目录。

完整命名、路径、接口、稀有度配置与导出注意事项见项目 `docs/art-pipeline.md`。

## 文化简介专图

员工文化简介使用 `Characters/<员工ID>_lore.png`，菜品文化简介使用 `Dishes/<菜品ID>_lore.png`。这里的专图与工作动画、普通菜单图独立，可只替换简介里的展示图片。支持 `.jpg` / `.jpeg`；同一专图同时存在 PNG 与 JPG 时优先 PNG。

`manifest.json` 中的 `culture_slots` 列出全部50个固定槽位：26位员工、23道标准菜和隐藏菜白泽万象宴（`baize_hidden_banquet`）。每项记录分类、ID、显示名、无扩展名资源 ID 与建议 PNG 路径。该表是接图清单，不会在没有图片时生成素材，也不会执行外部代码。

没有专图时，简介先使用已有员工待机图或菜图；没有任何图时显示占位提示，正文仍可阅读。专图损坏时先尝试内置同名专图，再按上述顺序回退。网页可在“美术资源”中选择文化专图槽位后导入，图片保存在该浏览器站点的保存区。

特殊顾客（v1.7.1）：Characters/guest_<ID>_lore.png 与 guest_<ID>_idle.png。ID：old_gourmand、baize_friend、lost_cub、picky_blogger、grateful_monster、kunlun_spy。12个新槽可在游戏开发者导入界面选择，缺图显示占位。
