import { cn } from "@/lib/utils";
import {
  Rocket,
  Users,
  Coins,
  Lightbulb,
} from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      title: "Share your idea",
      description:
        "Founders post their projects on LaunchPad. Each idea is copyright-stamped instantly to protect creativity.",
      icon: <Lightbulb />,
    },
    {
      title: "Get community support",
      description:
        "Supporters discover projects they love and back them with small contributions. Every supporter gets credited.",
      icon: <Users />,
    },
    {
      title: "Validate and grow",
      description:
        "Founders gain early validation, feedback, and visibility to improve and refine their ideas.",
      icon: <Coins />,
    },
    {
      title: "Launch and take off",
      description:
        "Ideas move from imagination to impact, powered by the community. LaunchPad is where ideas take off.",
      icon: <Rocket />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {steps.map((step, index) => (
        <Step key={step.title} {...step} index={index} />
      ))}
    </div>
  );
}

const Step = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/step border-neutral-800",
        (index === 0 || index === 2) && "lg:border-l border-neutral-800",
        index < 2 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 2 && (
        <div className="opacity-0 group-hover/step:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 2 && (
        <div className="opacity-0 group-hover/step:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-purple-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/step:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/step:bg-purple-500 transition-all duration-200 origin-center" />
        <span className="group-hover/step:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
