import {
  mdiMenu,
  mdiClose,
  mdiTranslate,
  mdiWhiteBalanceSunny,
  mdiHomeOutline,
  mdiEmail,
  mdiPhone,
  mdiWeb,
  mdiCodeBraces,
  mdiViewGridOutline,
  mdiFormatListBulleted,
  mdiArrowLeft,
  mdiArrowRight,
  mdiReload,
  mdiCheckCircle,
  mdiCloseCircle,
  mdiMagnifyPlusOutline,
  mdiMagnifyMinusOutline,
} from "@mdi/js";
const paths = {
  menu: mdiMenu,
  close: mdiClose,
  translate: mdiTranslate,
  sun: mdiWhiteBalanceSunny,
  home: mdiHomeOutline,
  email: mdiEmail,
  phone: mdiPhone,
  web: mdiWeb,
  code: mdiCodeBraces,
  grid: mdiViewGridOutline,
  list: mdiFormatListBulleted,
  left: mdiArrowLeft,
  right: mdiArrowRight,
  reload: mdiReload,
  success: mdiCheckCircle,
  error: mdiCloseCircle,
  zoomIn: mdiMagnifyPlusOutline,
  zoomOut: mdiMagnifyMinusOutline,
};
export function Icon({
  name,
  className = "",
}: {
  name: keyof typeof paths;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d={paths[name]} />
    </svg>
  );
}
