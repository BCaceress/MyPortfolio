'use client';

import Typewriter from 'typewriter-effect';
import Image from 'next/image';

export default function AboutMe() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-5xl space-y-12">
        {/* Título Centralizado */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl text-blue-500 font-semibold mb-3">{"> "} About-me</h2>
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200">
            Full Stack Developer | Passionate about learning and creating solutions:
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
                      strings: [
                        `const aboutMe = {<br />` +
                          `&nbsp;&nbsp;name: "Bruno Caceres",<br />` +
                          `&nbsp;&nbsp;profession: "Full Stack Developer",<br />` +
                          `&nbsp;&nbsp;skills: ["React", "Next.js", "Tailwind", "TypeScript"],<br />` +
                          `&nbsp;&nbsp;experience: "7+ years",<br />` +
                          `};`
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita (comentários) */}
          <div className="p-0">
            <pre className="text-sm text-gray-800 dark:text-gray-100 p-3 border rounded-lg overflow-x-auto font-mono border-gray-700 dark:border-gray-300">
              <code>
                <span className="text-gray-500">1 </span>
                &nbsp; /*
                <br />
                <span className="text-gray-500">2 </span>
                &nbsp;&nbsp;  * Hi! I&apos;m a full-stack developer with over 7 years of
                <br />
                <span className="text-gray-500">3 </span>
                &nbsp;&nbsp;  * experience, and for the past 2 years,
                <br />
                <span className="text-gray-500">4 </span>
                &nbsp;&nbsp;  * I&apos;ve also been diving into the mobile world with
                <br />
                <span className="text-gray-500">5 </span>
                &nbsp;&nbsp;  * React Native. My journey in technology started back 
                <br />
                <span className="text-gray-500">6 </span>
                &nbsp;&nbsp;  * in 2010 when I took a technical course in IT and
                <br />
                <span className="text-gray-500">7 </span>
                &nbsp;&nbsp;  * landed my first opportunity in this competitive job
                <br />
                <span className="text-gray-500">8 </span>
                &nbsp;&nbsp;  * market. A few years later, I achieved my
                <br />
                <span className="text-gray-500">9 </span>
                &nbsp;&nbsp;  * long-awaited degree in Internet Systems at Faculdade
                <br />
                <span className="text-gray-500">10</span>
                &nbsp;&nbsp;  * Feevale, and now I keep challenging myself as I&apos;m in
                <br />
                <span className="text-gray-500">11</span>
                &nbsp;&nbsp;  * the 4th module of my Full Stack post-graduation.
                <br />
                <span className="text-gray-500">12</span>
                &nbsp;&nbsp;  * 
                <br />
                <span className="text-gray-500">13</span>
                &nbsp;&nbsp;  * I&apos;m passionate about creating innovative solutions 
                <br />
                <span className="text-gray-500">14 </span>
                &nbsp;&nbsp; * and always looking to learn something new. Recently, 
                <br />
                <span className="text-gray-500">15 </span>
                &nbsp;&nbsp; * I also started learning English, which has been
                <br />
                <span className="text-gray-500">16 </span>
                &nbsp;&nbsp; * really exciting for me—I see it as essential for
                <br />
                <span className="text-gray-500">17 </span>
                &nbsp;&nbsp; * growing even more in the tech field.
                <br />
                <span className="text-gray-500">18</span>
                &nbsp;&nbsp; 
                <br />
                <span className="text-gray-500">19 </span>
                &nbsp;&nbsp; * But life isn&apos;t just about coding, right? In my free 
                <br />
                <span className="text-gray-500">20 </span>
                &nbsp;&nbsp; * time, I love traveling, playing sports, gaming, and
                <br />
                <span className="text-gray-500">21 </span>
                &nbsp;&nbsp; * spending time with my family and my dog.
                <br />
                <span className="text-gray-500">22 </span>
                &nbsp;&nbsp; 
                <br />
                <span className="text-gray-500">23 </span>
                &nbsp;&nbsp; * If you want to chat about technology, projects, or
                <br />
                <span className="text-gray-500">24 </span>
                &nbsp;&nbsp; * even learning English, just reach out! 🚀
                <br />
                <span className="text-gray-500">25 </span>
                &nbsp;*/
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
