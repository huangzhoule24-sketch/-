# 山海食肆物语 · 音频接入准备版

包含完整美术、座位遮挡修复，以及本次音频开发准备。没有正式音乐或音效。

- [Windows运行包](downloads/shanhai-v1.9.5-audio-prep-windows.zip)
- [完整可编辑源码（含美术源图）](downloads/shanhai-v1.9.5-audio-prep-source.zip)

解压Windows运行包，运行 `shanhai-v1.9.5-audio-prep.exe`，保留同级PCK、CustomAssets、CustomAudio、licenses。

游戏内「更多→系统与存档→声音设置与音频导入」可选择槽位后导入OGG Vorbis、MP3、WAV，支持试听和音量保存。开发者也可把文件放到程序旁CustomAudio，再在游戏内重新加载。35槽清单及详细说明随包提供。源码使用Godot 4.6.3标准版。

46组回归通过；最终音频专项131项，界面33项、导航248项复测通过。Chromium实际操作49条记录、11项检查、0错误，含三种格式导入、试听、刷新持久化及横屏返回。Windows本机音频硬件及手机实机尚未验收。测试声未随包发布。

此下载分支为独立发布快照，只含两份ZIP、校验文件及本说明，不含源码开发历史。
