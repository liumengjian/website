import { ref } from "vue";

export type LegalModalType = "privacy" | "legal";

const isOpen = ref(false);
const modalType = ref<LegalModalType>("privacy");

export function useLegalModal() {
  const open = (type: LegalModalType) => {
    modalType.value = type;
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = (type: LegalModalType) => {
    if (isOpen.value && modalType.value === type) {
      close();
    } else {
      open(type);
    }
  };

  return {
    isOpen,
    modalType,
    open,
    close,
    toggle,
  };
}
