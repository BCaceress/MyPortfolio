'use client';

import Typewriter from 'typewriter-effect';

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

        {/* Grid com duas colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Coluna esquerda (foto e código formatado) */}
          <div className="space-y-2">
            {/* Container da imagem com design aprimorado */}
            <div className="flex items-center justify-center">
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-br from-green-400 to-green-800 shadow-2xl mb-5">
                <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-900 overflow-hidden">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D03AQETXx5WaE1E2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698632242528?e=1744243200&v=beta&t=f5ma99k0OoqhPnDB8q9MT1sy4Xe9wXVMHVmy6XHlCh0"
                    alt="Bruno Caceres"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-gray-800 shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Container centralizado com visual de editor de código */}
            <div className="flex items-center justify-center">
              <div className="max-w-md w-full mx-auto p-5 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-300 dark:border-gray-800">
                {/* Cabeçalho simulando janela de editor */}
                <div className="flex space-x-2 mb-4">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                {/* Conteúdo centralizado */}
                <div className="flex flex-col text-gray-800 dark:text-gray-200">
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: false,
                      delay: 50,
                      deleteSpeed: Infinity,
                      cursor: "|",
                      strings: [
                        `const aboutMe = {<br />` +
                          `&nbsp;&nbsp;&nbsp;&nbsp;name: "Bruno Caceres",<br />` +
                          `&nbsp;&nbsp;&nbsp;&nbsp;profession: "Full Stack Developer",<br />` +
                          `&nbsp;&nbsp;&nbsp;&nbsp;skills: ["React", "Next.js", "Tailwind", "TypeScript"],<br />` +
                          `&nbsp;&nbsp;&nbsp;&nbsp;experience: "7+ years",<br />` +
                          `};`,
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
                &nbsp;&nbsp;  * Hi! I'm a full-stack developer with over 7 years of
                <br />
                <span className="text-gray-500">3 </span>
                &nbsp;&nbsp;  * experience, and for the past 2 years,
                <br />
                <span className="text-gray-500">4 </span>
                &nbsp;&nbsp;  * I've also been diving into the mobile world with
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
                &nbsp;&nbsp;  * Feevale, and now I keep challenging myself as I'm in
                <br />
                <span className="text-gray-500">11</span>
                &nbsp;&nbsp;  * the 4th module of my Full Stack post-graduation.
                <br />
                <span className="text-gray-500">12</span>
                &nbsp;&nbsp;  * 
                <br />
                <span className="text-gray-500">13</span>
                &nbsp;&nbsp;  * I'm passionate about creating innovative solutions 
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
                &nbsp;&nbsp; * But life isn't just about coding, right? In my free 
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
