interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl mb-12 ${alignClass}`}>
      {label && (
        <span className="inline-block text-primary font-medium text-sm uppercase tracking-widest mb-3">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
