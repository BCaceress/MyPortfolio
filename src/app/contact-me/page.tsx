"use client";

import { useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loadingMethod, setLoadingMethod] = useState<"email" | "whatsapp" | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSend = (method: "email" | "whatsapp") => {
    if (method === "email") {
      if (!formData.name || !formData.email || !formData.message) {
        toast.error("Preencha todos os campos antes de enviar!");
        return;
      }
  
      const subject = encodeURIComponent("Portfolio Contact");
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
      );
  
      window.location.href = `mailto:brunocaceres@live.com?subject=${subject}&body=${body}`;
      toast.success("Redirecionando para o e-mail...");
    } else if (method === "whatsapp") {
      if (!formData.name || !formData.message) {
        toast.error("Nome e mensagem são obrigatórios para enviar via WhatsApp!");
        return;
      }
  
      const phone = "5551981927091";
      const text = encodeURIComponent(`Hello, my name is ${formData.name}. ${formData.message}`);
      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
      toast.success("Abrindo WhatsApp...");
    }
  
    setLoadingMethod(method);
    setTimeout(() => {
      setLoadingMethod(null);
      setSubmitted(true);
    }, 2000);
  };
  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div>
    <Toaster />
    <div className="flex min-h-screen items-center justify-center p-6 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-3 w-full">
          <h2 className="text-3xl md:text-4xl text-blue-500 dark:text-blue-400 font-semibold mb-5">
            {"> "} Contact-me
          </h2>
        </div>
        <p className="text-center mb-12 text-lg">
          What&apos;s next? Feel free to reach out if you&apos;re looking for a developer,
          have a query, or simply want to connect.
        </p>

        {/* Adiciona items-stretch para que ambas as colunas tenham a mesma altura */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Coluna da Esquerda: Formulário ou Mensagem de Agradecimento */}
          <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 h-full">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="flex items-center justify-center mb-4">
                  <span
                    className="mr-2 text-green-600 dark:text-green-300"
                    style={{ fontSize: "32px" }}
                  >
                    🤘
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-200">
                    Thank You!
                  </h2>
                </div>
                <p className="text-lg mb-4">
                  Your message has been accepted. You will receive an answer really soon!
                </p>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  sendNewMessage
                </button>
              </div>
            ) : (
              <>
                <label className="block text-gray-500 dark:text-gray-400">_name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-2 border rounded mt-1 bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />

                <label className="block text-gray-500 dark:text-gray-400 mt-4">_email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full p-2 border rounded mt-1 bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />

                <label className="block text-gray-500 dark:text-gray-400 mt-4">_message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full p-2 border rounded mt-1 h-24 bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => handleSend("email")}
                    disabled={!!loadingMethod}
                    className="flex items-center justify-center gap-2 w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMethod === "email" ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail size={18} />
                        Send via Email
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleSend("whatsapp")}
                    disabled={!!loadingMethod}
                    className="flex items-center justify-center gap-2 w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMethod === "whatsapp" ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send via WhatsApp
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Coluna da Direita: Visualização da Mensagem com visual de IDE */}
          <div className="p-4 h-full">
            <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden h-full">
              {/* Header simulando a barra de título do IDE */}
              <div className="flex items-center px-4 py-2 bg-gray-700">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <span className="ml-auto text-gray-400 text-sm">contactMe.js</span>
              </div>
              {/* Corpo com o código */}
              <pre className="text-sm bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-b-lg overflow-x-auto h-full">
                <code>
                  <span className="text-gray-400">1 </span>
                  <span className="text-purple-400"> const</span> sendEmailBtn = document.querySelector
                  <span className="text-yellow-400">(&quot;#sendEmailBtn&quot;)</span>;
                  <br />
                  <span className="text-gray-400">2 </span>
                  <span className="text-purple-400"> const</span> sendWhatsBtn = document.querySelector
                  <span className="text-yellow-400">(&quot;#sendWhatsBtn&quot;)</span>;
                  <br />
                  <span className="text-gray-400">3 </span>
                  <br />
                  <span className="text-gray-400">4 </span>
                  <span className="text-purple-400"> const</span> message = {'{' }
                  <br />
                  <span className="text-gray-400">5 </span>
                  &nbsp;&nbsp; name: <span className="text-green-400">&quot;{formData.name || 'Your Name'}&quot;</span>,
                  <br />
                  <span className="text-gray-400">6 </span>
                  &nbsp;&nbsp; email: <span className="text-green-400">&quot;{formData.email || 'your-email@example.com'}&quot;</span>,
                  <br />
                  <span className="text-gray-400">7 </span>
                  &nbsp;&nbsp; message: <span className="text-green-400">&quot;{formData.message || 'Your message...'}&quot;</span>,
                  <br />
                  <span className="text-gray-400">8 </span>
                  &nbsp;&nbsp; date: <span className="text-green-400">&quot;{new Date().toDateString()}&quot;</span>
                  <br />
                  <span className="text-gray-400">9 </span>
                  {' }'};
                  <br />
                  <span className="text-gray-400">10 </span>
                  <br />
                  <span className="text-gray-400">11 </span>
                  sendEmailBtn.addEventListener
                  <span className="text-yellow-400">(&apos;click&apos;</span>, () =&gt; {'{' }
                  <br />
                  <span className="text-gray-400">12 </span>
                  &nbsp;&nbsp; form.sendEmail(message);
                  <br />
                  <span className="text-gray-400">13 </span>
                  {' }'});
                  <br />
                  <span className="text-gray-400">14 </span>
                  <br />
                  <span className="text-gray-400">15 </span>
                  sendWhatsBtn.addEventListener
                  <span className="text-yellow-400">(&apos;click&apos;</span>, () =&gt; {'{' }
                  <br />
                  <span className="text-gray-400">16 </span>
                  &nbsp;&nbsp; form.sendWhatsApp(message);
                  <br />
                  <span className="text-gray-400">17 </span>
                  {' }'});
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
