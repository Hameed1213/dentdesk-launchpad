import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import CookieBanner from "@/components/CookieBanner";
import { captureLanding, countPageView } from "@/lib/visitSource";
import { organizationSchema } from "@/components/site/schema";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* React 19 lifts these into <head>: a real title, and keep the page out of search results
          (the server already answers with a 404 status). */}
      <title>Page not found | DentDock</title>
      <meta name="robots" content="noindex" />
      <div className="max-w-md text-center">
        <p className="text-7xl font-bold text-foreground" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#2563EB" },
      { title: "DentDock" },
      {
        name: "description",
        content:
          "Online booking, automated reminders, payments and recalls for UK private dental practices. No setup fees. No contracts.",
      },
      { name: "author", content: "DentDock" },
      { property: "og:title", content: "DentDock" },
      { property: "og:site_name", content: "DentDock" },
      { property: "og:locale", content: "en_GB" },
      {
        property: "og:description",
        content:
          "Dental practice management software for UK private practices. Online booking, automated reminders, payments and recalls.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DentDock" },
      {
        name: "twitter:description",
        content:
          "Dental practice management software for UK private practices. Online booking, automated reminders, payments and recalls.",
      },
      { property: "og:image", content: "https://dentdock.co.uk/og-image.png" },
      { name: "twitter:image", content: "https://dentdock.co.uk/og-image.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      // The main font file is needed for the first paint of every page: fetch it straight away.
      {
        rel: "preload",
        href: "/fonts/inter-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    // Who runs the site, on every page (pages point at it by its @id).
    scripts: [{ type: "application/ld+json", children: JSON.stringify(organizationSchema) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

/*
 * Runs before the page paints. Turns on the scroll fade-in (see Reveal and styles.css) only when the
 * browser can run it, and marks each [data-reveal] block data-shown as it enters the viewport,
 * including blocks added later by client-side navigation. data-shown is never a React prop, so React
 * never removes it. If anything here fails, the content simply stays visible.
 */
const REVEAL_SCRIPT = `(function(){try{if(!("IntersectionObserver" in window))return;var d=document.documentElement;d.classList.add("js");var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute("data-shown","");io.unobserve(e.target);}});},{rootMargin:"0px 0px -60px 0px"});var scan=function(){var els=document.querySelectorAll("[data-reveal]:not([data-shown]):not([data-watched])");for(var i=0;i<els.length;i++){els[i].setAttribute("data-watched","");io.observe(els[i]);}};var start=function(){scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});};if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",start);}else{start();}}catch(e){document.documentElement.classList.remove("js");}})();`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
        {/* Without JavaScript, the homepage's few remaining framer-motion entrances would stay at
            opacity 0 forever: show them. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}</style>',
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Website visit totals for the ops console (no cookies, nothing stored on
  // the device): the first page of the visit is noted in memory, then every
  // page shown is counted.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    captureLanding();
    countPageView(pathname);
  }, [pathname]);

  return (
    <>
      <Outlet />
      <CookieBanner />
    </>
  );
}
