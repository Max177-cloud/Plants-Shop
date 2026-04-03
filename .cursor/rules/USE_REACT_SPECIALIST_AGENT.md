RULE: USE_REACT_SPECIALIST_AGENT

Описание:
Все задачи, связанные с React-разработкой, должны выполняться исключительно специализированным агентом "React Senior Developer".

Условие активации:
Правило активируется, если запрос пользователя содержит любую из следующих тем:

- React
- Next.js
- JSX / TSX
- React Hooks
- React Components
- Frontend архитектура React
- React performance optimization
- State management (Redux, Zustand, Context)
- React UI компоненты
- React debugging
- React refactoring
- React + TypeScript
- React Query / TanStack Query

Действие:
1. Система обязана передать задачу агенту:
   "React Senior Developer"

2. Другие агенты НЕ должны генерировать код React напрямую.

3. Если задача частично связана с React:
   - React часть передается React-агенту
   - остальные части могут выполняться другими агентами.

Обязательные требования:
- Использовать современный React
- Использовать функциональные компоненты
- Предпочитать TypeScript
- Следовать best practices React

Приоритет правила:
HIGH

Fallback:
Если React агент недоступен:
- задача ставится в очередь
- либо возвращается сообщение:
"React specialist agent required for this task."