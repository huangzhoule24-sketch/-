# 山海食肆物语 · SH-MUSIC-R4 背景音乐与独立开关

[Windows 游戏](downloads/shanhai-v1.9.5-music-r4-windows.zip) · [Web 游戏](downloads/shanhai-v1.9.5-music-r4-web.zip) · [源码主包](downloads/shanhai-v1.9.5-music-r4-source.zip) · [全部美术母图](downloads/shanhai-v1.9.5-music-r4-art-masters.zip)

将本轮用户上传的《有间晨炊·柔和长笛版》加入完整中英游戏。裁去循环空白、轻度均衡并降低背景响度；重要提示音会短暂压低音乐，普通脚步不触发反复压低。欢迎、营业、夜间、探索、比赛共用当前曲目，切换场景持续播放；各音乐槽仍可通过CustomAudio独立替换。

系统设置及详细声音设置均有背景音乐、音效与环境声独立开关，关闭后保留音量，重新开局或重启保留偏好；总静音仍优先。旧档、全部经营与文化、美术、42个既有音效/环境声、完整英文及Windows课堂启动优化保留。音乐处理和测量在Music-Guide.md、music-track.json；原始MP3保存在源码art-source/audio。

Windows10/11 x64：全部解压到本地文件夹，双击Start-Game.cmd或shanhai-v1.9.5-music-r4.exe。PCK与EXE同目录，无需Godot/Python/管理员。较慢设备可用Start-Low-Power.cmd（30帧），图形问题可用Start-OpenGL-Fallback.cmd。设备型号未知，真实教室硬件仍需课前试开；Win7/8、32位和ARM不在本次原生包支持范围。

Web：全部解压，运行python serve.py，经HTTP访问。首次点击后浏览器允许播放声音。源码与美术母图同目录解压构成完整Godot4.6.3工程。所有下载均以SHA256清单核对；不覆盖旧发布，不推送开发历史。

Music and Sound Effects & Ambience can be toggled independently in Settings & Saves and Sound Settings. Preferences and volume levels persist. Music briefly softens for important alerts, and the shared recording continues across scenes. Extract every file before launching the Windows game.
