# 自定义音频

把音频放进对应子目录，再在游戏「更多 → 系统与存档 → 声音设置与音频导入」中重新加载。也可以直接在该界面选槽位后导入，软件会自动命名。

例：`music/business_day.mp3` 为日常营业配乐。支持同名OGG Vorbis、MP3、WAV；外置资源优先于内置。路径和35个槽位详见程序附带的「音频接入说明.md」及「audio-resource-list.csv」，源码中为 `docs/audio-pipeline.md`、`config/audio.json`。

这里目前只有目录模板，没有正式音频。网页版请使用游戏内导入按钮，文件保存在当前浏览器站点存储。
