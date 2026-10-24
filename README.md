# 山海食肆物语 · 座位图层修复

[下载 Windows 修复版](https://github.com/huangzhoule24-sketch/-/raw/refs/heads/art-seatfix-v1.9.5-20261024/downloads/shanhai-v1.9.5-art-seatfix-windows.zip)

[下载完整源码及美术源图](https://github.com/huangzhoule24-sketch/-/raw/refs/heads/art-seatfix-v1.9.5-20261024/downloads/shanhai-v1.9.5-art-seatfix-source.zip)

全部解压后运行shanhai-v1.9.5-art-seatfix.exe，保留PCK/CustomAssets/licenses同级。兼容现有存档。源码使用Godot4.6.3导入project.godot。

修复人物偶尔被座位盖住：椅子单独在人物后方绘制，含缺图回退；桌子与人物按整像素脚底深度、固定同层优先级和稳定序号排序，避免微小到达偏移切换前后层。保留餐桌正常前后遮挡。

全部274张成品美术不变，原美术包可继续使用。新包已内置完整美术，不需另行导入。

4组514项检查通过；浏览器17次实际操作、3项检查、46次实时观察通过，覆盖自然到店、就座、服务与离座及手机横屏。具体范围与证据见docs/seat-layer-fix.md及其验证目录。Windows/手机实机另验。

源码指纹：1cc209cfb38273b063841287fe2f9aad212a95832b55e2734cebd20510cd2902
