impress.js
============

It's a presentation framework based on the power of CSS3 transforms and 
transitions in modern browsers and forked from [impress.js](https://github.com/bartaz/impress.js). I added some amazing features, including sharing, remote control and notes.

这是一个基于现代浏览器CSS3动画效果的演示框架，从 [impress.js](https://github.com/bartaz/impress.js) fork而来。我添加了一些令人惊奇的功能，包括共享播放、远程控制和备注。

**WARNING**

You need to know about [impress.js](https://github.com/bartaz/impress.js). Then we talk about the new features that I added.

你需要先了解[impress.js](https://github.com/bartaz/impress.js)，然后再来看我添加的新功能。


HOW TO RUN IT
---------------

You need to install Node.js and socket.io module. If not, only notes feature is still available. You can run it with:

    node server.js

你需要安装Node.js和socket.io模块。不安装的话还剩下备注功能能够使用。运行的时候使用命令

    node server.js

SHARING
---------

Press 'q' from keyboard. Then a QR code is appeared. If the audiences have devices in the same network with your pc. Scan it and open link, the presentation will be provided to the audiences. Press 'q' again, the QR code will disappeared.

按'q'键，将会出现二维码。如果听众的设备和你的电脑在同一个网络内，那么他们扫描并打开链接，就能够看到演示。再次按'q'，二维码将消失。

REMOTE CONTROL
----------------
When Node.js server is running, control infomation will be shown in console, such as:

    Control device open http://192.168.10.115:8000/control.html?qwert

Open this link in you cell phone, you can touch 'prev', 'next' or 'home' button to control the presentation. The presentation provided on devices of the audiences via sharing will be controled at the same time.

当Node.js服务器运行的时候, 控制信息将会显示在控制台上，例如:

    Control device open http://192.168.10.115:8000/control.html?qwert

在你的手机上打开这个链接，就能够通过点击'prev'，'next'或者'home'来控制演示。用户通过sharing功能看到的演示也同时被控制。

NOTES
-------
Press 's' to open notes window. Notes window will show time, current slide with notes and upcoming slides. You can add notes in each slice with tag aside and class 'notes'. This feature is ported form [reveal.js](https://github.com/hakimel/reveal.js), which is another powerful presentation framework.

按's'键能够打开备注窗口。备注窗口将会显示时间、当前演示页和备注，以及下一个演示页。在每个演示页中添加带有'notes'类的aside标签，就能够添加备注。这个功能移植自[reveal.js](https://github.com/hakimel/reveal.js)，是另外一个非常强大的演示工具。


LICENSE
---------

Copyright 2011-2012 Bartek Szopka

Released under the MIT and GPL (version 2 or later) Licenses.


