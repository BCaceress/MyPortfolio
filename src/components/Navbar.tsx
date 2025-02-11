"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || true; 
    }
    return true; 
  });
  

  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-dark-bg shadow-md transition-colors duration-300 z-50">
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        <span className="text-black dark:text-white">&lt;BC /&gt;</span>
      </div>

      {/* Botão de menu para telas menores */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-md">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-dark-bg md:flex md:items-center md:space-x-6 p-4 md:p-0 shadow-md md:shadow-none transition-transform duration-300 ${menuOpen ? "block" : "hidden"}`}>
        {/* Links */}
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-gray-700 dark:text-gray-300">
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

        <div className="border-t border-gray-300 dark:border-gray-600 my-4 md:hidden"></div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a
            href="/PDF/BrunoCaceresCurrículo.pdf"
            download
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 mt-2 md:mt-0"
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
