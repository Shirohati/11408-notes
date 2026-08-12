// 408 全量知识点目录 - 数据结构
const ds = {
  id: 'ds',
  name: '数据结构',
  shortName: '数据结构',
  color: '#4A90D9',
  chapters: [
    {
      id: 'ds_intro',
      name: '绪论',
      points: [
        { id: 'ds_complexity', name: '算法的时间复杂度和空间复杂度', summary: ['算法特性：有穷性、确定性、可行性、输入、输出', '时间复杂度：执行时间随问题规模n的增长趋势，用大O表示', '常见复杂度：O(1) < O(log2n) < O(n) < O(nlog2n) < O(n^2)', '空间复杂度：算法运行所需辅助空间随n的变化趋势', '分析循环执行次数可得时间复杂度，递归深度决定空间复杂度'], mnemonic: '看循环数复杂度，大O记号比增长' },
      ]
    },
    {
      id: 'ds_linear_list',
      name: '线性表',
      points: [
        { id: 'ds_ll_definition', name: '线性表的定义和基本操作', summary: ['线性表是n个相同类型数据元素的有限序列', '基本操作：初始化、销毁、插入、删除、查找、求长度'], mnemonic: '相同类型排成队，插入删除要定位' },
        { id: 'ds_ll_sequential', name: '线性表的顺序存储', summary: ['用连续内存单元依次存储线性表元素', '随机存取，时间复杂度O(1)', '插入和删除平均移动n/2个元素'], mnemonic: '顺序表里存得齐，随机存取O1，插入删除要挪移' },
        { id: 'ds_ll_linked', name: '线性表的链式存储', summary: ['用一组任意存储单元存储线性表元素', '每个结点包含数据域和指针域', '顺序存取，插入删除只需修改指针'], mnemonic: '链表节点散着放，指针牵着走四方' },
        { id: 'ds_ll_double_circular', name: '双链表和循环链表', summary: ['双链表：每个结点有前驱和后继两个指针', '循环链表：表尾指针指向头结点', '双链表删除结点时间复杂度O(1)'], mnemonic: '双链前后都指路，循环首尾连成环' },
        { id: 'ds_ll_comparison', name: '顺序表与链表的比较', summary: ['顺序表：随机存取、空间连续、插入删除慢', '链表：顺序存取、空间分散、插入删除快', '顺序表适用于查找多，链表适用于插入删除多'], mnemonic: '顺序靠位置，链表靠指针；查找用顺序，增删用链表' },
      ]
    },
    {
      id: 'ds_stack_queue',
      name: '栈、队列和数组',
      points: [
        { id: 'ds_sq_stack', name: '栈的基本概念', summary: ['栈是只允许在一端进行插入和删除的线性表', '后进先出(LIFO)', '栈顶：允许操作的一端；栈底：固定一端'], mnemonic: '后进先出是栈，就像一摞盘子' },
        { id: 'ds_sq_stack_app', name: '栈的应用', summary: ['括号匹配：遇到左括号入栈，右括号出栈匹配', '表达式求值：中缀转后缀，后缀表达式求值', '函数调用递归：系统栈保存返回地址和局部变量'], mnemonic: '括号配对栈帮忙，表达式求值转后缀' },
        { id: 'ds_sq_queue', name: '队列的基本概念', summary: ['队列只允许一端插入、另一端删除', '先进先出(FIFO)', '队头：删除端；队尾：插入端'], mnemonic: '先进先出是队列，就像排队买东西' },
        { id: 'ds_sq_circular', name: '循环队列', summary: ['用数组模拟循环结构解决假溢出问题', '队空条件：front == rear', '队满条件：(rear+1)%MaxSize == front', '入队：rear = (rear+1)%MaxSize', '出队：front = (front+1)%MaxSize'], mnemonic: '循环队列头尾追，空头等满尾差一' },
        { id: 'ds_sq_matrix', name: '特殊矩阵的压缩存储', summary: ['对称矩阵：只存上三角或下三角，n(n+1)/2个元素', '三角矩阵：类似对称矩阵', '三对角矩阵：只存三条对角线', '稀疏矩阵：三元组或十字链表存储'], mnemonic: '对称三角存一半，稀疏三元组来算' },
      ]
    },
    {
      id: 'ds_tree',
      name: '树与二叉树',
      points: [
        { id: 'ds_tree_basic', name: '二叉树的基本概念和性质', summary: ['二叉树每个结点最多有两个子树', '第i层最多2^(i-1)个结点', '深度为h的二叉树最多2^h-1个结点', '叶子数n0 = 度为2的结点数n2 + 1'], mnemonic: '二叉树最多两个杈，叶子等于二度加一' },
        { id: 'ds_tree_traversal', name: '二叉树的遍历', summary: ['先序遍历：根左右', '中序遍历：左根右', '后序遍历：左右根', '层序遍历：从上到下从左到右'], mnemonic: '先根后左右，中左根右，后左右根' },
        { id: 'ds_tree_threaded', name: '线索二叉树', summary: ['利用空指针域指向前驱和后继', '先序线索、中序线索、后序线索', 'ltag/rtag为0表示孩子指针，为1表示线索'], mnemonic: '空指针改线索，遍历不用递归做' },
        { id: 'ds_tree_huffman', name: '哈夫曼树和哈夫曼编码', summary: ['带权路径长度WPL最小的二叉树', '构造：每次选两个最小权值合并', '哈夫曼编码：前缀编码，左0右1', '哈夫曼树只有度为0和2的结点'], mnemonic: '权值最小往上合，左零右一得编码' },
        { id: 'ds_tree_forest', name: '树、森林与二叉树的转换', summary: ['孩子兄弟表示法：左孩子右兄弟', '树转二叉树：兄弟连起来，只留左孩子', '森林转二叉树：每棵树转二叉树，根相连'], mnemonic: '左孩子右兄弟，兄弟连线砍右枝' },
        { id: 'ds_tree_unionfind', name: '并查集', summary: ['不相交集合的合并和查找', 'Find：找根结点', 'Union：合并两个集合', '优化：路径压缩、按秩合并'], mnemonic: '并查集找根结点，路径压缩提速显' },
      ]
    },
    {
      id: 'ds_graph',
      name: '图',
      points: [
        { id: 'ds_graph_basic', name: '图的基本概念', summary: ['图由顶点集和边集构成', '有向图vs无向图', '完全图：任意两顶点之间都有边', '连通图：任意两顶点连通', '生成树：连通图的极小连通子图'], mnemonic: '无向边有向弧，连通分量找孤独' },
        { id: 'ds_graph_storage', name: '图的存储', summary: ['邻接矩阵：n×n矩阵，适合稠密图', '邻接表：顶点表+边链表，适合稀疏图', '十字链表：有向图专用', '邻接多重表：无向图专用'], mnemonic: '矩阵存稠密，链表存稀疏' },
        { id: 'ds_graph_bfs', name: '广度优先搜索(BFS)', summary: ['类似于树的层序遍历，用队列实现', '时间复杂度：邻接表O(V+E)，邻接矩阵O(V²)', '可求解单源最短路径(无权图)'], mnemonic: 'BFS队列排排站，一层一层向外探' },
        { id: 'ds_graph_dfs', name: '深度优先搜索(DFS)', summary: ['类似于树的先序遍历，用栈(递归)实现', '时间复杂度同BFS', '生成深度优先生成树/森林'], mnemonic: 'DFS递归走到底，不行就退换条路' },
        { id: 'ds_graph_mst', name: '最小生成树', summary: ['Prim算法：从顶点出发，每次选最短边连接新顶点，O(V²)', 'Kruskal算法：选最短不构成回路的边，O(ElogE)'], mnemonic: 'Prim点出发选近邻，Kruskal选边怕回路' },
        { id: 'ds_graph_shortest', name: '最短路径', summary: ['Dijkstra：单源最短路径，不能处理负权边，O(V²)', 'Floyd：每对顶点间最短路径，动态规划，O(V³)'], mnemonic: 'Dijkstra加点扩展，Floyd二维矩阵更新' },
        { id: 'ds_graph_topological', name: '拓扑排序', summary: ['有向无环图(DAG)的线性排序', '每次选一个入度为0的顶点输出并删除', '可用于检测图中是否有环'], mnemonic: '拓扑入度为零先输出，有环就排不出来' },
        { id: 'ds_graph_critical', name: '关键路径', summary: ['AOE网中从源点到汇点的最长路径', 've：事件最早发生时间(取max)', 'vl：事件最迟发生时间(取min)', '关键路径上的活动时间不能延误'], mnemonic: '最早从前向后推最大，最迟从后向前推最小' },
      ]
    },
    {
      id: 'ds_search',
      name: '查找',
      points: [
        { id: 'ds_search_seq_bin', name: '顺序查找和折半查找', summary: ['顺序查找：从头到尾，平均O(n)', '折半查找：有序表，每次减半，O(log n)', '折半查找要求顺序存储且有序'], mnemonic: '顺序从头找到尾，折半每次砍一半' },
        { id: 'ds_search_btree', name: 'B树和B+树', summary: ['B树：多路平衡查找树，所有叶子在同一层', 'B树的阶m：每个结点最多m棵子树、m-1个关键字', 'B+树：叶子结点包含所有关键字，叶结点间有链表连接'], mnemonic: 'B树多路又平衡，B+叶子串成链' },
        { id: 'ds_search_hash', name: '散列表', summary: ['散列函数：直接定址法、除留余数法、数字分析法', '冲突处理：开放定址法(线性探测、平方探测)、拉链法', '装填因子α = 表中记录数 / 散列表长度', '平均查找长度与α有关'], mnemonic: '散列函数算地址，冲突拉链或重试' },
      ]
    },
    {
      id: 'ds_sort',
      name: '排序',
      points: [
        { id: 'ds_sort_insert', name: '插入排序', summary: ['直接插入排序：O(n²)，稳定', '折半插入排序：O(n²)，但减少了比较次数', '希尔排序：O(n^1.3)～O(n²)，不稳定'], mnemonic: '插入扑克牌，一张一张往里塞' },
        { id: 'ds_sort_swap', name: '交换排序', summary: ['冒泡排序：O(n²)，稳定', '快速排序：O(nlog n)，不稳定', '快排每次确定一个轴值的位置'], mnemonic: '冒泡两两来交换，快排一次定轴位' },
        { id: 'ds_sort_select', name: '选择排序', summary: ['简单选择排序：O(n²)，不稳定', '堆排序：O(nlog n)，不稳定', '建堆O(n)，每次调整O(log n)'], mnemonic: '选择每次挑最小，堆排大根向上堆' },
        { id: 'ds_sort_merge', name: '归并排序和基数排序', summary: ['归并排序：O(nlog n)，稳定，空间O(n)', '基数排序：O(d(n+r))，稳定，d为位数，r为基数'], mnemonic: '归并分治再合并，基数按位来排序' },
      ]
    },
  ]
}

