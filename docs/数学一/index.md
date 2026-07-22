# 高等数学 · 常用公式

---

## 一、等价无穷小（x→0）

| 公式 | 公式 |
|------|------|
| $\sin x \sim x$ | $\arcsin x \sim x$ |
| $\tan x \sim x$ | $\arctan x \sim x$ |
| $\ln(1+x) \sim x$ | $e^x - 1 \sim x$ |
| $a^x - 1 \sim x\ln a$ | $1 - \cos x \sim \frac12 x^2$ |
| $(1+x)^\alpha - 1 \sim \alpha x$ | $x - \ln(1+x) \sim \frac12 x^2$ |
| $x - \sin x \sim \frac16 x^3$ | $\tan x - x \sim \frac13 x^3$ |
| $\arcsin x - x \sim \frac16 x^3$ | $x - \arctan x \sim \frac13 x^3$ |

---

## 二、泰勒展开（麦克劳林）

| 函数 | 展开式 |
|------|--------|
| $e^x$ | $\displaystyle \sum_{n=0}^{\infty}\frac{x^n}{n!}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots$ |
| $\sin x$ | $\displaystyle \sum_{n=0}^{\infty}\frac{(-1)^n x^{2n+1}}{(2n+1)!}=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots$ |
| $\cos x$ | $\displaystyle \sum_{n=0}^{\infty}\frac{(-1)^n x^{2n}}{(2n)!}=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots$ |
| $\ln(1+x)$ | $\displaystyle \sum_{n=1}^{\infty}\frac{(-1)^{n-1} x^n}{n}=x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots\quad(-1<x\le1)$ |
| $\frac1{1-x}$ | $\displaystyle \sum_{n=0}^{\infty} x^n = 1+x+x^2+x^3+\cdots\quad(\|x\|<1)$ |
| $\frac1{1+x}$ | $\displaystyle \sum_{n=0}^{\infty} (-1)^n x^n = 1-x+x^2-x^3+\cdots\quad(\|x\|<1)$ |
| $(1+x)^\alpha$ | $\displaystyle 1+\alpha x+\frac{\alpha(\alpha-1)}{2!}x^2+\frac{\alpha(\alpha-1)(\alpha-2)}{3!}x^3+\cdots$ |
| $\arctan x$ | $\displaystyle \sum_{n=0}^{\infty}\frac{(-1)^n x^{2n+1}}{2n+1}=x-\frac{x^3}{3}+\frac{x^5}{5}-\cdots$ |
| $\arcsin x$ | $\displaystyle x+\frac{x^3}{6}+\frac{3x^5}{40}+\cdots$ |
| $\tan x$ | $\displaystyle x+\frac{x^3}{3}+\frac{2x^5}{15}+\cdots$ |

---

## 三、求导公式

### 基本求导

| $f(x)$ | $f'(x)$ | $f(x)$ | $f'(x)$ |
|--------|---------|--------|---------|
| $x^n$ | $nx^{n-1}$ | $e^x$ | $e^x$ |
| $a^x$ | $a^x\ln a$ | $\ln x$ | $\frac1x$ |
| $\log_a x$ | $\frac1{x\ln a}$ | $\|x\|$ | $\frac{x}{\|x\|}$ |

### 三角函数

| $f(x)$ | $f'(x)$ | $f(x)$ | $f'(x)$ |
|--------|---------|--------|---------|
| $\sin x$ | $\cos x$ | $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ | $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x \tan x$ | $\csc x$ | $-\csc x \cot x$ |

### 反三角函数

