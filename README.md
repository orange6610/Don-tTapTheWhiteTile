## 核心思路：
**定义一个元素作为块的容器，通过容器的偏移量变化来模拟块的移动。**
1. 初始化的时候，容器向上偏移一定的高度（一个块的高度），并不断移动。
2. 向容器中添加块，每次添加一行，一行4个，其中一个随机变为黑色块。
3. 当添加到一定行数（容器铺满），判断最前的一行是否通过，通过则移除并添加新行，不通过则游戏结束。

