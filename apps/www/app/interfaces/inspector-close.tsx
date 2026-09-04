import { Button, Icon } from "@noorddev/vlak-react";

export function InspectorClose({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="if-inspect-close"
      aria-label="Close pane"
      onClick={onClick}
    >
      <Icon name="close" size={16} />
    </Button>
  );
}
