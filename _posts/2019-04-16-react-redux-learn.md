---
layout: post
title:  "react & redux 学习记录"
categories: JavaScript
tags: JavaScript react redux
---

* content
{:toc}
## react
### 组件数据 prop & state
prop 是组件对外接口

state 是组件的内部状态

对外用prop 对内 用state

proTypes 用来进行 prop 的参数检查

```bash
object.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};

```

毕竟检查只对开发的时候有效， babel-react-optimize 可以自动去掉对 propTypes

#### 组件的声明周期
* 装载过程(Mount),组件第一次在DOM树中渲染的过程
> 依次调用
>* constructor
>> 初始化state等
>* getInitialState 【卖萌的】
>* getDefaultProps 【卖萌的】
>* componentWillMount 【卖萌的】
>* rendor 
>> rendor 是React.Component 唯一没有默认实现的方法
>* componentDidMount
>> 需要注意,rendor执行完后不会立即调用componentDidMount

* 更新过程(Update),当组件被重新渲染的过程
> 依次调用
>* componentWillReceiveProps
>> 只要父组件的 rendor 函数被调用，在 rendor 函数里被渲染的子组件就会经历更新过程,不管父组件传给子组件的 props 有没有改变
>* shouldComponentUpdate
>> 返回 true,false 决定组件需不需要渲染，提升性能的手段
>* componentWillUpdate
>* render
>* componentDidUpdate

* 卸载过程(Unmount),当组件从DOM中删除的过程
>> 清理创造的内容，避免内存泄露 


## redux
在 单项数据流 的基础上 添加了三个基本原则
* 唯一数据源（Single Source of Truth）
> 应用的状态数据应该只能存储在唯一的 Store 上
* 保持状态只读 (State is read-only)
> 不能直接修改状态, 该修改 Store 的状态，必须要通过派发一个action 对象完成
* 数据改变只能通过纯函数完成 (Changes are made with pure functions)
> 纯函数指 Reducer (redux 指 reducer + flux)
x ccc         