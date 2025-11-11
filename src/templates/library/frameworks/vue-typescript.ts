import { Template } from "../../types.js";

export const vueTypescriptTemplate: Template = {
  id: "vue3-typescript",
  name: "Vue 3 + TypeScript",
  description: "Vue 3 Composition API with TypeScript and best practices",
  category: "framework",
  tags: ["vue", "typescript", "composition-api", "frontend"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Vue 3 + TypeScript Project

## Tech Stack
- Vue 3 with Composition API
- TypeScript
- Pinia for state management
- Vite for build tool

## Code Philosophy
- Composition API over Options API
- Script setup syntax
- TypeScript for type safety
- Composables for reusable logic
`,
    codeStyleRules: `# Vue 3 Code Style

## Component Pattern
\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});

const emit = defineEmits<{
  (e: 'update', value: number): void
}>();

const counter = ref(props.count);

const doubleCount = computed(() => counter.value * 2);

function increment() {
  counter.value++;
  emit('update', counter.value);
}
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Count: {{ counter }} (double: {{ doubleCount }})</p>
    <button @click="increment">Increment</button>
  </div>
</template>
\`\`\`

## Composables
\`\`\`typescript
// useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial);
  
  function increment() {
    count.value++;
  }
  
  return { count, increment };
}
\`\`\`
`,
  },
};

export default vueTypescriptTemplate;

