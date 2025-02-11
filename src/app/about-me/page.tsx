"use client";

import Typewriter from "typewriter-effect";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function AboutMe() {
  const { language } = useLanguage();
  const aboutMeText = (translations[language] ?? translations["en"]).aboutMe;

  return (
    <div className="flex min-h-screen items-center justify-center p-5 bg-[#f4f4f4] dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-5xl space-y-10">
        {/* Título Centralizado */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl text-blue-500 font-semibold mb-3">
            {"> "} {aboutMeText.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200">
            {aboutMeText.subtitle}
          </p>
        </div>

        {/* Grid com alinhamento vertical centralizado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Coluna esquerda (foto e código formatado) */}
          <div className="space-y-2">
            {/* Container da imagem */}
            <div className="flex items-center justify-center">
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-br from-green-400 to-green-800 shadow-2xl mb-5">
                <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gray-900 overflow-hidden">
                  <Image
                    src="https://media.licdn.com/dms/image/v2/D4D03AQETXx5WaE1E2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698632242528?e=1744243200&v=beta&t=f5ma99k0OoqhPnDB8q9MT1sy4Xe9wXVMHVmy6XHlCh0"
                    alt="Bruno Caceres"
                    fill
                    className="object-cover rounded-full border-4 border-gray-800 shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Container do código */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg mx-auto bg-gray-900 rounded-lg shadow-lg border border-gray-700">
                {/* Barra de Título da IDE */}
                <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="ml-auto text-gray-400 text-sm">aboutMe.js</span>
                </div>

                {/* Conteúdo da IDE */}
                <div className="px-5 py-4 text-gray-100 font-mono text-sm">
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: false,
                      delay: 50,
                      deleteSpeed: Infinity,
                      cursor: "_",
                      strings: [aboutMeText.codeSnippet],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita (comentários) - Visual minimalista */}
          <div className="w-full">
            <div className="w-full h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <pre className="w-full m-0 text-base text-gray-800 dark:text-gray-100 font-mono leading-relaxed whitespace-pre-wrap">
                {aboutMeText.commentBlock}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
