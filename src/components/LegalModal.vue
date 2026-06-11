<script setup lang="ts">
import { computed, watch, onUnmounted } from "vue";
import { useLegalModal } from "../composables/useLegalModal";
import { locale } from "../i18n/store";
import { t } from "../i18n/utils/translate";
import privacyEn from "../content/legal/privacy-en";
import privacyZh from "../content/legal/privacy-zh";
import legalEn from "../content/legal/legal-en";
import legalZh from "../content/legal/legal-zh";

const { isOpen, modalType, close } = useLegalModal();

const content = computed(() => {
  const isZh = locale.value === "zh";
  if (modalType.value === "privacy") {
    return isZh ? privacyZh : privacyEn;
  }
  return isZh ? legalZh : legalEn;
});

const title = computed(() => {
  return modalType.value === "privacy" ? t("privacy") : t("legal");
});

const handleBackdropClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).classList.contains("legal-modal")) {
    close();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
};

watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeydown);
  } else {
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="legal-modal-fade">
      <div
        v-if="isOpen"
        class="legal-modal"
        @click="handleBackdropClick"
      >
        <div class="legal-modal-panel">
          <div class="legal-modal-header">
            <h2 class="legal-modal-title">{{ title }}</h2>
            <button
              class="legal-modal-close"
              @click="close"
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="legal-modal-close-icon"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="legal-modal-body" v-html="content"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.legal-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  padding: var(--space-outer);
}

.legal-modal-fade-enter-active,
.legal-modal-fade-leave-active {
  transition: opacity 0.3s ease;

  .legal-modal-panel {
    transition: transform 0.3s var(--ease-smooth), opacity 0.3s ease;
  }
}

.legal-modal-fade-enter-from,
.legal-modal-fade-leave-to {
  opacity: 0;

  .legal-modal-panel {
    transform: translateY(20px) scale(0.97);
    opacity: 0;
  }
}

.legal-modal-panel {
  position: relative;
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  background: var(--color-background-400, var(--color-beige-400));
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.legal-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg) var(--space-xl);
  border-bottom: 1px solid var(--color-grayscale-400);
  flex-shrink: 0;
}

.legal-modal-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-400);
  margin: 0;
}

.legal-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text-400);
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: var(--color-grayscale-400);
  }
}

.legal-modal-close-icon {
  width: 20px;
  height: 20px;
}

.legal-modal-body {
  padding: var(--space-xl);
  overflow-y: auto;
  overscroll-behavior: contain;
  color: var(--color-text-400);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-copy);

  :deep(h1) {
    font-size: var(--font-size-title-xs);
    font-weight: 700;
    margin: var(--space-lg) 0 var(--space-sm);
    line-height: var(--line-height-title);

    &:first-child {
      margin-top: 0;
    }
  }

  :deep(h2) {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin: var(--space-md) 0 var(--space-xs);
  }

  :deep(h3) {
    font-size: var(--font-size-md);
    font-weight: 600;
    margin: var(--space-sm) 0 var(--space-xs);
  }

  :deep(p) {
    margin: var(--space-xs) 0;
  }

  :deep(ul) {
    padding-left: var(--space-lg);
    margin: var(--space-xs) 0;
  }

  :deep(li) {
    margin: var(--space-xxs) 0;
  }

  :deep(a) {
    color: var(--color-cyan-500);
    text-decoration: underline;
  }

  :deep(strong) {
    font-weight: 600;
  }
}
</style>