// 408 全量知识点目录 - 计算机组成原理
const co = {
  id: 'co',
  name: '计算机组成原理',
  shortName: '计组',
  color: '#E67E22',
  chapters: [
    {
      id: 'co_intro',
      name: '计算机系统概述',
      points: [
        { id: 'co_intro_history', name: '计算机发展历程', summary: ['电子管→晶体管→集成电路→大规模集成电路', '摩尔定律：芯片集成度每18个月翻一番'], mnemonic: '管管集集，摩尔翻倍' },
        { id: 'co_intro_structure', name: '计算机系统层次结构', summary: ['应用→高级语言→汇编→操作系统→指令集→微体系结构', '冯诺依曼结构：输入、输出、存储器、运算器、控制器', '现代计算机：以存储器为中心'], mnemonic: '冯氏五部件：存算控输入输出' },
        { id: 'co_intro_perf', name: '计算机性能指标', summary: ['吞吐量：单位时间内处理的任务数', 'CPI：执行一条指令所需的时钟周期数', 'MIPS = 主频/(CPI×10⁶)', 'FLOPS：每秒浮点运算次数'], mnemonic: 'CPI越小越快，MIPS越大越快' },
      ]
    },
    {
      id: 'co_data',
      name: '数据的表示和运算',
      points: [
        { id: 'co_data_radix', name: '数制与编码', summary: ['二进制、八进制、十进制、十六进制转换', 'BCD码、ASCII码、汉字编码', '校验码：奇偶校验、CRC、海明码'], mnemonic: '进制转换按权展开，BCD四位表示一位' },
        { id: 'co_data_fixed', name: '定点数的表示和运算', summary: ['原码：符号位+数值绝对值', '反码：负数除符号位外取反', '补码：负数反码+1，0的表示唯一', '加减法：补码统一加减，符号位参与运算'], mnemonic: '原码照搬，反码取反，补码加一' },
        { id: 'co_data_float', name: '浮点数的表示和运算', summary: ['IEEE 754格式：1位符号+8/11位阶码+23/52位尾数', '阶码用移码表示，尾数用原码表示', '浮点加减：对阶→尾数运算→规格化→舍入→判溢出'], mnemonic: 'IEEE754三部分：符号阶码和尾数' },
        { id: 'co_data_alu', name: '算术逻辑单元ALU', summary: ['ALU是CPU中执行算术和逻辑运算的部件', '核心：加法器(全加器串行/并行)', '先行进位加法器减少进位延迟'], mnemonic: 'ALU算逻辑全靠加法器' },
      ]
    },
    {
      id: 'co_memory',
      name: '存储系统',
      points: [
        { id: 'co_mem_hierarchy', name: '存储器层次结构', summary: ['Cache→主存→辅存（速度递减，容量递增）', 'SRAM：高速，用作Cache', 'DRAM：集成度高，用作主存', 'ROM：只读存储器，BIOS'], mnemonic: 'Cach主存辅存三级，SRAM快DRAM大' },
        { id: 'co_mem_main', name: '主存储器', summary: ['DRAM需要刷新（集中、分散、异步刷新）', '存储芯片扩展：位扩展、字扩展', '多体并行存储器：高位/低位交叉编址'], mnemonic: 'DRAM要刷新，扩展位和字' },
        { id: 'co_mem_cache', name: 'Cache', summary: ['Cache基于程序局部性原理', '映射方式：直接映射、全相联、组相联', '替换算法：LRU、FIFO、随机', '写策略：写直达(Write Through)、写回(Write Back)'], mnemonic: 'Cache映射有三种，直接全联组相联' },
        { id: 'co_mem_virtual', name: '虚拟存储器', summary: ['页式虚拟存储器：固定大小页，页表映射', '段式虚拟存储器：可变大小段', 'TLB(快表)：Cache中存放页表项'], mnemonic: '页式固定段可变，TLB加速地址转' },
      ]
    },
    {
      id: 'co_isa',
      name: '指令系统',
      points: [
        { id: 'co_isa_format', name: '指令格式', summary: ['指令 = 操作码 + 地址码', '定长指令字 vs 变长指令字', '操作码扩展技术'], mnemonic: '指令操作码加地址，定长变长看设计' },
        { id: 'co_isa_addressing', name: '寻址方式', summary: ['立即寻址：操作数在指令中', '直接寻址：操作数地址在指令中', '寄存器寻址：操作数在寄存器中', '间接寻址：指令给出地址的地址', '变址寻址：基址+偏移量'], mnemonic: '立即数直地址，寄存在里变基加' },
        { id: 'co_isa_cisc_risc', name: 'CISC和RISC', summary: ['CISC：指令多、变长、微程序控制', 'RISC：指令少、定长、硬布线控制', 'RISC特点：Load/Store架构，寄存器多'], mnemonic: 'CISC复杂RISC简，Load/Store是特点' },
      ]
    },
    {
      id: 'co_cpu',
      name: '中央处理器',
      points: [
        { id: 'co_cpu_structure', name: 'CPU的功能和结构', summary: ['CPU = 运算器 + 控制器', '运算器：ALU、通用寄存器、累加器', '控制器：PC、IR、ID、控制存储器'], mnemonic: 'CPU运控两部件，PC指向IR译码' },
        { id: 'co_cpu_datapath', name: '数据通路', summary: ['数据在功能部件之间传送的路径', '单总线结构：一条总线连接所有部件', '专用通路结构：多个独立数据通路'], mnemonic: '数据通路连部件，单总线还是专用' },
        { id: 'co_cpu_control', name: '控制器', summary: ['硬布线控制器：速度块，设计复杂', '微程序控制器：速度慢，设计规整', '微指令 = 操作控制 + 顺序控制'], mnemonic: '硬布线快难设计，微程序慢但灵活' },
        { id: 'co_cpu_pipeline', name: '指令流水线', summary: ['流水线将指令分阶段并行执行', '冒险：结构冒险(资源冲突)、数据冒险(数据相关)、控制冒险(分支)', '解决：暂停、转发、分支预测'], mnemonic: '流水线分段并行跑，冒险暂停转发猜' },
      ]
    },
    {
      id: 'co_bus',
      name: '总线',
      points: [
        { id: 'co_bus_basic', name: '总线概述', summary: ['总线是各部件之间信息传输的公共通路', '系统总线：数据总线、地址总线、控制总线', '总线特性：机械、电气、功能、时间'], mnemonic: '总线分三类：数据地址和控制' },
        { id: 'co_bus_arbitration', name: '总线仲裁', summary: ['集中式仲裁：链式查询、计数器查询、独立请求', '分布式仲裁：每个设备有仲裁号'], mnemonic: '集中仲裁三种法，链式计数独立请' },
        { id: 'co_bus_timing', name: '总线操作和定时', summary: ['同步定时：统一时钟，速度快但灵活性差', '异步定时：应答方式，灵活但速度慢'], mnemonic: '同步统一时钟跑，异步应答握手牢' },
      ]
    },
    {
      id: 'co_io',
      name: '输入/输出系统',
      points: [
        { id: 'co_io_interface', name: 'I/O接口', summary: ['I/O接口是主机和外设之间的桥梁', '功能：数据缓冲、状态查询、格式转换', 'I/O端口：数据端口、状态端口、控制端口'], mnemonic: 'I/O接口做缓冲，数据状态和控制' },
        { id: 'co_io_interrupt', name: '中断方式', summary: ['中断：CPU暂停当前程序转去处理I/O', '中断响应：关中断→保护断点→转中断服务', '中断屏蔽：实现中断优先级控制', '多重中断：高优先级可打断低优先级'], mnemonic: '中断来暂停当前，保护断点再服务' },
        { id: 'co_io_dma', name: 'DMA方式', summary: ['DMA直接内存访问，不需要CPU干预', 'DMA控制器控制数据传输', 'DMA与CPU竞争总线（周期窃取）'], mnemonic: 'DMA偷总线，批量传数据' },
      ]
    },
  ]
}

