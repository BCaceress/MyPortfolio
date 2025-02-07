"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <nav className=" fixed  top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-white dark:bg-dark-bg shadow-md transition-colors duration-300 z-50">
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        <span className="text-black dark:text-white">&lt;BC /&gt;</span>
      </div>

      <div className="flex items-center space-x-6">
        {/* Links */}
        <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
          <li>
            <button onClick={() => handleScroll("home")} className="hover:text-gray-500 dark:hover:text-gray-400">
              _hello
            </button>
          </li>
          <li>
            <button onClick={() => handleScroll("about")} className="hover:text-gray-500 dark:hover:text-gray-400">
              _about-me
            </button>
          </li>
          <li>
            <button onClick={() => handleScroll("skills")} className="hover:text-gray-500 dark:hover:text-gray-400">
              _skills
            </button>
          </li>
          <li>
            <button onClick={() => handleScroll("projects")} className="hover:text-gray-500 dark:hover:text-gray-400">
              _projects
            </button>
          </li>
          <li>
            <button onClick={() => handleScroll("contact")} className="hover:text-gray-500 dark:hover:text-gray-400">
              _contact-me
            </button>
          </li>
        </ul>

        <div className="w-px h-4 bg-gray-700"></div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Download CV */}
        <a
          href="/path-to-cv.pdf"
          download
          className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Download CV
        </a>
      </div>
    </nav>
  );
}