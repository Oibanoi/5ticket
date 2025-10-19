import React from "react";

interface EventDetailLayoutProps {
  children: React.ReactNode;
}

const EventDetailLayout: React.FC<EventDetailLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-[calc(100dvh-60px)] bg-zinc-950 text-white">
      <div className="max-w-[var(--container-8xl)] p-4 mx-auto">{children}</div>
    </div>
  );
};

export default EventDetailLayout;