// 408 全量知识点目录 - 操作系统
const os = {
  id: 'os',
  name: '操作系统',
  shortName: '操作系统',
  color: '#27AE60',
  chapters: [
    {
      id: 'os_intro',
      name: '操作系统概述',
      points: [
        { id: 'os_intro_concept', name: 'OS的基本概念', summary: ['操作系统是管理资源和提供服务的软件', '四大特征：并发、共享、虚拟、异步', '五大功能：处理机、内存、设备、文件管理 + 用户接口'], mnemonic: '并共虚异四大征，处内设文加接口' },
        { id: 'os_intro_status', name: '操作系统运行环境', summary: ['核心态(管态)：执行特权指令', '用户态(目态)：执行非特权指令', '中断和异常是切换状态的唯一途径', '系统调用：用户请求OS服务的接口'], mnemonic: '核心管态用户目，中断切态系统调' },
      ]
    },
    {
      id: 'os_process',
      name: '进程管理',
      points: [
        { id: 'os_process_state', name: '进程的概念与状态转换', summary: ['进程是程序的一次执行过程', '三状态：就绪→运行→阻塞', 'PCB(进程控制块)是进程存在的唯一标志'], mnemonic: '就绪运行和阻塞，PCB是进程身份证' },
        { id: 'os_process_schedule', name: '处理机调度', summary: ['高级调度(作业调度)：外存→内存', '中级调度(交换调度)：挂起/激活', '低级调度(进程调度)：就绪→运行'], mnemonic: '高调作业进内存，低调整进程上CPU' },
        { id: 'os_process_algorithm', name: '调度算法', summary: ['FCFS：先来先服务，公平但短作业吃亏', 'SJF：最短作业优先，平均等待时间最小', '优先级调度：抢占/非抢占', 'RR：时间片轮转，响应快', '多级队列：不同队列不同算法'], mnemonic: 'FCFS公平SJF快，RR轮转响应快' },
        { id: 'os_process_sync', name: '进程同步与互斥', summary: ['临界资源：一次只允许一个进程使用', '同步：进程之间合作制约', '互斥：临界区排他访问', '信号量机制：P/V操作', '经典问题：生产者-消费者、读者-写者、哲学家进餐'], mnemonic: '互斥同进临界区，信号量P/V来解决' },
        { id: 'os_process_deadlock', name: '死锁', summary: ['死锁四条件：互斥、请求保持、不可剥夺、循环等待', '死锁预防：破坏四个条件之一', '死锁避免：银行家算法', '死锁检测：资源分配图'], mnemonic: '互斥请保不可剥，循环四条件缺一不可' },
      ]
    },
    {
      id: 'os_memory',
      name: '内存管理',
      points: [
        { id: 'os_mem_contiguous', name: '连续分配管理', summary: ['单一连续分配：一用户独占', '固定分区分配：分区大小固定', '动态分区分配：分区大小可变', '动态分区算法：首次适应、最佳适应、最差适应'], mnemonic: '连续分配有分区，动态分配看算法' },
        { id: 'os_mem_paging', name: '分页存储管理', summary: ['逻辑地址=页号+页内偏移', '物理地址=块号+页内偏移', '页表实现逻辑页号到物理块号的映射', 'TLB(快表)加速地址转换'], mnemonic: '分页等分页，页表来映射' },
        { id: 'os_mem_segmentation', name: '分段和段页式管理', summary: ['分段：按程序逻辑分段，段长可变', '段表：段号→基址+段长', '段页式：先分段再分页，段表指向页表'], mnemonic: '分段看逻辑，页式看大小，段页结合用' },
        { id: 'os_mem_virtual', name: '虚拟内存管理', summary: ['虚拟内存：部分装入即可运行', '请求分页：按需调页，缺页中断', '页面置换算法：OPT(最佳)、FIFO(先进先出)、LRU(最近最久未用)、CLOCK(时钟)'], mnemonic: '虚拟内存按需调，缺页中断来换入' },
        { id: 'os_mem_thrashing', name: '页面分配和抖动', summary: ['驻留集：进程驻留在内存中的页面集合', '抖动(thrashing)：缺页频繁，CPU利用率下降', '工作集：当前活跃的页面集合'], mnemonic: '抖动就是频繁缺页，工作集大小要合适' },
      ]
    },
    {
      id: 'os_file',
      name: '文件管理',
      points: [
        { id: 'os_file_basic', name: '文件系统基础', summary: ['文件：有名称的一组相关信息的集合', '文件属性：名称、类型、大小、保护信息', '文件逻辑结构：顺序文件、索引文件、索引顺序文件'], mnemonic: '文件命名有属性，逻辑结构分顺序索引' },
        { id: 'os_file_directory', name: '目录', summary: ['目录结构：单级、两级、树形、无环图', 'FCB(文件控制块)：包含文件信息', '索引节点(inode)：Unix/Linux中FCB的改进'], mnemonic: '树形目录最常用，FCB记录文件信息' },
        { id: 'os_file_impl', name: '文件系统实现', summary: ['文件存储空间管理：空闲表、空闲链表、位示图', '文件分配方式：连续、链接、索引', '混合索引：Unix中直接+间接索引'], mnemonic: '空闲管理表链图，文件分配连链索' },
      ]
    },
    {
      id: 'os_io',
      name: '输入/输出(I/O)管理',
      points: [
        { id: 'os_io_control', name: 'I/O控制方式', summary: ['程序直接控制：CPU忙等', '中断驱动：CPU不再忙等', 'DMA方式：批量数据传输'], mnemonic: '程序查询占CPU，中断DMA解放CPU' },
        { id: 'os_io_buffer', name: '缓冲与SPOOLing', summary: ['缓冲：解决CPU与I/O设备速度不匹配', '单缓冲、双缓冲、循环缓冲', 'SPOOLing：用磁盘模拟独占设备为共享'], mnemonic: 'SPOOLing把独占变共享，虚拟设备技术' },
        { id: 'os_io_disk', name: '磁盘管理', summary: ['磁盘结构：磁头、磁道、扇区、柱面', '调度算法：FCFS、SSTF(最短寻道)、SCAN(电梯)、C-SCAN'], mnemonic: '磁盘调度电梯好，SSTF找最近' },
      ]
    },
  ]
}

