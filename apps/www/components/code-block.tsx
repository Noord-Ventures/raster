export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="code-block">
      <pre>{code}</pre>
    </div>
  );
}
