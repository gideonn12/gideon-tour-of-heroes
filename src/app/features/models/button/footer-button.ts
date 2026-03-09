interface FooterButton {
  label: string;
  action: () => void;
  disabled?: () => boolean;
}