| $f(x)$ | $f'(x)$ | $f(x)$ | $f'(x)$ |
|--------|---------|--------|---------|
| $\arcsin x$ | $\frac1{\sqrt{1-x^2}}$ | $\arccos x$ | $-\frac1{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\frac1{1+x^2}$ | $\operatorname{arccot} x$ | $-\frac1{1+x^2}$ |

### 双曲函数

| $f(x)$ | $f'(x)$ | $f(x)$ | $f'(x)$ |
|--------|---------|--------|---------|
| $\sinh x$ | $\cosh x$ | $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\operatorname{sech}^2 x$ | | |

### 求导法则

- **四则**：$(u\pm v)'=u'\pm v'$，$(uv)'=u'v+uv'$，$\displaystyle\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}$
- **链式**：$\displaystyle\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}$，$f(g(x))'=f'(g(x))\cdot g'(x)$
- **反函数**：$\displaystyle\frac{dx}{dy}=\frac1{\;\frac{dy}{dx}\;}$
- **参数方程**：$\displaystyle\frac{dy}{dx}=\frac{dy/dt}{dx/dt}$
- **隐函数**：方程两边对 $x$ 求导，注意 $y$ 是 $x$ 的函数

---

## 四、积分公式

### 基本积分

| 积分 | 结果 | 积分 | 结果 |
|------|------|------|------|
| $\int x^n dx$ | $\frac{x^{n+1}}{n+1}+C\,(n\neq-1)$ | $\int\frac1x dx$ | $\ln\|x\|+C$ |
| $\int e^x dx$ | $e^x+C$ | $\int a^x dx$ | $\frac{a^x}{\ln a}+C$ |
| $\int \ln x\,dx$ | $x\ln x - x + C$ | | |

### 三角积分

| 积分 | 结果 | 积分 | 结果 |
|------|------|------|------|
| $\int\sin x\,dx$ | $-\cos x+C$ | $\int\cos x\,dx$ | $\sin x+C$ |
| $\int\tan x\,dx$ | $-\ln\|\cos x\|+C$ | $\int\cot x\,dx$ | $\ln\|\sin x\|+C$ |
| $\int\sec x\,dx$ | $\ln\|\sec x+\tan x\|+C$ | $\int\csc x\,dx$ | $\ln\|\csc x-\cot x\|+C$ |
| $\int\sec^2 x\,dx$ | $\tan x+C$ | $\int\csc^2 x\,dx$ | $-\cot x+C$ |
| $\int\sec x\tan x\,dx$ | $\sec x+C$ | $\int\csc x\cot x\,dx$ | $-\csc x+C$ |

### 反三角积分

| 积分 | 结果 |
|------|------|
| $\displaystyle\int\frac1{\sqrt{a^2-x^2}}dx$ | $\displaystyle\arcsin\frac{x}{a}+C$ |
| $\displaystyle\int\frac1{a^2+x^2}dx$ | $\displaystyle\frac1a\arctan\frac{x}{a}+C$ |
| $\displaystyle\int\frac1{x^2-a^2}dx$ | $\displaystyle\frac1{2a}\ln\left\|\frac{x-a}{x+a}\right\|+C$ |
| $\displaystyle\int\frac1{\sqrt{x^2\pm a^2}}dx$ | $\displaystyle\ln\left\|x+\sqrt{x^2\pm a^2}\right\|+C$ |
| $\displaystyle\int\sqrt{a^2-x^2}\,dx$ | $\displaystyle\frac{x}{2}\sqrt{a^2-x^2}+\frac{a^2}{2}\arcsin\frac{x}{a}+C$ |

### 分部积分

$$\int u\,dv = uv - \int v\,du$$

**选 $u$ 顺序**：**反**（反三角）→ **对**（对数）→ **幂**（幂函数）→ **指**（指数）→ **三**（三角）

### 递推公式

| 递推 | 公式 |
|------|------|
| $\int\sin^n x\,dx$ | $\displaystyle-\frac1n\sin^{n-1}x\cos x+\frac{n-1}{n}\int\sin^{n-2}x\,dx$ |
| $\int\cos^n x\,dx$ | $\displaystyle\frac1n\cos^{n-1}x\sin x+\frac{n-1}{n}\int\cos^{n-2}x\,dx$ |
| $\int\tan^n x\,dx$ | $\displaystyle\frac1{n-1}\tan^{n-1}x-\int\tan^{n-2}x\,dx\;(n\neq1)$ |

