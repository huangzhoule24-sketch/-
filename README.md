# 山海食肆物语 · SH-STARTUP-R3 启动优化与Windows课堂版

[Windows 下载](downloads/shanhai-v1.9.5-startup-r3-windows.zip) · [Web 下载](downloads/shanhai-v1.9.5-startup-r3-web.zip) · [源码主包](downloads/shanhai-v1.9.5-startup-r3-source.zip) · [全部美术母图](downloads/shanhai-v1.9.5-startup-r3-art-masters.zip)

基于完整中英切换版SH-EN-R2优化启动。保留阶段0–4、全部30员工/25道菜的文化读本/6位来客、61篇文化简介、54段古文、274PNG、42音频、经营系统、旧档和开发者资源入口；独立配乐未导入。

Windows 10/11 x64：完整解压到本地文件夹后运行Start-Game.cmd，或直接运行shanhai-v1.9.5-startup-r3.exe。无需Godot、Python或管理员权限，EXE与PCK必须在同目录。较慢设备用Start-Low-Power.cmd（30帧），图形问题用Start-OpenGL-Fallback.cmd。不要直接在ZIP中启动，不要只拷贝EXE。课堂操作、日志和限制见Windows-Classroom-Guide.txt。

启动先显示加载画面；常规游玩不再为开发者热重载建立全图校验快照，打包只读资源不做文件系统符号链接探测，依赖提前解析；保留所有外置文件安全校验和开发者热重载功能。Windows采用Direct3D11 ANGLE并保留OpenGL备用，窗口适应屏幕可用区域。

同机Linux各5进程基准和验证详见源码docs/startup-performance-validation.md；初始化减幅不代表整个启动时间减幅。54组功能回归及4701项英文专项通过。Windows EXE在Wine兼容环境中实际启动OpenGL、切换语言和进入教学，1024×768窗口适配正常；Wine ANGLE受其着色器编译器限制，不能当作真实Windows课堂硬件已验收。设备型号未知，请课前在一体机试开。Windows7/8、32位和ARM不在本次原生包支持承诺范围。

Web：解压后运行python serve.py，以HTTP访问，不能直接双击HTML。源码主包和美术母图同目录解压，以Godot4.6.3打开project.godot，可恢复完整可编辑工程。欢迎页及系统页可切换中文/English，保留古文中文和署名英译。

This is the complete bilingual game with startup improvements. On 64-bit Windows 10/11, extract every file and use Start-Game.cmd. A 30-fps low-power launcher and a native OpenGL fallback are included. Classroom hardware still needs a pre-class check.

此独立根提交仅含四个ZIP、README、SHA与清单，不覆盖旧发布，不包含开发历史。
