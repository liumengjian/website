<script setup lang="ts">
import Github from "./icons/Github.vue";
import Mail from "./icons/Mail.vue";
import X from "./icons/X.vue";
import Link from "./Link.vue";
import Wechat from "./icons/Wechat.vue";
import Phone from "./icons/Phone.vue";
import { t } from "../i18n/utils/translate";
import ButtonRound from "./ButtonRound.vue";
import wechatImg from "../assets/images/normal/wechat.png";

import { social } from "../content/social";
import { ref } from "vue";

const props = defineProps<{
  variant?: "theme" | "background";
}>();

// map icon names to components
const icons = {
  mail: Mail,
  github: Github,
  x: X,
  wechat: Wechat,
  phone: Phone,
} as const;

const getAriaLabel = (name: string) => `${t("go-to")} ${name.charAt(0).toUpperCase() + name.slice(1)}`;

const tooltipVisible = ref<string | null>(null);

const showTooltip = (name: string) => {
  tooltipVisible.value = name;
};

const hideTooltip = () => {
  tooltipVisible.value = null;
};
</script>

<template>
  <div class="social">
    <template v-for="item in social" :key="item.name">
      <!-- Items with url: link behavior -->
      <Link
        v-if="'url' in item"
        external
        :href="item.url"
        :aria-label="getAriaLabel(item.name)"
        class="social-link"
        data-cursor="circle-white"
      >
        <ButtonRound
          renderAs="div"
          :variant="props.variant ?? 'theme'"
          class="children-unclickable"
          data-hoversound="hover"
        >
          <component :is="icons[item.name]" :aria-label="getAriaLabel(item.name)" external />
        </ButtonRound>
      </Link>

      <!-- Items with content: hover tooltip behavior -->
      <div
        v-else-if="'content' in item"
        class="social-tooltip-wrapper"
        @mouseenter="showTooltip(item.name)"
        @mouseleave="hideTooltip"
      >
        <ButtonRound
          renderAs="div"
          :variant="props.variant ?? 'theme'"
          class="children-unclickable"
          data-cursor="circle-white"
          data-hoversound="hover"
        >
          <component :is="icons[item.name]" :aria-label="getAriaLabel(item.name)" :active="tooltipVisible === item.name" />
        </ButtonRound>
        <Transition name="tooltip">
          <div v-if="tooltipVisible === item.name" class="social-tooltip" :class="`social-tooltip-${item.name}`">
            <!-- Wechat: show QR image -->
            <img
              v-if="'image' in item"
              :src="wechatImg"
              alt="WeChat QR"
              class="social-tooltip-image"
            />
            <!-- Phone: show text content -->
            <span v-else class="social-tooltip-text">{{ item.content }}</span>
          </div>
        </Transition>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.social {
  display: flex;
  gap: var(--space-md);
}

.social-tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

.social-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background-color: var(--color-background-400);
  border: 1px solid var(--color-grayscale-400);
  border-radius: var(--radius-md);
  padding: var(--space-xs);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  pointer-events: none;

  &-image {
    display: block;
    max-width: 120px;
    min-width: 120px;
    max-height: 120px;
    min-height: 120px;
    object-fit: contain;
    border-radius: var(--radius-sm);
  }

  &-text {
    font-size: var(--font-size-sm);
    color: var(--color-text-400);
    padding: var(--space-xxs) var(--space-xs);
  }
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}

.tooltip-enter-to,
.tooltip-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
