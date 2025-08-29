import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// --- Начало: SVG-компоненты, заменяющие импорт ---

// Заглушка для вашего основного логотипа
const PlaceholderLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const Gemini = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.0001 9.1716L14.8285 6.34313L17.6569 9.1716L14.8285 12.0001L12.0001 9.1716Z" />
    <path d="M9.17157 12.0001L6.34311 14.8285L9.17157 17.6569L12.0001 14.8285L9.17157 12.0001Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
    />
  </svg>
);

const Replit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.28,3.027,3.16,8.147v7.706l5.12,5.12h7.706l5.12-5.12V8.147L15.987,3.027ZM9.033,9.44h5.933v2.373H9.033Zm0,3.56h5.933v2.373H9.033Z" />
  </svg>
);

const MagicUI = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 3v6M6.343 6.343l4.243 4.243M3 12h6m-1.657 5.657l4.243-4.243M12 21v-6m5.657-4.343l-4.243 4.243M21 12h-6m1.657-5.657l-4.243 4.243" />
  </svg>
);

const VSCodium = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M22.5 1.5l-13 10.375v9.625l13 1.5V1.5zm-14.5.5L1.625 8.125 8 12l-6.375 3.875L8 22l6.5-4.5V5z" />
  </svg>
);

const MediaWiki = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4.11 15.35c.42 0 .8-.14 1.09-.42l1.01-1.02a.84.84 0 00.25-.6c0-.23-.08-.44-.25-.6L4.25 10.7a1.44 1.44 0 00-1.09-.44c-.41 0-.8.15-1.1.44l-.8.8c-.3.3-.44.68-.44 1.1s.15.8.44 1.1l.8.8c.3.28.68.41 1.09.41zm15.78 0c.41 0 .8-.14 1.09-.42l.8-.8c.3-.3.44-.68.44-1.1s-.14-.8-.44-1.1l-.8-.8a1.44 1.44 0 00-1.09-.44c-.42 0-.8.15-1.09.44l-1.96 1.97c-.17.16-.25.37-.25.6s.08.44.25.6l1.01 1.02c.28.28.67.42 1.09.42zM12 2.01c.41 0 .8.15 1.1.44l.8.8c.3.3.44.68.44 1.1s-.14.8-.44 1.1l-1.95 1.96a.84.84 0 01-.6.25c-.24 0-.45-.08-.61-.25L9.72 6.46a1.44 1.44 0 01-.44-1.1c0-.41.15-.8.44-1.1l.8-.8c.3-.3.68-.44 1.09-.44zm0 11.28c.41 0 .8.14 1.09.42l1.01 1.01c.17.17.25.38.25.61s-.08.44-.25.6L12.09 18a1.44 1.44 0 01-1.09.44c-.41 0-.8-.14-1.09-.44l-1.01-1.01a.84.84 0 01-.25-.6c0-.24.08-.45.25-.61l2-1.96c.28-.28.67-.42 1.09-.42zm-2.65 6.36c.42 0 .8-.14 1.09-.42l1.96-1.96a.84.84 0 00.25-.6c0-.24-.08-.45-.25-.61L9.4 14.1c-.3-.3-.68-.44-1.09-.44-.41 0-.8.15-1.09.44l-.8.8c-.3.3-.44.68-.44 1.1s.15.8.44 1.1l.8.8c.3.28.68.41 1.09.41zm10.6-5.26c-.17-.17-.38-.25-.6-.25-.24 0-.45.08-.61.25l-2 1.96c-.3.3-.44.68-.44 1.09s.14.8.44 1.09l1.01 1.01c.28.28.67.42 1.09.42.41 0 .8-.14 1.09-.42l.8-.8c.3-.3.44-.68.44-1.1s-.14-.8-.44-1.1l-.8-.8a1.44 1.44 0 00-1.09-.44z" />
  </svg>
);

// Иконка для представления PaLM (использован общий значок AI/мозга)
const GooglePaLM = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2a10 10 0 0 0-4.32 19.14" />
    <path d="M12 2a10 10 0 0 1 4.32 19.14" />
    <path d="M12 2v8" />
    <path d="M17.68 6.86a6 6 0 0 1-11.36 0" />
    <path d="M4 12H2" />
    <path d="M22 12h-2" />
    <path d="M12 12v10" />
  </svg>
);

// --- Конец SVG-компонентов ---

export default function IntegrationsSection() {
  return (
    <section>
      <div className="bg-muted dark:bg-background py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative mx-auto flex max-w-sm items-center justify-between">
            <div className="space-y-6">
              <IntegrationCard position="left-top">
                <Gemini />
              </IntegrationCard>
              <IntegrationCard position="left-middle">
                <Replit />
              </IntegrationCard>
              <IntegrationCard position="left-bottom">
                <MagicUI />
              </IntegrationCard>
            </div>
            <div className="mx-auto my-2 flex w-fit justify-center gap-2">
              <div className="bg-muted relative z-20 rounded-2xl border p-1">
                <IntegrationCard
                  className="shadow-black-950/10 dark:bg-background size-16 border-black/25 shadow-xl dark:border-white/25 dark:shadow-white/10"
                  isCenter={true}
                >
                  {/* Используем заглушку вместо вашего LogoIcon */}
                  <PlaceholderLogoIcon />
                </IntegrationCard>
              </div>
            </div>
            <div
              role="presentation"
              className="absolute inset-1/3 bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] opacity-50 [--dots-color:black] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:[--dots-color:white]"
            ></div>

            <div className="space-y-6">
              <IntegrationCard position="right-top">
                <VSCodium />
              </IntegrationCard>
              <IntegrationCard position="right-middle">
                <MediaWiki />
              </IntegrationCard>
              <IntegrationCard position="right-bottom">
                <GooglePaLM />
              </IntegrationCard>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Integrate with your favorite tools
            </h2>
            <p className="text-muted-foreground">
              Connect seamlessly with popular platforms and services to enhance
              your workflow.
            </p>

            <Button variant="outline" size="sm" asChild>
              <Link href="#">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  children,
  className,
  position,
  isCenter = false,
}: {
  children: React.ReactNode;
  className?: string;
  position?:
    | "left-top"
    | "left-middle"
    | "left-bottom"
    | "right-top"
    | "right-middle"
    | "right-bottom";
  isCenter?: boolean;
}) => {
  return (
    <div
      className={cn(
        "bg-background relative flex size-12 rounded-xl border dark:bg-transparent",
        className
      )}
    >
      <div
        className={cn(
          "relative z-20 m-auto size-fit *:size-6",
          isCenter && "*:size-8"
        )}
      >
        {children}
      </div>
      {position && !isCenter && (
        <div
          className={cn(
            "bg-linear-to-r to-muted-foreground/25 absolute z-10 h-px",
            position === "left-top" &&
              "left-full top-1/2 w-[130px] origin-left rotate-[25deg]",
            position === "left-middle" &&
              "left-full top-1/2 w-[120px] origin-left",
            position === "left-bottom" &&
              "left-full top-1/2 w-[130px] origin-left rotate-[-25deg]",
            position === "right-top" &&
              "bg-linear-to-l right-full top-1/2 w-[130px] origin-right rotate-[-25deg]",
            position === "right-middle" &&
              "bg-linear-to-l right-full top-1/2 w-[120px] origin-right",
            position === "right-bottom" &&
              "bg-linear-to-l right-full top-1/2 w-[130px] origin-right rotate-[25deg]"
          )}
        />
      )}
    </div>
  );
};
