"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { Loader2, Mail, MessageSquare, RotateCcw, Send } from "lucide-react";
import { useCallback, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ContactForm() {
  const { language } = useLanguage();
  // Recupera as traduções do idioma atual ou utiliza o inglês como fallback
  const rawContactText = (translations[language] || translations["en"]).contactForm;

  const contactText = {
    ...rawContactText,
    validation: rawContactText.validation || {
      nameRequired: "Nome é obrigatório",
      emailRequired: "Email válido é obrigatório",
      messageRequired: "Mensagem é obrigatória",
    },
    buttons: rawContactText.buttons || {
      sendEmail: "Enviar por Email",
      sendWhatsApp: "Enviar por WhatsApp",
      sending: "Enviando...",
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loadingMethod, setLoadingMethod] = useState<"email" | "whatsapp" | null>(null);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
r
      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    },
    [formErrors]
  );

  const validateForm = (method: "email" | "whatsapp") => {
    const errors = {
      name: !formData.name.trim(),
      message: !formData.message.trim(),
      email:
        method === "email"
          ? !formData.email.trim() || !isValidEmail(formData.email)
          : false,
    };

    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSend = useCallback(
    (method: "email" | "whatsapp") => {
      if (!validateForm(method)) {
        toast.error(
          method === "email"
            ? contactText.toast.fillAllFields
            : contactText.toast.nameMessageRequired
        );
        return;
      }

      setLoadingMethod(method);

      setTimeout(() => {
        if (method === "email") {
          const subject = encodeURIComponent("Portfolio Contact");
          const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
          );
          window.location.href = `mailto:brunocaceres@live.com?subject=${subject}&body=${body}`;
          toast.success(contactText.toast.redirectingEmail);
        } else if (method === "whatsapp") {
          const phone = "5551981927091";
          const text = encodeURIComponent(
            `Hello, my name is ${formData.name}. ${formData.message}`
          );
          window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
          toast.success(contactText.toast.openingWhatsApp);
        }
        setLoadingMethod(null);
        setSubmitted(true);
      }, 1000);
    },
    [formData, contactText.toast]
  );

  const handleReset = useCallback(() => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setFormErrors({
      name: false,
      email: false,
      message: false,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Toaster position="top-center" />
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-blue-500 dark:text-blue-400 font-semibold mb-3">
            {contactText.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {contactText.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 transform hover:shadow-xl">
            <div className="p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 mb-6">
                    <MessageSquare className="h-12 w-12 text-green-600 dark:text-green-300" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    {contactText.thankYou.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                    {contactText.thankYou.message}
                  </p>
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label={contactText.thankYou.newMessage}
                  >
                    <RotateCcw size={18} />
                    {contactText.thankYou.newMessage}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-6"
                  aria-label={contactText.title}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {contactText.labels.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={contactText.placeholders.name}
                      className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${formErrors.name
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                        }`}
                      aria-required="true"
                      aria-invalid={formErrors.name}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500" role="alert">
                        {contactText.validation.nameRequired}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {contactText.labels.email} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={contactText.placeholders.email}
                      className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${formErrors.email
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                        }`}
                      aria-required="true"
                      aria-invalid={formErrors.email}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500" role="alert">
                        {contactText.validation.emailRequired}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {contactText.labels.message} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={contactText.placeholders.message}
                      rows={5}
                      className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${formErrors.message
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                        }`}
                      aria-required="true"
                      aria-invalid={formErrors.message}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-500" role="alert">
                        {contactText.validation.messageRequired}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => handleSend("email")}
                      disabled={!!loadingMethod}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      aria-label={contactText.buttons.sendEmail}
                    >
                      {loadingMethod === "email" ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          <span>{contactText.buttons.sending}</span>
                        </>
                      ) : (
                        <>
                          <Mail size={18} />
                          <span>{contactText.buttons.sendEmail}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSend("whatsapp")}
                      disabled={!!loadingMethod}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all duration-300 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      aria-label={contactText.buttons.sendWhatsApp}
                    >
                      {loadingMethod === "whatsapp" ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          <span>{contactText.buttons.sending}</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>{contactText.buttons.sendWhatsApp}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Visualização da Mensagem (IDE) */}
          <div className="rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl h-full">
            <div className="h-full flex flex-col">
              {/* Header do IDE */}
              <div className="flex items-center px-4 py-3 bg-gray-800 dark:bg-gray-900">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="ml-4 text-sm text-gray-400 flex items-center">
                  <span className="mr-2">📄</span>
                  <span>message.js</span>
                </div>
                <div className="ml-auto flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Corpo com o código */}
              <div className="flex-1 bg-gray-900 dark:bg-gray-800 overflow-auto">
                <pre className="text-sm text-gray-100 p-5 font-mono leading-relaxed h-full">
                  <code>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">1</span>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400"> developerContact</span> = {"{"}
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">2</span>
                      <span className="text-gray-100 ml-4">client: {"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">3</span>
                      <span className="text-gray-100 ml-8">name: </span>
                      <span className="text-green-400">
                        &quot;{formData.name || contactText.placeholders.name}&quot;
                      </span>
                      <span className="text-gray-100">,</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">4</span>
                      <span className="text-gray-100 ml-8">email: </span>
                      <span className="text-green-400">
                        &quot;{formData.email || contactText.placeholders.email}&quot;
                      </span>
                      <span className="text-gray-100">,</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">5</span>
                      <span className="text-gray-100 ml-8">timestamp: </span>
                      <span className="text-orange-400">{new Date().toISOString()}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">6</span>
                      <span className="text-gray-100 ml-4">{"}"}, </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">7</span>
                      <span className="text-gray-100 ml-4">message: {"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">8</span>
                      <span className="text-gray-100 ml-8">content: </span>
                      <span className="text-green-400">
                        &quot;{formData.message || contactText.placeholders.message}&quot;
                      </span>
                      <span className="text-gray-100">,</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">9</span>
                      <span className="text-gray-100 ml-4">{"}"} </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">10</span>
                      <span className="text-gray-100">{"}"}</span>
                      <span className="text-gray-100">;</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">11</span>
                      <span className="text-gray-100"></span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">12</span>
                      <span className="text-purple-400">async function</span>{" "}
                      <span className="text-yellow-400"> sendMessage</span>
                      <span className="text-gray-100">() {"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">13</span>
                      <span className="text-gray-100 ml-4">try {"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">14</span>
                      <span className="text-blue-300 ml-8">console</span>
                      <span className="text-gray-100">.</span>
                      <span className="text-blue-400">log</span>
                      <span className="text-gray-100">(</span>
                      <span className="text-yellow-400">&quot;Sending message...&quot;</span>
                      <span className="text-gray-100">);</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">15</span>
                      <span className="text-gray-100 ml-8">const</span>{" "}
                      <span className="text-blue-400"> response</span>{" "}
                      <span className="text-gray-100"> = </span>
                      <span className="text-purple-400">await</span>{" "}
                      <span className="text-blue-400"> fetch</span>
                      <span className="text-gray-100">(</span>
                      <span className="text-yellow-400">&quot;/api/contact&quot;</span>
                      <span className="text-gray-100">, {"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">16</span>
                      <span className="text-gray-100 ml-12">method: </span>
                      <span className="text-yellow-400">&quot;POST&quot;</span>
                      <span className="text-gray-100">,</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">17</span>
                      <span className="text-gray-100 ml-12">body: </span>
                      <span className="text-blue-300">JSON</span>
                      <span className="text-gray-100">.</span>
                      <span className="text-blue-400">stringify</span>
                      <span className="text-gray-100">(developerContact)</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">18</span>
                      <span className="text-gray-100 ml-8">{"});"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">19</span>
                      <span className="text-gray-100 ml-8">return </span>
                      <span className="text-purple-400">await</span>{" "}
                      <span className="text-blue-400"> response</span>
                      <span className="text-gray-100">.</span>
                      <span className="text-blue-400">json</span>
                      <span className="text-gray-100">();</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">20</span>
                      <span className="text-gray-100 ml-4">{"}"} </span>
                      <span className="text-purple-400">catch</span>
                      <span className="text-gray-100"> (</span>
                      <span className="text-blue-400">error</span>
                      <span className="text-gray-100">) {"{"}</span>
                    </div>
                    <div className="flex ">
                      <span className="text-gray-500 mr-4 select-none">21</span>
                      <span className="text-blue-300 ml-8">console</span>
                      <span className="text-gray-100">.</span>
                      <span className="text-red-400">error</span>
                      <span className="text-gray-100">(</span>
                      <span className="text-yellow-400">&quot;Error:&quot;</span>
                      <span className="text-gray-100">, error);</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">22</span>
                      <span className="text-gray-100 ml-4">{"}"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-4 select-none">23</span>
                      <span className="text-gray-100">{"}"}</span>
                    </div>
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