// 408 全量知识点目录 - 计算机网络
const cn = {
  id: 'cn',
  name: '计算机网络',
  shortName: '计网',
  color: '#9B59B6',
  chapters: [
    {
      id: 'cn_arch',
      name: '计算机网络体系结构',
      points: [
        { id: 'cn_arch_basic', name: '计算机网络概述', summary: ['计算机网络 = 通信 + 计算机', '三种交换：电路交换、报文交换、分组交换', '性能指标：带宽、时延、RTT、吞吐量'], mnemonic: '电文分组三种换，带宽时延看性能' },
        { id: 'cn_arch_model', name: 'OSI和TCP/IP参考模型', summary: ['OSI七层：物链网传会话表应', 'TCP/IP四层：网际+传输+应用 (网络接口)', '五层模型（考研常用）：物链网传应'], mnemonic: 'OSI七层物链网传会话表应，TCP/IP四层网传应' },
      ]
    },
    {
      id: 'cn_physical',
      name: '物理层',
      points: [
        { id: 'cn_physical_comm', name: '通信基础', summary: ['奈奎斯特定理：无噪声最大数据率=2Wlog₂V', '香农定理：有噪声最大数据率=Wlog₂(1+S/N)', '信噪比(dB)=10log₁₀(S/N)'], mnemonic: '奈奎斯特无噪声，香农定理有噪声' },
        { id: 'cn_physical_media', name: '传输介质和物理层设备', summary: ['双绞线、同轴电缆、光纤、无线', '中继器：放大信号，延长传输距离', '集线器：多端口的中继器'], mnemonic: '中继放大集线器，光纤传输最远' },
      ]
    },
    {
      id: 'cn_datalink',
      name: '数据链路层',
      points: [
        { id: 'cn_dl_error', name: '差错控制', summary: ['CRC循环冗余检验：用模2除法求余数', '海明码：可检错和纠错，冗余位r满足2^r≥k+r+1'], mnemonic: 'CRC除余数，海明码纠错' },
        { id: 'cn_dl_flow', name: '流量控制和可靠传输', summary: ['停等协议：发一帧等一确认', '后退N帧(GBN)：连续发送，超时重传所有', '选择重传(SR)：只重传出错的帧'], mnemonic: '停等一帧一等，GBN退N帧重传' },
        { id: 'cn_dl_mac', name: '介质访问控制', summary: ['ALOHA：想发就发，冲突重发', 'CSMA：先听后发', 'CSMA/CD：边听边发，冲突停发', 'CSMA/CA：无线网中的碰撞避免'], mnemonic: 'CSMA/CD有线监听发，CSMA/CA无线避冲突' },
        { id: 'cn_dl_lan', name: '局域网和以太网', summary: ['以太网MAC地址：48位', '以太网帧格式：前导码+目的MAC+源MAC+类型+数据+FCS', '交换机：自学习算法建立MAC地址表'], mnemonic: 'MAC地址48位，交换机自学习' },
        { id: 'cn_dl_vlan', name: '虚拟局域网VLAN', summary: ['VLAN将一个物理LAN划分为多个逻辑LAN', 'IEEE 802.1Q标准，在以太网帧中插入4字节VLAN标签'], mnemonic: 'VLAN逻辑分割，802.1Q打标签' },
      ]
    },
    {
      id: 'cn_network',
      name: '网络层',
      points: [
        { id: 'cn_net_ipv4', name: 'IPv4', summary: ['IPv4地址32位，点分十进制', '分类编址：A/B/C/D/E类', '子网划分：从主机号借位做子网号', 'CIDR：无分类域间路由，斜线记法', 'NAT：网络地址转换，私有地址和公网地址转换'], mnemonic: 'IPv4分类子网CIDR，NAT私有转公有' },
        { id: 'cn_net_protocols', name: '网络层协议', summary: ['ARP：IP地址解析为MAC地址', 'DHCP：动态主机配置协议，自动分配IP', 'ICMP：差错报告和询问报文'], mnemonic: 'ARP解析IP到MAC，DHCP自动分IP' },
        { id: 'cn_net_route', name: '路由算法和协议', summary: ['距离向量算法：RIP，跳数最多15，30秒更新', '链路状态算法：OSPF，基于Dijkstra，区域划分', 'BGP：路径向量协议，AS之间路由'], mnemonic: 'RIP跳数15距离向量，OSPF链路状态分区域' },
        { id: 'cn_net_ipv6', name: 'IPv6', summary: ['IPv6地址128位，冒号十六进制表示', 'IPv6相比IPv4：更大的地址空间、简化首部、流标签', 'IPv4→IPv6过渡：双栈、隧道、翻译'], mnemonic: 'IPv6地址128位，双栈隧道过渡法' },
      ]
    },
    {
      id: 'cn_transport',
      name: '传输层',
      points: [
        { id: 'cn_tp_udp', name: 'UDP协议', summary: ['无连接、不可靠、面向报文', '首部8字节：源端口+目的端口+长度+校验和', '应用：DNS、TFTP、实时多媒体'], mnemonic: 'UDP无连接不可靠，首部8字节' },
        { id: 'cn_tp_tcp', name: 'TCP协议', summary: ['面向连接、可靠、面向字节流', '首部20字节：源端口+目的端口+序号+确认号+标志位+窗口', '流量控制：滑动窗口', '拥塞控制：慢开始、拥塞避免、快重传、快恢复'], mnemonic: 'TCP可靠面向流，慢开始拥避快重恢' },
        { id: 'cn_tp_handshake', name: 'TCP连接管理', summary: ['三次握手：SYN→SYN+ACK→ACK', '四次挥手：FIN→ACK→FIN→ACK', 'TIME_WAIT：保证最后一个ACK被收到'], mnemonic: '三次握手建连接，四次挥手断开连' },
      ]
    },
    {
      id: 'cn_application',
      name: '应用层',
      points: [
        { id: 'cn_app_dns', name: 'DNS域名系统', summary: ['域名空间：根→顶级域→二级域...', 'DNS解析：递归查询、迭代查询', 'DNS使用UDP传输（端口53）'], mnemonic: 'DNS树形域名空间，递归迭代两种查' },
        { id: 'cn_app_http', name: 'HTTP协议', summary: ['HTTP：超文本传输协议，无状态', 'HTTP报文：请求行+首部+空行+实体', 'HTTPS：HTTP + SSL/TLS加密', '状态码：200成功、301/302重定向、404未找到、500服务器错误'], mnemonic: 'HTTP无状态，GET/POST少不了' },
        { id: 'cn_app_email', name: '电子邮件', summary: ['SMTP：发送邮件（端口25）', 'POP3：接收邮件（端口110，无状态）', 'IMAP：接收邮件（端口143，有状态）'], mnemonic: 'SMTP发信，POP3收信，IMAP更高级' },
      ]
    },
  ]
}

export const subjects = [ds, co, os, cn]

// 构建知识点扁平映射
const _map = {}
for (const sub of subjects) {
  for (const ch of sub.chapters) {
    for (const pt of ch.points) {
      _map[pt.id] = {
        ...pt,
        chapterId: ch.id,
        chapterName: ch.name,
        subjectId: sub.id,
        subjectName: sub.name,
        subjectColor: sub.color,
      }
    }
  }
}
export const knowledgeMap = _map
