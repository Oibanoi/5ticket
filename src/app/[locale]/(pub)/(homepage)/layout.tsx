const HomepageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[var(--container-8xl)] mx-auto bg-background px-6 py-3">{children}</div>
  );
};

export default HomepageLayout;
