# 《山海食肆物语》完整英文版 · SH-EN-R2

本版基于 SH-CULTURE-R1，沿用 v1.9.5 的完整经营进程。欢迎页和“更多 → 系统与存档”均有 `中文` / `English` 按钮，可随时切换；浏览器刷新或桌面重启后保留偏好。原有存档继续使用，切换不改变资金、订单、员工属性或随机数状态。

英文覆盖开局与阶段教学、任务、菜单与研发、员工详情/排班/培训/解雇、装修条件和施工、事件及后续结果、顾客反馈、全部后期经营系统、财务账单和导出 CSV、设置与开发者资源导入。菜单名称采用统一译名，角色保留拼音名，搭配易懂的英文称谓。图片中的中文店招属于环境美术，文化读本保留中文姓名与典籍原文。

30 位员工、25 道菜、6 位来客的英文读本均可在相应文化入口阅读。中文文学叙述和 54 段原文未删改。英文原文节选逐段注明译者：

- 《诗经·墓门》第二章、《鸱鸮》第一章及第二章开头采用 Arthur Waley《The Book of Songs》的对应英文，共 83 词；保留其措辞，仅整理空格与换行。1937 为该书首次出版年，在线语料未标明具体印次。
- 《庄子·应帝王》的混沌寓言采用 Herbert A. Giles 的 1889 年译文。保留译者的 Hun Tun 等拼法；人物界面使用现代拼音 Hundun。译者插入的评注未作为古文正文混入。
- 其余 50 段重新校订为本项目英文译述，依据原有、已核对的中文节选，不冒署为现代学者译本。译文补足原段的山川、形貌、声音、行为与故事细节。古注与正文继续按原篇目区分。

四处已采用的出版译文下方有 `Translation source` 按钮，可主动打开查阅页；游戏无需联网翻译。研究来源、固定链接、下载哈希及引用范围见同包 `translation-sources.json`，或源码的 `docs/translation-research/english-r2-sources.json`。完整第三方书籍和语料缓存不随游戏分发。

Windows：完整解压，运行 `shanhai-v1.9.5-menu-r5.exe`，保留同目录 PCK、CustomAssets、CustomAudio 和 licenses。

Web：完整解压，在目录运行 `python serve.py`，打开 `http://127.0.0.1:8000/`。不能直接双击 HTML。存档属于当前浏览器的当前站点；保存后稍候再刷新。

可编辑工程：源码主包与美术母图包解压到同一文件夹，以 Godot 4.6.3 打开 project.godot。美术/音频文件和开发者替换路径均保留；当前SH-MUSIC-R4已加入柔和长笛背景音乐，独立开关与混音说明见Music-Guide.md或源码docs/music-r4/guide.md。

## English quick start

Select **English** on the welcome screen, or open **More → Settings & Saves** during a campaign. Select **中文** to return to Chinese. The preference is saved independently of campaign progress.

Start the full campaign and follow Baize's six opening steps. Keep ingredients stocked and assign both a cook and a server. Research and paid furnishing open at stage 1; membership and delivery at stage 2; branches, the central kitchen and expeditions at stage 3; awakening, the grand cooking contest and the local league at stage 4. Growth requires both revenue and reputation, followed by your confirmation.

**More → The Shanhai Road** brings together travellers' questions, shared meals and letters. **Companions** introduces their distinctive gifts. **Menu Notes** explains ingredients separately from mythic names. Cultural readings offer full English stories alongside the original Chinese excerpts. Published translations name their translators and provide a source button; other excerpts are credited to the Shanhai Inn project.

Daily Accounts separates profit from cash flow. Purchases become inventory until ingredients are used; borrowing is not revenue, and principal repayments are not expenses. CSV downloads follow your selected interface language and retain the original amounts.

Drag the restaurant with the left mouse button. Pause or choose a speed using the top bar. Management usually pauses service. Finish or cancel furnishing before leaving its workspace. Unavailable features explain their requirements. Original art and audio import folders remain available under Developer Options.

Run the Windows executable after extracting every file. For the Web build, run `python serve.py` and visit the local address above. Saves remain in your browser's storage; private browsing or clearing site data can remove them. The editable project requires Godot 4.6.3 and both source archives in the same folder.

## Music in SH-MUSIC-R4

Morning at the Inn now accompanies the complete game. Settings & Saves and Sound Settings both offer independent Music and Sound Effects & Ambience switches. Turning a channel off preserves its chosen volume; preferences survive a new campaign and a restart. Music continues across shared contexts and briefly softens for important alerts. Your existing custom audio overrides remain available.