---

## 五、三角函数恒等式

### 基本关系

| 公式 | 公式 |
|------|------|
| $\sin^2 x + \cos^2 x = 1$ | $1+\tan^2 x = \sec^2 x$ |
| $1+\cot^2 x = \csc^2 x$ | $\sin x \csc x = 1$ |
| $\tan x = \frac{\sin x}{\cos x}$ | $\cot x = \frac{\cos x}{\sin x}$ |

### 倍角 & 半角

| 公式 | 公式 |
|------|------|
| $\sin 2x = 2\sin x\cos x$ | $\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x$ |
| $\displaystyle\sin^2 x = \frac{1-\cos 2x}{2}$ | $\displaystyle\cos^2 x = \frac{1+\cos 2x}{2}$ |
| $\sin 3x = 3\sin x - 4\sin^3 x$ | $\cos 3x = 4\cos^3 x - 3\cos x$ |

### 和差化积

| 公式 | 公式 |
|------|------|
| $\sin A + \sin B = 2\sin\frac{A+B}{2}\cos\frac{A-B}{2}$ | $\sin A - \sin B = 2\cos\frac{A+B}{2}\sin\frac{A-B}{2}$ |
| $\cos A + \cos B = 2\cos\frac{A+B}{2}\cos\frac{A-B}{2}$ | $\cos A - \cos B = -2\sin\frac{A+B}{2}\sin\frac{A-B}{2}$ |

### 积化和差

| 公式 | 公式 |
|------|------|
| $\sin A\cos B = \frac12[\sin(A+B)+\sin(A-B)]$ | $\cos A\sin B = \frac12[\sin(A+B)-\sin(A-B)]$ |
| $\cos A\cos B = \frac12[\cos(A+B)+\cos(A-B)]$ | $\sin A\sin B = -\frac12[\cos(A+B)-\cos(A-B)]$ |

### 诱导公式

| 角度 | $\sin$ | $\cos$ | $\tan$ |
|------|--------|--------|--------|
| $\pi/2 - x$ | $\cos x$ | $\sin x$ | $\cot x$ |
| $\pi/2 + x$ | $\cos x$ | $-\sin x$ | $-\cot x$ |
| $\pi - x$ | $\sin x$ | $-\cos x$ | $-\tan x$ |
| $\pi + x$ | $-\sin x$ | $-\cos x$ | $\tan x$ |

### 辅助角公式

$$a\sin x + b\cos x = \sqrt{a^2+b^2}\,\sin(x+\varphi)$$

其中 $\displaystyle\varphi = \arctan\frac{b}{a}$（注意象限）

---

## 六、其他常用公式

### 点火公式（Wallis）

$$\int_0^{\frac\pi2}\sin^n x\,dx = \int_0^{\frac\pi2}\cos^n x\,dx =
\begin{cases}
\displaystyle\frac{(n-1)!!}{n!!}\cdot\frac\pi2, & n\text{为偶} \\[8pt]
\displaystyle\frac{(n-1)!!}{n!!}, & n\text{为奇}
\end{cases}$$

### 常见微分方程通解

| 类型 | 形式 | 解 |
|------|------|----|
| 可分离 | $y'=f(x)g(y)$ | $\displaystyle\int\frac{dy}{g(y)} = \int f(x)\,dx$ |
| 一阶线性 | $y'+P(x)y=Q(x)$ | $\displaystyle y=e^{-\int P}\left(\int Q e^{\int P}dx + C\right)$ |
| 齐次 | $y'=f(\frac{y}{x})$ | 令 $u=y/x$ |
| 伯努利 | $y'+P(x)y=Q(x)y^n$ | 令 $z=y^{1-n}$ |
| 全微分 | $Pdx+Qdy=0$，$\frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x}$ | $\displaystyle\int P\,dx + \int Q\,dy = C$ |
