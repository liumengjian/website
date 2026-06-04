<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  title?: string;
  text?: string;
  type?: string;
}

const props = defineProps<Props>();

const classes = computed(() => {
  return {
    text: true,
    "text-with-title": !!props.title,
  };
});
</script>

<template>
  <div :class="classes" v-if="props.title">
    <h3 class="text-title">{{ props.title }}</h3>
    <a class="text-content" v-if="props.type === 'link'" :href="props.text" target="_blank" rel="noopener noreferrer">{{ props.text }}</a>
    <p class="text-content" v-else v-html="props.text"></p>
  </div>
  <p v-else class="text" v-html="props.text"></p>
</template>

<style scoped lang="scss">
.text {
  line-height: var(--line-height-copy);
  grid-column: 1 / 13;

  @include mixins.mq("md") {
    grid-column: 3 / 11;
  }

  @include mixins.mq("lg") {
    grid-column: 4 / 10;
  }

  &-with-title {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  &-title {
    font-size: var(--font-size-title-sm);
    line-height: var(--line-height-title);
  }
}
</style>
