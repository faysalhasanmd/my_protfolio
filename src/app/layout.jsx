import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const metadata = {
  title: "Md. Faysal Hasan — MERN Stack Developer",
  description:
    "Portfolio of Md. Faysal Hasan, a MERN Stack Developer from Bangladesh building clean, practical web applications with React, Node.js and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="font-body">
        {children}
      </body>
    </html>
  );
}
