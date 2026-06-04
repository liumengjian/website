<script setup lang="ts">
import Button from "./Button.vue";
import { locale } from "../i18n/store";
import { changeLocale } from "../i18n/utils/locale";

const props = defineProps<{
  isDarkTheme?: boolean;
}>();

const handleLangSwitch = () => {
  changeLocale(locale.value === "zh" ? "en" : "zh");
};
</script>

<template>
  <Button
    variant="border"
    size="sm"
    @click="handleLangSwitch"
    :class="{ 'lang-switch': true, 'lang-switch-dark': props.isDarkTheme }"
    data-cursor="circle-white"
    data-sound="click"
    data-hoversound="hover"
    >{{ locale === "zh" ? "EN" : "ZH" }}</Button
  >
</template>

<style scoped lang="scss">
.lang-switch {
  &-dark {
    color: var(--color-white-400);
    --icon-color: var(--color-white-400);
    border-color: var(--color-white-400);
  }
}
</style>
