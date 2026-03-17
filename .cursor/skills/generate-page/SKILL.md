---
name: generate-page
description: >-
  基于项目组件库和设计系统生成页面。当用户要求创建页面、实现界面、开发功能模块、
  根据需求文档生成 UI，或提到"生成页面""创建页面""实现界面""做一个页面"时使用此技能。
---

# 基于组件库生成页面

## 工作流程

### Step 1: 需求分析

从用户输入（对话描述或需求文档）中提取：

- **页面类型**: 对话页、列表页、表单页、仪表盘、详情页等
- **核心功能**: 需要哪些交互能力
- **布局结构**: 单栏、双栏、三栏、侧边栏+内容等
- **数据展示**: 需要展示什么数据、什么格式

### Step 2: 组件选型

根据需求从组件库中选择合适的组件。先查阅 [component-reference.md](component-reference.md) 获取详细的组件 API。

**选型优先级**: wuhan composed > wuhan blocks > shadcn ui > 自定义样式

#### 常见页面模式 → 推荐组件

| 页面模式 | 推荐组件组合 |
|----------|------------|
| AI 对话页 | PageHeader + TripleSplitPane + MessageList + ComposedSender + Welcome + Prompt |
| AI Agent 页 | PageHeader + AgentCard + TaskList + GoalCard + ExecutionResult |
| 数据源管理 | Sidebar + FileCard/DocumentCard + Upload + DynamicForm |
| 设置/表单页 | PageHeader + BlockInput + BlockSelect + Checkbox + Radio + DynamicForm |
| 仪表盘 | PageHeader + ReportCard + Progress + StatusTag + Tabs |
| 历史记录 | Sidebar + HistoryItem + MessageList |

### Step 3: 页面骨架搭建

```tsx
"use client";

import * as React from "react";
// 1. 先导入 composed 组件
// 2. 再导入需要的 blocks
// 3. 最后导入 shadcn ui
// 4. 工具函数
import { cn } from "@/lib/utils";

// 定义 Props 类型
interface MyPageProps {
  // ...
}

export function MyPage({ ...props }: MyPageProps) {
  // 状态管理
  // 事件处理
  return (
    <div className="h-full flex flex-col overflow-hidden bg-[var(--Page-bg-page)]">
      {/* 页面内容 */}
    </div>
  );
}
```

### Step 4: 样式约束

1. **颜色**: 只用语义化 CSS 变量（`var(--Text-text-primary)` 等），或 shadcn 别名（`bg-primary`）
2. **间距**: 用设计 token（`var(--Gap-gap-md)`）或 Tailwind 类（`gap-4`）
3. **圆角/阴影**: 用 `var(--radius-md)`, `var(--shadow-basic)` 等
4. **响应式**: 使用 Tailwind 断点（`sm:`, `md:`, `lg:`）
5. **暗色模式**: 组件已内置支持，页面级用 `dark:` 前缀

### Step 5: 交互逻辑

- 表单: react-hook-form + zod schema
- 状态: React.useState / useReducer，复杂状态可提取自定义 hook
- 图标: 仅使用 lucide-react

## 质量检查清单

生成页面后自查：

- [ ] 所有 UI 元素都来自组件库，没有从零手写
- [ ] 颜色使用语义化 token，无硬编码色值
- [ ] 间距使用设计系统 token 或 Tailwind 标准类
- [ ] 组件导入路径正确（`@/components/wuhan/composed/*` 或 `@/components/ui/*`）
- [ ] TypeScript 类型完整，无 any
- [ ] 有合理的加载态和空状态处理

## 注意事项

- **不要安装新的 UI 库**（如 Material UI、Ant Design 的 UI 组件等），项目已有完整组件体系
- **不要自行创建基础组件**（如 Button、Input），使用已有的
- **新页面文件放在 `src/pages/` 目录**（如不存在则创建）
- **共享逻辑提取到 `src/hooks/`**
- **类型定义放在 `src/types/`**
